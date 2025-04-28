
type QUERY_TYPE = "GET" | "POST";

type THeader<T extends QUERY_TYPE> = 
	T extends "GET" ? { Authorization?: string; Accept?: string; } :
	T extends "POST" ? { Authorization?: string; Accept?: string; "Content-Type"?: string } :
	never;

type TBody<T extends QUERY_TYPE> = 
	T extends "GET" ? never :
	T extends "POST" ?
	| string                   
    | { [key: string]: any }
	: unknown

interface IQueryMethods {
	setQueryType<T extends QUERY_TYPE>(type: T): this,
	setHeader<T extends THeader<QUERY_TYPE>>(header: T): this,
	setBody<T extends TBody<QUERY_TYPE>>(body: T): this
	setUrl(url: string): this,
	build(): TRequest
}


type TRequest = {
	method: QUERY_TYPE,
	header: THeader<QUERY_TYPE>,
	body?: string,
	url: string
}

class QueryBuilder implements  IQueryMethods{
	private _queryType!: QUERY_TYPE;
	@ValidateHeader()
	private _header!: THeader<QUERY_TYPE>;
	@ValidateBody()
	private _body?: TBody<QUERY_TYPE>;
	private _url!: string;

	constructor();
	constructor(url: string);
	constructor(url?: string){
		if(url){
			this._url = url;
		}
	}

	get queryType(){
		return this._queryType
	}
	get header() {
		return this._header
	}
	get body() {
		return this._body;
	}

	public setQueryType<T extends QUERY_TYPE>(type: T) {
		this._queryType = type;
		return this;
	}

	public setHeader<T extends THeader<QUERY_TYPE>>(header: T) {
		this._header = header;
		return this;
	}

	public setBody<T extends TBody<QUERY_TYPE>>(body: T){
		this._body = body;
		return this;
	}

	public setUrl(url: string) {
		this._url = url;
		return this;
	}

	public build(): TRequest{
		const res: TRequest = {
			method: this._queryType,
			header: this._header,
			url: this._url
		}

		if(this._body != undefined){
			if(typeof this._body !== "string"){	
				res["body"] = JSON.stringify(this._body);
			} else {
				res["body"] = this._body;
			}
		}

		return res;
	}

	async exec(): Promise<any | undefined>{
		try{
			const request = await fetch(this._url, this.build());
			if(!request.ok){
				throw new Error(request.statusText);
			}
			const data = await request.json();
			return data;
			

		}catch(error) {
			if(error instanceof Error){
				console.log(error.message);
			} else {
				console.log(new Error(String(error)));
			}
		}
		
	}

}

function ValidateHeader(){

	return function(target: Object, propertyKey: string | symbol)
	{
		let value: any;

		const getter = function() {return value; }
		const setter = function(this: QueryBuilder, newVal: THeader<QUERY_TYPE>) {
		if(this["queryType"] === "GET"){
			if ('Content-Type' in newVal) {
					throw new Error("'Content-Type' is not allowed for GET requests.");
			}
		}

		if (this["queryType"] === "POST") {
				if (!('Content-Type' in newVal)) {
					throw new Error("'Content-Type' is required for POST requests.");
				}
			}

			value = newVal;
		}

		Object.defineProperty(target, propertyKey, {
			set: setter,
			get: getter
		})
	}
}

function ValidateBody(){

	return function(target: Object, propertyKey: string | symbol)
	{
		let value: any;

		const getter = function() {return value; }
		const setter = function(this: QueryBuilder, newVal: TBody<QUERY_TYPE>) {
		if(this["queryType"] === "GET"){
			if (newVal !== undefined && newVal !== null) {
					throw new Error("The GET request type should not have a 'body'.");
				}
		}

		if (this["queryType"] === "POST") {
			const validTypes = ["string", "object"];
			if (!validTypes.includes(typeof newVal)) {
				throw new Error("The POST request body must be string, object (JSON), or FormData.");
			}
		}

			value = newVal;
		}

		Object.defineProperty(target, propertyKey, {
			set: setter,
			get: getter
		})
	}
}


const builder = new QueryBuilder("example.com");
console.log(builder
.setQueryType("POST")
.setHeader({Accept: "test", Authorization: "test", "Content-Type": "Test"})
.setBody({role: "admin"}).build());