import { TareasI } from "src/tareas/tareas.entity";

/**
 * Node containing the representation of a task in the network to calculate 
 * the critical path of the project.
 */
export class Node {
    private next: Node[];
    private task: string;
    private id: string;
    private slack: number;

    public duration: number;
    public earliestStart: number;
    public latestStart: number;
    public earliestFinish: number;
    public latestFinish: number;

    constructor(task: TareasI) {
        this.next = [];
        this.task = task.name;
        this.id = task.id;
        this.duration = this.calculateDuration(task.startDate,task.endDate);
    }

    /**
     * Calculates task duration.
     * @param start Task start date.
     * @param finish Task completion date.
     * @returns Duration of a task in the number of weeks it takes to complete.
     */
    private calculateDuration(start: string, finish: string): number{
        const startDate = new Date(start);
        const finishDate = new Date(finish);
        return Math.ceil((finishDate.valueOf() - startDate.valueOf())/7);
    }


    /**
     * Calculates the float value of the task. This value allows to determine the 
     * criticality of the task.
     */
    public calculateFloat(): void {
        this.slack = (this.latestFinish - this.earliestFinish) || 
                     (this.latestStart - this.earliestStart);
    }

    /**
     * Indicates whether the node corresponds to a critical task or not.
     * @returns True if the task float is equal to zero.
     */
    public isCriticNode(): boolean {
        return this.slack == 0;
    }

    public getNext(): Node[] {
        return this.next;
    }

    public setNext(next: Node): void {
        this.next.push(next);
    }

}
