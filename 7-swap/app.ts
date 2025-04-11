
type ObjectType = Record<string, unknown>;

const object: ObjectType = {
	A: 1,
	B: 2
}


function swapKeysAndValues<T extends ObjectType>(obj: T): T {
	if(Object.values(obj).some(v => typeof v !== "number")){
		throw new Error("Value must be a number");
	}

	const arr = Object.entries(obj).map((el) => el.reverse());

	return Object.fromEntries(arr);

}

const res = swapKeysAndValues(object);

console.log(res);

