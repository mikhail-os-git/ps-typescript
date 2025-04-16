interface IA {
	a: number,
	b: string
}

interface IB {
	a: number,
	b: boolean
}

const objectA: IA = {
	a: 1,
	b: "example"
}

const objectB: IB = {
	a: 1,
	b: true
}



type TDifference<A,B> = Pick<A,Exclude<keyof A, keyof B>>;

function difference<A extends object, B extends object>(objA: A,objB: B):  TDifference<A,B>{
    const res = {} as TDifference<A,B>; 
    for(const key of Object.keys(objA) as (keyof A)[]){
        if(!(key in objB) || typeof objA[key] !== typeof (objB as any)[key]){
            (res as any)[key] = objA[key as keyof A];
        }
    }

    return res
}


const r: TDifference<IA, IB> = difference(objectA,objectB);
console.log(r);