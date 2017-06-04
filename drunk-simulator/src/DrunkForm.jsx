import React from 'react';
import styled from 'styled-components';


const Form = styled.form`
  margin: 0 auto;
  width: 500px;
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  color: #777;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid #DDD;
  padding: 0.3em;
  margin-bottom: 0.5em;
  color: #777;
`;

const Checkbox = styled.input`
  margin-right: 0.3em;
`;

const Submit = Field.extend`
  background: #777;
  color: #EEE;
  padding: 1em;
`;

export default class DrunkForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();

    const steps = event.target.steps.value;
    const reps = event.target.reps.value;
    let drawPaths = event.target.drawPaths.checked;
    let drawDistances = event.target.drawDistances.checked;

    if(drawPaths && steps > 100){
      if(!window.confirm('Are you sure you want to draw paths with more than 100 steps? It can be VERY slow!')){
        return;
      }
    }

    if(drawDistances && steps > 500){
      if(!window.confirm('Are you sure you want to draw distances with more than 500 steps? It can be VERY slow!')){
        return;
      }
    }

    this.props.onSubmit(steps,
                        reps,
                        drawPaths,
                        drawDistances);
  }

  render(){
    return (
      <Form onSubmit={(event) => this.onSubmit(event)}>
        <Label>Steps:</Label>
        <Field
          name='steps'
          type='text'
          defaultValue={this.props.steps}
        />

        <Label>Repetitons:</Label>
        <Field
          name='reps'
          type='text'
          defaultValue={this.props.reps}
        />

        <div>
          <Checkbox
            name="drawPaths"
            type="checkbox"
            defaultChecked={this.props.drawPaths}
          />
          Draw paths. Slow if steps > 100.
        </div>

        <div>
          <Checkbox
            name="drawDistances"
            type="checkbox"
            defaultChecked={this.props.drawPaths}
          />
          Draw distances. Slow if steps > 500.
        </div>

        <Submit type="submit" value='SIMULATE AGAIN'/>
      </Form>
    );
  }
}