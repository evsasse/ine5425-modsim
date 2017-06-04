import React from 'react';
import styled from 'styled-components';

import './lib/jsxgraphcore.js';
import './lib/jsxgraph.css';

import {drawPath} from './utils/graphDrawer.js';

const COLORS = [
  'red', 'green', 'blue', 'yellow', 'cyan',
  'magenta', 'black', 'grey', 'purple', 'brown',
];

const StepsGraph = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid black;
`;

export default class PathGraph extends React.Component {
  componentDidMount(){
    this.drawGraph(this.props.paths);
  }

  componentDidUpdate(){
    this.drawGraph(this.props.paths);
  }

  drawGraph(paths){
    const graph = JXG.JSXGraph.initBoard('--steps-graph', {
      boundingbox: [-15, 15, 15, -15],
      axis: true
    });

    for(let i = 0; i < paths.length; i++){
      drawPath(graph, paths[i], COLORS[i%COLORS.length]);
    }
  }

  render(){
    return (
      <StepsGraph id="--steps-graph"></StepsGraph>
    );
  }
}