export function createPath(steps){
  const path = [[0, 0]];
  for(var i = 1; i < steps; i++){
    const delta = randomDelta();
    
    const x = path[i-1][0] + delta[0];
    const y = path[i-1][1] + delta[1];
    
    path.push([x, y]);
  }
  return path;
}

function randomDelta(){
  function randomSignal(){
    return Math.random() < 0.5 ? -1 : 1;
  }
  const alfa = Math.random() * Math.PI * randomSignal();
  const x = Math.cos(alfa);
  const y = Math.sin(alfa);
  
  return [x, y];
}