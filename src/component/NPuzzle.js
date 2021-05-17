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
      nullIndex: 8,
    };
  }

  getOffset(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { R: row, C: col };
  }

  canExchange(nullIndex, clickIndex) {
    const nullOffset = this.getOffset(nullIndex);
    const clickOffset = this.getOffset(clickIndex);
    return nullOffset.R === clickOffset.R && Math.abs(nullOffset.C - clickOffset.C) === 1 ||
      nullOffset.C === clickOffset.C && Math.abs(nullOffset.R - clickOffset.R) === 1;
  }

  doExchange(puzzles, k, v, nullIndex) {
    puzzles[nullIndex] = v;
    puzzles[k] = null;
    return puzzles;
  }

  isCompleted(puzzles) {
    if (puzzles.includes(null, -1)) {
      let isCompleted = true;
      let baseNumber = puzzles[0];
      for (let i = 1; i < puzzles.length - 1; i++) {
        if (puzzles[i] - baseNumber !== 1) {
          isCompleted = false;
          break;
        } else {
          baseNumber = puzzles[i];
        }
      }
      return isCompleted;
    }
    return false;
  }

  handleClick(k, v) {
    if (v === null) {
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentNullIndex = this.state.nullIndex;

    if (!this.canExchange(currentNullIndex, k)) {
      return;
    }

    const puzzles = this.doExchange(current.puzzles.slice(), k, v, currentNullIndex);

    this.setState({
      history: history.concat([{ puzzles: puzzles }]),
      stepNumber: history.length,
      nullIndex: k,
    });

    if (this.isCompleted(puzzles)) {
      alert("completed");
    }
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