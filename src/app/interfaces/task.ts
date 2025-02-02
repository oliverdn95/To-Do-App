export interface Task{
    id: number;
    name: string;
    status: string;
    priority: string;
    complexity: string;
    summary: string;
    index: number;
}

export interface TaskList{
    todoList:Task[];
    workingList:Task[];
    doneList:Task[];
}