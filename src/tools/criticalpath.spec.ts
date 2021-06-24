import { CriticalPath } from './criticalpath';
import { Node } from "./node";
import { Graph } from "./graph";

describe('Nodes test', () => {
  it('should create some nodes', () => {
    const nodeA: Node = new Node('A','2021-06-21','2021-06-30');
    const nodeB: Node = new Node('B','2021-06-21','2021-06-30');
    const nodeC: Node = new Node('C','2021-06-21','2021-06-30');

    expect(nodeA.name).toBe('A');
    expect(nodeB.name).toBe('B');
    expect(nodeC.name).toBe('C');

  });

  it('should verify duration of task', () => {
    const nodeA: Node = new Node('A','2021-06-21','2021-06-30');
    const nodeB: Node = new Node('B','2021-06-15','2021-07-01');
    const nodeC: Node = new Node('C','2021-08-01','2021-08-31');

    expect(nodeA.duration).toBe(9);
    expect(nodeB.duration).toBe(16);
    expect(nodeC.duration).toBe(30);
  });

  it('should calculate correctly the latest start and earliest Finish', () => {
    const node: Node = new Node('A','2021-06-21','2021-06-30');
    node.setEarliestStart(0);
    node.setLatestFinish(13);

    expect(node.earliestFinish).toBe(9);
    expect(node.latestStart).toBe(4);
  });

  it('should calculate correctly the float of the activity', () => {
    const nodeA: Node = new Node('A','2021-06-21','2021-06-30');

    nodeA.setEarliestStart(0);
    nodeA.setLatestFinish(13);
    nodeA.calculateFloat();

    expect(nodeA.isCriticNode()).toBeFalsy();


    const nodeB: Node = new Node('B','2021-07-01','2021-07-15');
    nodeB.setEarliestStart(0);
    nodeB.setLatestFinish(14);
    nodeB.calculateFloat();

    expect(nodeB.isCriticNode()).toBeTruthy();
  });

});

describe('Graph test',() => {
  const graph: Graph = new Graph();

  it('should add correctly nodes to the graph', () => {
    const nodeA: Node = new Node('A','2021-06-21','2021-06-30');
    const nodeB: Node = new Node('B','2021-06-15','2021-07-01');
    const nodeC: Node = new Node('C','2021-08-01','2021-08-31');
    
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);

    expect(graph.nodes).toStrictEqual([nodeA,nodeB,nodeC]);
  });

  it('should add correctly edges to the graph', () => {
    
    graph.addEdge('A','B');
    graph.addEdge('A','C');
    graph.addEdge('B','C');

    expect(graph.nodes.find(n => n.name === 'A').edges).toStrictEqual(['B','C']);
    expect(graph.nodes.find(n => n.name === 'B').edges).toStrictEqual(['A','C']);
    expect(graph.nodes.find(n => n.name === 'C').edges).toStrictEqual(['A','B']);

  });

  it('should add correctly apply BFS to the graph', () => {

    const nodeD: Node = new Node('D','2021-06-15','2021-07-01');
    const nodeE: Node = new Node('E','2021-08-01','2021-08-31');

    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge('B','E');
    graph.addEdge('C','D');

    console.log(graph.bfs('A'));
    expect(graph.bfs('A')).toBeDefined();

  });

  it('should correctly determine whether a node is a leaf or not', () => {

    
    expect(graph.isLeafNode('D')).toBeTruthy();
    expect(graph.isLeafNode('C')).toBeFalsy();
    expect(graph.isLeafNode('A')).toBeFalsy();
    expect(graph.isLeafNode('E')).toBeTruthy();

  });
});
