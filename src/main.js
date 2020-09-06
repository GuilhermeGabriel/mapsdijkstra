// create an array with nodes
var nodes = new vis.DataSet([
  { id: 1, label: 'Node 1', group: 0 },
  { id: 2, label: 'Node 2', group: 1 },
  { id: 3, label: 'Node 3', group: 2 },
  { id: 4, label: 'Node 4', group: 3 },
  { id: 5, label: 'Node 5', group: 4 },
  { id: 6, label: 'Node 6', group: 5 },
  { id: 7, label: 'Node 7', group: 6 },
  { id: 8, label: 'Node 8', group: 7 },
  { id: 9, label: 'Node 9', group: 8 },
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 7, to: 4 },
  { from: 3, to: 5 },
  { from: 2, to: 6 },
  { from: 2, to: 7 },
  { from: 9, to: 8 },
  { from: 1, to: 9 },
]);

// create a network
var cont = document.getElementById('content');

// provide the data in the vis format
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  clickToUse: false,
  nodes: {
    shape: 'dot',
    size: 20,
    shadow: true,
  },
};

// initialize your network!
var network = new vis.Network(cont, data, options);
