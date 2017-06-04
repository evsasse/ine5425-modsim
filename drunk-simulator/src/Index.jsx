import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import './index.css';

import DrunkForm from './DrunkForm.jsx';
import PathGraph from './PathGraph.jsx';

import {createPath} from './utils/pathGenerator.js';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  border: 1px solid red;
`;

const Title = styled.h1`
  text-align: center;
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 10,
      reps: 1,
      paths: [[[0,0]]],
    };
  }

  componentDidMount(){
    this.process(this.state.steps, this.state.reps);
  }

  process(steps, reps){
    steps = Math.max(steps, 1);
    reps = Math.max(reps, 1);

    const paths = [];
    for(let i = 0; i < reps; i++){
      const path = createPath(steps);
      paths.push(path);
    } 

    this.setState({steps, reps, paths});

    console.log(this.state);
  }

  render(){
    return (
      <Container>
        <Title>Drunk Simulator</Title>
        <DrunkForm
          steps={this.state.steps}
          reps={this.state.reps}
          onSubmit={(steps, reps) => this.process(steps, reps)}
        />
        <PathGraph paths={this.state.paths.slice(-10)} />
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
