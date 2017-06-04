import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class DiffHistogram extends React.Component {
  render() {
    const amountClasses = parseInt(Math.min(Math.sqrt(this.props.paths.length), 30));

    const sqrtExpected = Math.sqrt(this.props.steps);
    const diffs = this.props.paths.map((path) => {
      const lastStep = path[path.length - 1];
      return Math.sqrt(Math.pow(lastStep[0], 2) + Math.pow(lastStep[1], 2)) - sqrtExpected;
    });

    const min = Math.min(...diffs);
    const max = Math.max(...diffs);
    const sizeClasses = (max - min) / amountClasses;

    const classes = []
    for(let i = 0; i < amountClasses; i++){
      classes.push({
        min: min + i * sizeClasses,
        max: min + (i+1) * sizeClasses
      });
    }
    classes[amountClasses-1].max = max;

    const labels = [];
    for(let clss of classes){
      labels.push(`[${clss.min.toFixed(3)} ; ${clss.max.toFixed(3)}]`);
    }

    const datasets = [{
      label: 'Amount of repetitions that fell in the range',
      borderColor: 'black',
      data: classes.map((clss) => diffs.filter((diff) => diff >= clss.min && diff <= clss.max).length)
    }];

    const data = {
      labels,
      datasets,
    };

    const options = {
      scales: { yAxes: [{ display: true, ticks: { beginAtZero: true, suggestedMin: 0, } }] },
    };

    return (
      <Bar
        data={data}
        options={options}
      />
    );
  }
}