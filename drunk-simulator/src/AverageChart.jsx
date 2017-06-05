import React from 'react';
import {Line} from 'react-chartjs-2';

export default class AverageChart extends React.Component {
  render() {
    const labels = [];
    for(let i = 0; i < this.props.steps; i++){
      labels.push(i);
    }

    const reps = this.props.paths.length;
    const averageDistances = [];
    for(let i = 0; i < this.props.steps; i++){
      const avg = this.props.paths.reduce(function(prv, cur){
        return prv + (Math.sqrt(Math.pow(cur[i][0], 2) + Math.pow(cur[i][1], 2)) || 0) / reps;
      }, 0);
      averageDistances.push(avg);
    }

    const datasets = [{
      label: 'sqrt(steps)',
      borderColor: 'black',
      data: labels.map((steps) => Math.sqrt(steps))
    }, {
      label: 'average distance',
      borderColor: 'grey',
      data: averageDistances
    }];

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