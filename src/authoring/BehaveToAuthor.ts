import { Edge, Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import {ICustomEvent, IVariable} from "./AuthoringNodeSpecs";

/**
 * Converts a Behave graph represented as a JSON string into ReactFlow-compatible data structures.
 *
 * @param graph - The Behave graph in JSON format.
 * @returns An array containing ReactFlow nodes, edges, custom events, and variables.
 */
export const behaveToAuthor = (graph: string): [Node[], Edge[], ICustomEvent[], IVariable[]] => {
  //const graphJson = JSON.parse(graph);
  const graphJson = JSON.parse(graph.replace(/":[ \t](Infinity|-IsNaN)/g, '":"{{$1}}"'), function(k, v) {
    if (v === '{{Infinity}}') return Infinity;
    else if (v === '{{-Infinity}}') return -Infinity;
    else if (v === '{{NaN}}') return NaN;
    return v;
    });
  let nodes: Node[] = [];
  const edges: Edge[] = [];
  const customEvents: ICustomEvent[] = graphJson.customEvents || [];
  const variables: IVariable[] = graphJson.variables || [];

  // loop through all the nodes in our behave graph to extract nodes and edges
  let id = 0;
  let needsReflow = true;
  graphJson.nodes.forEach((nodeJSON: any) => {
    
    // construct and add the node to the nodes list
    const x = nodeJSON.metadata?.positionX
    ? Number(nodeJSON.metadata?.positionX)
    : 0;
    const y = nodeJSON.metadata?.positionY
    ? Number(nodeJSON.metadata?.positionY)
    : 0;
    if (x + y != 0) {
      needsReflow = false;
    }

    const node: Node = {
      id: String(id),
      type: nodeJSON.type,
      position: {
        x: x,
        y: y,
      },
      data: {} as { [key: string]: any },
    };
    nodes.push(node);

    // add configuration
    node.data.configuration = {}
    if (nodeJSON.configuration) {
      for (const config of nodeJSON.configuration) {
        node.data.configuration[config.id] = config.value;
      }
    }

    //add custom events and variables
    node.data.customEvents = graphJson.customEvents;
    node.data.variables = graphJson.variables;
    node.data.types = graphJson.types;

    // to keep track of if there is a link for this value
    node.data.linked = {}
    node.data.values = {}
    if (nodeJSON.values) {
      for (const val of nodeJSON.values) {
        if (val.node !== undefined) {
          // if the value is derived from the output of another node, create an edge linking to that node
          edges.push({
            id: uuidv4(),
            source: String(val.node),
            sourceHandle: val.socket,
            target: String(id),
            targetHandle: val.id,
          });
          node.data.linked[val.id] = true;
        } else if (val.value !== undefined) {
          // if the value is a value, we can just get it from the node json
          node.data.values[val.id] = {value: val.value, type: val.type};
        }
      }
    }

    // flows will always be references to other nodes output flows, so for each flow create a backreference edge
    if (nodeJSON.flows) {
      for (const flow of nodeJSON.flows) {
        edges.push({
          id: uuidv4(),
          source: String(id),
          sourceHandle: flow.id,
          target: String(flow.node),
          targetHandle: flow.socket,
        });
      }
    }

    id++;
  });

  if (needsReflow) {
    const setComplexLayout = (nodes: Array<Node>, edges: Array<any>) => {
      const adjacencyList: Record<string, string[]> = {};
  
      // Build adjacency list
      edges.forEach((edge) => {
        const { source, target } = edge;
        if (!adjacencyList[source]) {
          adjacencyList[source] = [];
        }
        if (!adjacencyList[target]) {
          adjacencyList[target] = [];
        }
        adjacencyList[source].push(target);
        adjacencyList[target].push(source);
      });
  
      const visited: Record<string, boolean> = {};
      const rows: string[][] = [];
      const queue: string[] = [];
  
      // Traverse graph and assign rows
      nodes.forEach((node) => {
        const { id } = node;
        if (!visited[id]) {
          visited[id] = true;
          const row: string[] = [];
          queue.push(id);
  
          while (queue.length > 0) {
            const currentNode = queue.shift() as string;
            row.push(currentNode);
  
            if (adjacencyList[currentNode]) {
              adjacencyList[currentNode].forEach((neighbor) => {
                if (!visited[neighbor]) {
                  visited[neighbor] = true;
                  queue.push(neighbor);
                }
              });  
            }
          }
  
          rows.push(row);
        }
      });
  
      // Calculate positions based on rows
      const horizontalSpacing = 3*150;
      const verticalSpacing = 4*100;

      const elements: Array<Node> = [];
  
      rows.forEach((row, rowIndex) => {
        row.forEach((nodeId, nodeIndex) => {
          const node = nodes.find((n) => n.id === nodeId);
          if (node) {
            const x = nodeIndex * horizontalSpacing;
            const y = rowIndex * verticalSpacing;
            elements.push({ ...node, position: { x, y } });
          }
        });
      });
  
      return elements;
    };
  
    nodes = setComplexLayout(nodes,edges);
  }

  return [nodes, edges, customEvents, variables];
};
