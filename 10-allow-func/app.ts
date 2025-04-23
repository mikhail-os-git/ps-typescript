class User {
	@AllowFunc(0)
	public age: number = 30

}

function AllowFunc(minValue: number){
	return function(target: Object, propertyKey: string | symbol) {
		let value: number;
		const setter = function(newValue: number){
			if(typeof newValue != "number"){
				throw new Error("Value is not a number");
			}

			if(newValue > minValue){
				value = newValue
			}
		}

		const getter = () => value;

		Object.defineProperty(target,propertyKey, {
			set: setter,
			get: getter
		});
	}
}


const person = new User();

console.log(person.age);
person.age = 0;
console.log(person.age);
