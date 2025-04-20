function createByKeys<O, K extends keyof O>(obj: O, keys: K[]): O {
	const temp: O = {} as O;
	for(const key of keys){
		if(!Array.isArray(obj[key])) {
			temp[key] = obj[key];
		} else {
			temp[key] = obj[key].map(v => v) as O[K];
		}
	}

	return temp;
}
const user = {

	name: "Vasiliy",
	age: 30,
	skills: ["DevOps", "Develop"]
}

const result = createByKeys(user, ["age","name"]);

console.log(result);