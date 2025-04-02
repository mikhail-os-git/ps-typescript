enum ROLES {
	admin = "admin",
	moderator = "moderator",
	user = "user"
}

enum GENDER {
	male = "male",
	female = "female"
}

enum COINS {
	Bitcoin = "Bitcoin"
}

enum NETWORK{
	"Ethereum (ERC20)"
}

interface ICrypto {
	coin: COINS,
	wallet: string,
	network: NETWORK
}

interface IHair {
	color:string,
	type: string
}

interface ICoordinates {
	lat: number,
	lng: number
}

interface IAddress extends ICoordinates {
	address: string,
	city: string,
	state: string,
	stateCode: string,
	postalCode: string,
	country: string
}

interface ICompany extends IAddress {
	department:string,
	name: string,
	title: string,
}

interface IBank {
	cardExpire: string,
	cardNumber: string,
	cardType: string,
	currency: string,
	iban: string
}

interface IUser extends IHair, IBank, ICrypto {
	id: number,
	firstName: string,
	lastName: string,
	maidenName: string,
	age: number,
	gender: GENDER,
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
	ip: string,
	address: IAddress,
	company: ICompany
	macAddress: string,
	university: string,
	ein: string,
	ssn: string,
	userAgent: string
	role: ROLES
}

async function getUsers(link: string): Promise<IUser[]>{
	const response = await fetch(link);
	if(!response.ok){
		throw new Error(response.statusText);
	}
	const {users} = await response.json();

	return users;
}

getUsers("https://dummyjson.com/users").
	then(users =>{
		for(const user of users) {
				console.log(user.address.postalCode)
		}

}).catch(err => {
	if(err instanceof Error){
		console.log(err)
	}else  {
		console.log(new Error(String(err)));
	}
})