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

const Submit = Field.extend`
  background: #777;
  color: #EEE;
  padding: 1em;
`;

export default class DrunkForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.steps.value,
                        event.target.reps.value);
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

        <Submit type="submit" value='REPROCESS'/>
      </Form>
    );
  }
}