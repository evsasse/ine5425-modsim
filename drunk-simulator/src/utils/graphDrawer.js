export function drawPath(graph, points, color){
  points.reduce(function(prvP, cur) {
    // creates and draws a point in the graph
    const curP = graph.create('point', cur, {
      name: '',
      fixed: true,
      size: 1,
      color: color
    });
    
    if (prvP) {
      // connects the new point to the previous one, if it exists
      graph.create('line', [prvP, curP], {
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        color: color
      });
    }
    
    // passes the created point to the next one
    return curP;
  }, false);
}