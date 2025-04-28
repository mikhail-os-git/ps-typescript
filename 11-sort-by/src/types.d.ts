declare module 'sort-by' {
	export function type(type: string): (arg: unknown) => boolean;

	export function sort(
		property: string, 
		map?: (key: unknown, value: unknown) => value
	): (a: unknown, b: unknown) => number;

	export function sortBy(...args: string[]): (obj1: unknown, obj2: unknown) => number;
}