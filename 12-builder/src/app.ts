
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
	setQueryType<T extends QUERY_TYPE>(type: T): QueryBuilder<T>,
	setHeader(header: THeader<QUERY_TYPE>): this,
	setBody(body: TBody<QUERY_TYPE>): this
	setUrl(url: string): this,
	build(): RequestInit,
	exec(): Promise<any | undefined>
}


class QueryBuilder<T extends QUERY_TYPE> implements IQueryMethods{
	private _queryType!: T;
	@ValidateHeader()
	private _headers!: THeader<T>;
	@ValidateBody()
	private _body?: TBody<T>;
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
	get headers() {
		return this._headers
	}
	get body() {
		return this._body;
	}

	public setQueryType<NT extends QUERY_TYPE>(type: NT) {
		const  newSB = new QueryBuilder<NT>(this._url)
		newSB._queryType = type;
		return newSB;
	}

	public setHeader(headers: THeader<T>) {
		this._headers = headers;
		return this;
	}

	public setBody(body: TBody<T>){
		this._body = body;
		return this;
	}

	public setUrl(url: string) {
		this._url = url;
		return this;
	}

	public build(){
		const res: RequestInit = {
			method: this._queryType,
			headers: this._headers,
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

	async exec(){
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

		Object.defineProperty(target, propertyKey, {
			get: () => value,
			set: function(newVal: Record<string, any>){
				const qt = this.queryType;
				if (qt === "GET" && "Content-Type" in newVal) {
					throw new Error("'Content-Type' is not allowed for GET.");
				}
				if (qt === "POST" && !("Content-Type" in newVal)) {
					throw new Error("'Content-Type' is required for POST.");
				}
				
				value = newVal;
			},
		})
	}
}

function ValidateBody(){

	return function(target: Object, propertyKey: string | symbol)
	{
		let value: any;

		Object.defineProperty(target, propertyKey, {
			get: () => value,
			set: function(newVal: object | string){
				const qt = this.queryType;
				if(qt === "GET" && (newVal !== undefined && newVal !== null)){
					throw new Error("The GET request type should not have a 'body'.");
				}

				if(qt === "POST"){
					const validTypes = ["string", "object"];
					if (!validTypes.includes(typeof newVal)) {
						throw new Error("The POST request body must be string, object (JSON).");
					}
				}

				value = newVal;

			}
		})
	}
}


const builder = new QueryBuilder("example.com");
console.log(builder
.setQueryType("POST")
.setHeader({Accept: "test", Authorization: "test", "Content-Type": "Test"})
.setBody({role: "admin"}).build());