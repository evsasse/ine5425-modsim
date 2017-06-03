import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import './index.css';

import DrunkForm from './DrunkForm.jsx';

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
      reps: 10,
    };
  }

  process(steps, reps){
    window.alert(`steps: ${steps}; reps: ${reps}`);
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
