import { CriticalPath } from './criticalpath';
import { Node } from "./node";
import { Graph } from "./graph";
import { TareasI } from '../tareas/tareas.entity';

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

  it('should calculate correctly the slack of the activity', () => {
    const nodeA: Node = new Node('A','2021-06-21','2021-06-30');

    nodeA.setEarliestStart(0);
    nodeA.setLatestFinish(13);
    nodeA.calculateSlack();

    expect(nodeA.isCriticNode()).toBeFalsy();


    const nodeB: Node = new Node('B','2021-07-01','2021-07-15');
    nodeB.setEarliestStart(0);
    nodeB.setLatestFinish(14);
    nodeB.calculateSlack();

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

    expect(graph.bfs('A')).toStrictEqual([ 'A', 'B', 'C', 'E', 'D' ]);

  });

  it('should correctly determine whether a node is a leaf or not', () => {

    
    expect(graph.isLeafNode('D')).toBeTruthy();
    expect(graph.isLeafNode('C')).toBeFalsy();
    expect(graph.isLeafNode('A')).toBeFalsy();
    expect(graph.isLeafNode('E')).toBeTruthy();

  });

  it('should add correctly apply BFS to the graph (backwards)', () => {

    const nodeF: Node = new Node('F');

    graph.addNode(nodeF);

    graph.addEdge('E','F');
    graph.addEdge('D','F');

    expect(graph.bfs('F')).toStrictEqual([ 'F', 'E', 'D', 'B', 'C', 'A' ]);

  });
  
});

describe('Critical Path test',() => {

  it('It should correctly calculate the critical path for a given task list', () => {

    // Create some tasks
    const tasks: TareasI[] = [];
    const t0: TareasI= new TareasI();
    const t1: TareasI= new TareasI();
    const t2: TareasI= new TareasI();
    const t3: TareasI= new TareasI();
    const t4: TareasI= new TareasI();
    const t5: TareasI= new TareasI();
    const t6: TareasI= new TareasI();
    const t7: TareasI= new TareasI();

    t0.id = 'A';
    t0.startDate = '2021-06-01';
    t0.endDate = '2021-06-07';
    t0.dependency = [];
    tasks.push(t0);
    
    t1.id = 'B';
    t1.startDate = '2021-06-01';
    t1.endDate = '2021-06-05';
    t1.dependency = [];
    tasks.push(t1);

    t2.id = 'C';
    t2.startDate = '2021-06-01';
    t2.endDate = '2021-06-04';
    t2.dependency = ['A'];
    tasks.push(t2);

    t3.id = 'D';
    t3.startDate = '2021-06-01';
    t3.endDate = '2021-06-05';
    t3.dependency = ['B'];
    tasks.push(t3);

    t4.id = 'E';
    t4.startDate = '2021-06-01';
    t4.endDate = '2021-06-04';
    t4.dependency = ['B'];
    tasks.push(t4);

    t5.id = 'F';
    t5.startDate = '2021-06-01';
    t5.endDate = '2021-06-11';
    t5.dependency = [];
    tasks.push(t5);

    t6.id = 'G';
    t6.startDate = '2021-06-01';
    t6.endDate = '2021-06-04';
    t6.dependency = ['E','F'];
    tasks.push(t6);

    t7.id = 'H';
    t7.startDate = '2021-06-01';
    t7.endDate = '2021-06-03';
    t7.dependency = ['C','D'];
    tasks.push(t7);

    expect(CriticalPath.getCriticalPath(tasks)).toStrictEqual(['F','G']);
  });
});
