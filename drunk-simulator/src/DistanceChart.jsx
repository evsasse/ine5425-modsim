import React from 'react';
import {Line} from 'react-chartjs-2';

import COLORS from './utils/colors.js';

export default class DistanceChart extends React.Component {
  render() {
    const labels = [];
    for(let i = 0; i < this.props.steps; i++){
      labels.push(i);
    }

    const datasets = [{
      label: 'sqrt(steps)',
      borderColor: 'black',
      data: labels.map((steps) => Math.sqrt(steps))
    }];


    for(let i = 0; i < this.props.paths.length; i++){
      const dataset = {};
      const path = this.props.paths[i];

      dataset.label = i+1;
      dataset.borderColor = COLORS[i%COLORS.length];
      dataset.data = path.map((coords) => Math.sqrt(Math.pow(coords[0], 2) + Math.pow(coords[1], 2)));

      datasets.push(dataset);
    }

    const data = {
      labels,
      datasets
    };

    return (
      <Line
        data={data}
      />
    );
  }
}