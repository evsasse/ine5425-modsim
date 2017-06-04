import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import './index.css';

import DrunkForm from './DrunkForm.jsx';
import PathGraph from './PathGraph.jsx';
import DistanceChart from './DistanceChart.jsx';
import DiffHistogram from './DiffHistogram.jsx';

import {createPath} from './utils/pathGenerator.js';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 4em;
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
      reps: 5,
      drawPaths: true,
      paths: [[[0,0]],[[0,0]],[[0,0]],[[0,0]],[[0,0]]],
    };
  }

  componentDidMount(){
    this.process(this.state.steps, this.state.reps);
  }

  process(steps, reps, drawPaths=true){
    steps = Math.max(steps, 1);
    reps = Math.max(reps, 1);

    const paths = [];
    for(let i = 0; i < reps; i++){
      const path = createPath(steps);
      paths.push(path);
    } 

    this.setState({steps, reps, drawPaths, paths});
  }

  render(){
    return (
      <Container>

        <Title>Drunk Simulator</Title>

        <DrunkForm
          steps={this.state.steps}
          reps={this.state.reps}
          drawPaths={this.state.drawPaths}
          onSubmit={(steps, reps, drawPaths) => this.process(steps, reps, drawPaths)}
        />

        {this.state.drawPaths &&
          <GraphContainer>
            <Subtitle>Paths</Subtitle>
            <PathGraph 
              steps={this.state.steps}
              paths={this.state.paths.slice(-10)}
            />
          </GraphContainer>
        }

        <GraphContainer>
          <Subtitle>Distance</Subtitle>
          <DistanceChart
            steps={this.state.steps}
            paths={this.state.paths.slice(-10)}
          />
        </GraphContainer>

        <GraphContainer>
          <Subtitle>Histogram</Subtitle>
          <DiffHistogram
            steps={this.state.steps}
            paths={this.state.paths}
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
