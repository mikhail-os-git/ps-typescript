enum GENDERS {
	male = "male",
	female = "female"
}

enum ROLES {
	admin = "admin",
	moderator = "moderator",
	user = "user"
}

enum COINS {
	Bitcoin = "Bitcoin",
}

enum NETWORK {
	Ethereum = "Ethereum (ERC20)"
}

interface ICrypto {
	coin: COINS | string,
	wallet: string,
	network: NETWORK | string,
}

interface IHair {
	color: string,
	type:string
}

interface ICoordinates {
	lat:number,
	lng: number
}

interface IAddress extends ICoordinates {
	address:string,
	city: string,
	state: string,
	stateCode: string,
	postalCode: string,
}

interface IBank {
    cardExpire: string,
	cardNumber: string,
	cardType: string,

}

interface ICompany extends IAddress{
	department:string,
	name: string,
	title: string
}

interface IUser extends IHair,IBank, IAddress, ICompany, ICrypto{
	id: number,
	firstName:string,
	lastName: string,
	maidenName: string,
	age:number,
	gender: GENDERS,
	email: string,
	phone: string,
	username: string,
	password: string,
	birthDate: string,
	image: string,
	bloodGroup: string,
	height: number,
	weight: number,
	eyeColor: string,
	macAddress: string,
	university: string,
	ein:string,
	ssn: string,
	userAgent: string,
	role: ROLES
}

async function getUsers(link:string): Promise<IUser[]>{
	
		const response = await fetch(link);
		if(!response.ok){
			throw new Error(response.statusText);
		}
		const {users} = await response.json();
		return users;
}

const roles:unknown[] = [];
getUsers("https://dummyjson.com/users").then(users => {
	console.log(users[0]);
}).catch((ex)=>{
	if(ex instanceof Error){
		console.log(ex);
	}else {
		console.log(new Error(String(ex)));
	}
});

