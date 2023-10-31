import React from "react";
import Table from "./Table";
import generateSymbol from "../utils/generateSymbol";
import sortArray from "../utils/sortArray";
import "../styles/gameboard.css";
import combinations from "../constants/combinations";
import arrayContainsSubarray from "../utils/arrayContains";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstPlayerActive: false,
      isSecondPlayerActive: false,
      isHelpDisabled: true,
      isStartDisabled: false,
      isRestartDisabled: true,
      usedNumbers: new Set(),
      cellNum: null,
      symbol: null,
      counter: 0,
      player1Values: [],
      player2Values: [],
      wonPlayer: null,
    };
    this.initialState = { ...this.state };
  }

  handleStart = () => {
    this.setState({
      isFirstPlayerActive: true,
      isHelpDisabled: false,
      isStartDisabled: true,
    });
  };

  handleHelp = () => {
    const { usedNumbers, counter, player1Values, player2Values } = this.state;
    const randomSymbol = generateSymbol();
    let newCounter = counter + 1;

    // all available numbers from 1 to 9
    const availableNumbers = Array.from({ length: 9 }, (_, index) => index + 1);

    // all remaining numbers
    const remainingNumbers = availableNumbers.filter(
      (number) => !usedNumbers.has(number)
    );

    // random number from available numbers
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const randomNum = remainingNumbers[randomIndex];

    usedNumbers.add(randomNum);

    // checking and assigning a value to a specific user values array
    if (counter % 2 === 0) {
      this.setState({
        player1Values: [...player1Values, randomNum],
      });
    } else {
      this.setState({
        player2Values: [...player2Values, randomNum],
      });
    }

    if (newCounter === 9) {
      this.setState({
        isHelpDisabled: true,
        isFirstPlayerActive: false,
        isSecondPlayerActive: false,
        wonPlayer: 0,
      });
    }

    // changing a users' border bottom according to a counter
    if (counter % 2 === 1) {
      this.setState({
        isFirstPlayerActive: true,
        isSecondPlayerActive: false,
      });
    } else {
      this.setState({
        isFirstPlayerActive: false,
        isSecondPlayerActive: true,
      });
    }

    this.setState({
      usedNumbers,
      cellNum: randomNum,
      symbol: randomSymbol,
      counter: newCounter,
      isStartDisabled: true,
      isRestartDisabled: false,
    });
  };

  handleRestart = () => {
    this.setState({
      ...this.initialState,
      usedNumbers: new Set(),
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { player1Values, player2Values } = this.state;
    if (this.state.counter !== prevState.counter) {
      console.log(sortArray(player1Values));
      console.log(sortArray(player2Values));

      if (arrayContainsSubarray(combinations, sortArray(player1Values))) {
        this.setState({
          wonPlayer: 1,
          isFirstPlayerActive: false,
          isSecondPlayerActive: false,
          isStartDisabled: true,
          isHelpDisabled: true,
        });
      } else if (
        arrayContainsSubarray(combinations, sortArray(player2Values))
      ) {
        this.setState({
          wonPlayer: 2,
          isFirstPlayerActive: false,
          isSecondPlayerActive: false,
          isStartDisabled: true,
          isHelpDisabled: true,
        });
      }
    }
  };

  render() {
    const {
      isFirstPlayerActive,
      isSecondPlayerActive,
      isHelpDisabled,
      isStartDisabled,
      isRestartDisabled,
      cellNum,
      symbol,
      counter,
      wonPlayer,
    } = this.state;

    return (
      <>
        <div className="results__container">
          <span className={`result__item ${isFirstPlayerActive && "active"}`}>
            <span className="player player-1">player 1</span> ( X )
          </span>
          <span className="result__item">:</span>
          <span className={`result__item ${isSecondPlayerActive && "active"}`}>
            <span className="player player-1">player 2</span> ( O )
          </span>
        </div>
        <Table
          cellNum={cellNum}
          symbol={symbol}
          isRestartDisabled={isRestartDisabled}
          counter={counter}
        />

        <div className="buttons__container">
          <button
            onClick={this.handleStart}
            className={isStartDisabled ? "disabled" : ""}
          >
            Start game
          </button>
          <button
            disabled={isHelpDisabled}
            className={isHelpDisabled ? "disabled" : ""}
            onClick={this.handleHelp}
          >
            Help
          </button>
          <button
            onClick={this.handleRestart}
            disabled={isRestartDisabled}
            className={isRestartDisabled ? "disabled" : ""}
          >
            Restart
          </button>
        </div>

        {wonPlayer !== 0 && wonPlayer !== null && (
          <h1>Player {wonPlayer} won !!!</h1>
        )}
        {wonPlayer === 0 && <h1>It is a draw !!!</h1>}
      </>
    );
  }
}
export default GameBoard;
