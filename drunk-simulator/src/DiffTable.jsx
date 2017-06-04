import React from 'react';
import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Cell = styled.div`
  width: 10%;
  background: #AAA;
  margin: 0.2em;
  padding: 0.2em;
`;

export default class DiffTable extends React.Component {
  render() {
    const cells = this.props.paths.map((path) => {
      const lastStep = path[path.length-1];
      const finalDistance = Math.sqrt(Math.pow(lastStep[0], 2) + Math.pow(lastStep[1], 2));
      const diffExpected = finalDistance - Math.sqrt(this.props.steps);
      return (
        <Cell>
          F = {finalDistance.toFixed(3)}<br/>
          D = {diffExpected.toFixed(3)}
        </Cell>
      );
    });

    return (
      <Table>
       {cells}
      </Table>
    );
  }
}