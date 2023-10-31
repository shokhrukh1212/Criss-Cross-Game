import React from "react";
import "../styles/table.css";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellValues: Array(9).fill(""),
    };
    this.initialState = this.state;
  }

  componentDidUpdate(prevProps) {
    if (this.props.cellNum !== prevProps.cellNum) {
      const { cellNum, isRestartDisabled, counter } = this.props;
      const { cellValues } = this.state;

      if (isRestartDisabled) {
        this.setState({ cellValues: Array(9).fill("") });
      }

      if (cellNum >= 1 && cellNum <= 9) {
        const updatedCellValues = [...cellValues];

        if (counter % 2 !== 0) {
          updatedCellValues[cellNum - 1] = "X";
        } else {
          updatedCellValues[cellNum - 1] = "O";
        }

        this.setState({ cellValues: updatedCellValues });
      }
    }

    // if (
    //   this.props.player1Values !== prevProps.player1Values ||
    //   this.props.player2Values !== prevProps.player2Values
    // ) {
    //   const { player1Values, player2Values } = this.props;
    //   console.log(player1Values);
    //   console.log(player2Values);
    // }
  }

  render() {
    const tableRows = [];
    const { cellValues } = this.state;
    let counter = 0;

    for (let i = 0; i < 3; i++) {
      const tableCells = [];
      for (let j = 0; j < 3; j++) {
        tableCells.push(<td key={j}>{cellValues[counter]}</td>);
        counter++;
      }
      tableRows.push(<tr key={i}>{tableCells}</tr>);
    }
    return (
      <React.Fragment>
        <table border="1">
          <tbody>{tableRows}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
