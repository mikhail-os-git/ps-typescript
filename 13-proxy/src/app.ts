import  {QUERY_TYPE, QueryBuilder} from '../../12-builder/src/app.js';

const qb = new QueryBuilder()


class QueryProxy {
	private _baseUrl = 'https://dummyjson.com/products/';
	private _builder: QueryBuilder<"GET">

	constructor() {
		this._builder = new QueryBuilder(this._baseUrl);
		this._builder.setHeader(
			{
			'Accept': 'application/json',
			'Authorization': 'Bearer YOUR_TOKEN_HERE'
			});
		}
	async getProducts(id: number): Promise<Record<string, unknown> | undefined>{
			if(id > 10){
				throw new Error("The product ID is too large");
			}
			this._builder.setUrl(this._baseUrl+id);
			const res = await this._builder.exec();
			return res;
	}
}
let product
const qp = new QueryProxy();
(async () => {
	try {
		product = await qp.getProducts(9);
		console.log(product); 
	} catch (err) {
		console.error((err as Error).message);
	}
})();