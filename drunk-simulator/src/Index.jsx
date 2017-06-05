import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import './index.css';

import DrunkForm from './DrunkForm.jsx';
import PathGraph from './PathGraph.jsx';
import DistanceChart from './DistanceChart.jsx';
import AverageChart from './AverageChart.jsx';
import DiffHistogram from './DiffHistogram.jsx';
import DiffTable from './DiffTable.jsx';

import {createPath} from './utils/pathGenerator.js';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 550px;
  border-top: 3px solid black;
  box-sizing: content-box;
  margin-bottom: 4em;
  margin-top: 1em;
  padding-top: 1em;
`;

const Title = styled.h1`
  text-align: center;
`;

const Subtitle = styled.h2`
  text-align: center;
  text-decoration: underline;
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 25,
      reps: 3,
      drawPaths: true,
      drawDistances: true,
      paths: [],
    };
  }

  componentDidMount(){
    this.process(this.state.steps, this.state.reps);
  }

  process(steps, reps, drawPaths=true, drawDistances=true){
    steps = Math.max(steps, 1);
    reps = Math.max(reps, 1);

    const paths = [];
    for(let i = 0; i < reps; i++){
      const path = createPath(steps);
      paths.push(path);
    } 

    this.setState({steps, reps, drawPaths, drawDistances, paths});
  }

  render(){
    const showHistogram = parseInt(Math.sqrt(this.state.reps)) > 1;
    return (
      <Container>

        <Title>Drunk Simulator</Title>

        <DrunkForm
          steps={this.state.steps}
          reps={this.state.reps}
          drawPaths={this.state.drawPaths}
          onSubmit={(...args) => this.process(...args)}
        />

        { showHistogram &&
          <GraphContainer>
            <Subtitle>Histogram</Subtitle>
            <DiffHistogram
              steps={this.state.steps}
              paths={this.state.paths}
            />
          </GraphContainer>
        }

        { !showHistogram &&
          <p>More repetitions are required to show a meaningful histogram.</p>
        }

        {this.state.drawPaths &&
          <GraphContainer>
            <Subtitle>Paths</Subtitle>
            <p>Shows the paths of the last 10 repetitions on a graph.</p>
            <PathGraph 
              steps={this.state.steps}
              paths={this.state.paths.slice(-10)}
            />
          </GraphContainer>
        }

        {this.state.drawDistances &&
          <GraphContainer>
            <Subtitle>Distance during path</Subtitle>
            <p>Shows the distances during the paths of the last 10 repetitions on a line chart.
               Comparing it to the expected sqrt(n).</p>
            <DistanceChart
              steps={this.state.steps}
              paths={this.state.paths.slice(-10)}
            />
          </GraphContainer>
        }

        <GraphContainer>
            <Subtitle>Average of distance during path</Subtitle>
            <p>Shows the average of distances during the paths all repetitions on a line chart.
               Comparing it to the expected sqrt(n).</p>
            <AverageChart
              steps={this.state.steps}
              paths={this.state.paths}
            />
          </GraphContainer>

        <GraphContainer>
          <Subtitle>Final distances</Subtitle>
          <p>Shows the final distances of the last 100 repetitions on a table.
               Comparing it to the expected sqrt(n).</p>
          <p>F = Final distance on the repetition.
             D = Difference from final distance to the espected.</p>
          <DiffTable
            steps={this.state.steps}
            paths={this.state.paths.slice(-100)}
          />
        </GraphContainer>

      </Container>
    );
  }
}

document.title = 'Drunk Simulator';

const root = document.createElement('div');
document.body.append(root);

ReactDOM.render(
  <Index />,
  root
);
