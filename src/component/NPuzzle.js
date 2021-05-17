import React from "react";
import Utils from "../Utils";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const puzzles = this.props.puzzles;
    return (
      <div>
        {puzzles.map((v, k) => {
          return (
            <span key={k}>
              <Square value={v} onClick={() => this.props.onClick(k, v)} />
            </span>
          );
        })}
      </div>
    );
  }
}

class PuzzleGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      history: [
        {
          puzzles: Utils.getSolvablePuzzleNumbers(3),
        },
      ],
    };
  }

  movePuzzle(puzzles, k, v) {
    const nullIdx = puzzles.findIndex((v) => {
      return v === null;
    });
    console.log("null index is ", nullIdx);
    puzzles[nullIdx] = v;
    puzzles[k] = null;
    return puzzles;
  }

  handleClick(k, v) {
    if (v === null) {
      return;
    }
    console.log("click : ", k, v);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const puzzles = this.movePuzzle(current.puzzles.slice(), k, v);
    console.log(puzzles);

    // todo, checc completing.

    this.setState({
      history: history.concat([{ puzzles: puzzles }]),
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          {desc} - {step.puzzles.join(",")}
        </li>
      );
    });

    return (
      <div className="puzzle-game">
        <div className="puzzle-game-board">
          <Board
            puzzles={current.puzzles}
            onClick={(k, v) => this.handleClick(k, v)}
          />
        </div>
        <div className="puzzle-game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default PuzzleGame;
