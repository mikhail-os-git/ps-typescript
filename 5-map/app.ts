type keyType = boolean | number | string;

class HashMap {
	private _buckets: any[][] = new Array(16).fill(null).map(() => []);

	constructor();
	constructor(params: [keyType, unknown][]);
	constructor(params?: [keyType, unknown][]) {
		if(params || Array.isArray(params)){
			for(const [key, value] of params){
				this._buckets[this.hash(key)].push([key,value]);
			}
		console.log(this._buckets);
		}
	}

	public add(key: keyType, value: unknown ): void{
		if(this.check(key)){
			this._buckets[this.hash(key)].forEach(([k,v], i) => {
					if(k == key){
						this._buckets[this.hash(key)][i] = [key,value];
					}
				}
			)
		} else {
			this._buckets[this.hash(key)].push([key, value]);
		}
		console.log(this._buckets);

	}

	public remove(key: keyType, value: unknown):void{
		this._buckets[this.hash(key)] = this._buckets[this.hash(key)].filter(([k,v])=> !(k == key && v  == value));
	}

	show(key: keyType):unknown{
		return this._buckets[this.hash(key)].find(([k,v]) => k == key)[1];
	}

	clear(){
		this._buckets = this._buckets.map(() => []);
		console.log(this._buckets);
	}

	private hash(key: keyType): number{
		let res: number;
		let sum: number = 0;
		if(typeof key == "number"){
			res = key % this._buckets.length;
		} else if(typeof key == "string") {
			for(let index = 0; index < key.length; index++) {
				sum += key.charCodeAt(index);
			}
			res = sum % this._buckets.length;
		} else {
			res = Number(key) % this._buckets.length;
		}
		return res;
	}

	private check(key: keyType): boolean{
		return this._buckets[this.hash(key)].some(([k,v])=> k == key);
	}
}

const map = new HashMap([["Paris", 20],["Moscow", 10]]);

map.add("London", 15);

console.log(map.show("London"));
map.add("Paris", 12);
console.log(map.show("Paris"));
console.log(map.show("Moscow"));
map.clear();

