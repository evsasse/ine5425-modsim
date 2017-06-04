import React from 'react';
import styled from 'styled-components';

import './lib/jsxgraphcore.js';
import './lib/jsxgraph.css';

import {drawPath} from './utils/graphDrawer.js';
import COLORS from './utils/colors.js';

const StepsGraph = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default class PathGraph extends React.Component {
  componentDidMount(){
    this.drawGraph(this.props.paths, this.props.steps);
  }

  componentDidUpdate(){
    this.drawGraph(this.props.paths, this.props.steps);
  }

  drawGraph(paths, steps){
    const bboxSize = Math.sqrt(steps) + Math.max(10, Math.sqrt(steps));
    const graph = JXG.JSXGraph.initBoard('--steps-graph', {
      boundingbox: [-bboxSize, bboxSize, bboxSize, -bboxSize],
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