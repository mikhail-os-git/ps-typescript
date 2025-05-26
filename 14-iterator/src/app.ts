interface ITask {
	readonly id: number;
	date: Date;
	title: string;
}

interface IIterator<T> {
	current(): T | undefined;
	next(): T | undefined;
	prev(): T | undefined;
	position(): number;
}

interface ISorter<T> {
	sort():T;
}

type TSorterSortType = "id" | "date";
type TIteratorSortType = "desc" | "asc";



class Task implements ITask {
	public readonly id: number;
	public date: Date;
	public title: string;
	constructor(id: number, title: string){
		this.id = id;
		this.title = title;
		this.date = new Date;
	}
}


class TaskSorter implements ISorter<ITask[]> {
	private sortType: TSorterSortType;
	private tasks: ITask[]
	constructor(tasks: ITask[], sortType: TSorterSortType) {
		this.tasks = tasks;
		this.sortType = sortType
	}

	sort(): ITask[] {
		if(this.sortType == "id"){
			return this.tasks.sort((a,b) => a.id - b.id);
		}
		else {
			return this.tasks.sort((a,b) => a.date.getTime() - b.date.getTime());
		}
	}
}

class TaskIterator implements IIterator<ITask> {
	private tasks: ITask[];
	private index: number = 0;
	constructor(tasks: ITask[], sorterType: TSorterSortType, iteratorType: TIteratorSortType){
		const sorted = new TaskSorter([...tasks],sorterType).sort();
		this.tasks = iteratorType == "desc" ? sorted.reverse() : sorted;
	}
	current(): ITask{
		return this.tasks[this.index];
	}
	next(): ITask {
		this.index = this.index < this.tasks.length - 1 ? this.index += 1 : this.index = 0;
		return this.tasks[this.index];
	}
	prev(): ITask {
		this.index = this.index - 1  > 0 ? this.index -= 1 : this.tasks.length - 1;
		return this.tasks[this.index];
	}
	position(): number {
		return this.index;
	}
}


class TaskList {
	private tasks: ITask[] = [];

	public sort(sortType: TSorterSortType = "id") {
		const sorter = new TaskSorter(this.tasks, sortType);
		this.tasks = sorter.sort();
	}

	public addTask(task: ITask) {
		this.tasks.push(task);
		return this;
	}

	public getTasks() {
		return this.tasks;
	}

	public count(){
		return this.tasks.length;
	}

	public getIterator(sorterType: TSorterSortType = "id", iteratorType: TIteratorSortType = "asc"){
		const iterator = new TaskIterator(this.tasks, sorterType, iteratorType);
		return iterator;
	}
}

const tl = new TaskList();
tl.addTask(new Task(1,"test 1"));
console.log(tl.getTasks());
tl.addTask(new Task(2,"test 2"));
console.log(tl.getTasks());
const iterator = tl.getIterator("date","desc");
console.log(iterator.current());