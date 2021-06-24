import { TareasI } from "src/tareas/tareas.entity";
import { Graph } from "./graph";
import { Node } from "./node";

export class CriticalPath {

    private static graph: Graph = new Graph();

    static getCriticalPath(tasks: TareasI[]): TareasI[] {
        
        // Graph building
        this.buildGraph(tasks);
        this.connectGraph(tasks);
        
        // Calculate CPM values;
        this.forwardPass();
        this.backwardPass();

        // Get the Critical Path

        return [];
    }


    /**
     * Constructs the graph from the task list.
     * @param tasks task list.
     */
    private static buildGraph(tasks: TareasI[]) {
        // Add default nodes
        this.graph.addNode(new Node('start'));
        this.graph.addNode(new Node('finish'));

        // Add all task to the graph
        tasks.forEach(task => {
            const name = task.id;
            const start = task.startDate;
            const finish = task.endDate;

            this.graph.addNode(new Node(name,start,finish));
        });
    }


    /**
     * Creates graph edges according to task dependencies.
     * @param tasks task list.
     */
    private static connectGraph(tasks: TareasI[]) {
        // Create the edges
        tasks.forEach(task => {

            // start:node edges
            if (task.dependency.length === 0)
                this.graph.addEdge('start',task.id);
            // node:node edges
            else {
                task.dependency.forEach(subtask => {
                    this.graph.addEdge(subtask,task.id);
                });
            }
        });

        // Create node:finish edges
        this.graph.nodes.forEach(node => {
            const isLeaf: boolean = this.graph.isLeafNode(node.name);
            if (isLeaf && node.name !== 'finish')
                this.graph.addEdge(node.name,'finish');
        });
    }


    /**
     * It performs one pass from start to finish and for each node calculates 
     * the starting values of the task.
     */
    private static forwardPass() {
        const route = this.graph.bfs('start');
        
        route.forEach( node => {
            let start = 0;
            const currentNode = this.graph.nodes.find(n => n.name === node);
            
            // Get latest start date
            currentNode.prevs.forEach(p => {
                const prevNode = this.graph.nodes.find(n => n.name === p);
                if (prevNode.earliestFinish > start)
                    start = prevNode.earliestFinish;
            });

            currentNode.setEarliestStart(start);
            //console.log(currentNode);
        });
    }


    /**
     * It performs a pass from end to start and for each node calculates 
     * the task completion values and computes the slack value.
     */
    private static backwardPass() {
        const route = this.graph.bfs('finish');

        route.forEach( node => {
            
            let finish = 0;

            const currentNode = this.graph.nodes.find(n => n.name === node);
            
            
            // Get latest start date
            currentNode.nexts.forEach(p => {
                const nextNode = this.graph.nodes.find(n => n.name === p);
                if (nextNode.latestStart > finish)
                    finish = nextNode.latestStart;
            });

            // Assumption: Latest finish date = Earliest Finish date (of project)
            if (currentNode.name === 'finish'){
                finish = currentNode.earliestFinish;
            }

            currentNode.setLatestFinish(finish);
            currentNode.calculateSlack();
            //console.log(currentNode);
        });      
    }
    
}
