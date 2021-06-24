/**
 * Node containing the representation of a task in the network to calculate 
 * the critical path of the project.
 */
export class Node {
    private _edges: string[];
    private _name: string;

    private slack: number;
    public duration: number;
    public earliestStart: number;
    public latestStart: number;
    public earliestFinish: number;
    public latestFinish: number;

    /**
     * Creates a new node with empty edges.
     * @param name Name of the node.
     * @param start Task start date.
     * @param finish Task completion date. 
     */
    constructor(name: string, start: string, finish: string) {
        this._name = name;
        this._edges = [];
        this.duration = this.calculateDuration(start, finish);
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
        return Math.round((finishDate.getTime() - startDate.getTime())/(1000 * 3600 * 24));
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

    
    // Set earlies start day and calculates earliest finish day
    public setEarliestStart(d: number) {
        this.earliestStart = d;
        this.earliestFinish = this.earliestStart + this.duration;
    }

    // Set latest finish day and calculates latest start day
    public setLatestFinish(d: number) {
        this.latestFinish = d;
        this.latestStart = this.latestFinish - this.duration;
    }


    // Edges associated with the node
    public get edges(): string[] {
        return this._edges;
    }

    public set edges(e: string[]) {
        this._edges = e;
    }


    // Name of the node
    public get name(): string {
        return this._name;
    }

    public set name(n: string) {
        this._name = n;
    }
}