/* eslint-disable prefer-const */
import { Node } from './node';

/**
 * Class that represents an undirected graph.
 */
export class Graph {
    // An adjacency list to hold the graph data
    private _adjList: Node[];

    constructor() {
        this._adjList = [];
    }

    /**
     * A method to add a new node to the graph.
     * @param newNode Node to be added to the graph.
     */
    addNode(newNode: Node): boolean {
        // If vertex already exists, do nothing.
        if (!this._adjList.find(n => n.name === newNode.name)) {
            this._adjList.push(newNode);   
        }
        return true;
    }

    /**
     * Adds an edge to the graph.
     * @param src Source node of the edge.
     * @param dst Destination node of the edge.
     * @returns 
     */
    addEdge(src: string, dst: string): boolean {
        // Add destiny node to source node
        this._adjList.find(n => n.name === src).nexts.push(dst);
        // Add source node to destiny node
        this._adjList.find(n => n.name === dst).prevs.push(src);
        return true;
    }


    bfs(startNode: string): string[] {
        let result: string[] = [];
        let visited: any = {};
        let queue: string[] = [];

        queue.push(startNode);

        while (queue.length > 0) {
            let name = queue.shift();
            let currentNode = this._adjList.find(n => n.name === name);
            if (!visited[currentNode.name]) {
                // Mark the current node as visited
                visited[currentNode.name] = true;

                // Add the current node to result list
                result.push(currentNode.name);

                // Visit the neighbors of the current node one by one, if they are not visited
                currentNode.edges.forEach(neighbor => {
                    if (!visited[neighbor])
                        queue.push(neighbor);
                });
            }
        }
        return result;
    }

    /**
     * Indicates whether a node is a leaf node.
     * @param nodeName Name of node to be evaluated.
     */
    public isLeafNode(nodeName: string): boolean {
        let isLeaf = true;

        for (let node of this._adjList) {
            if (node.prevs.find(n => n === nodeName)){
                isLeaf = false;
                break;
            }
        }

        return isLeaf;
    }

    
    // Returns nodes list
    public get nodes(): Node[] {
        return this._adjList; 
    }

}
