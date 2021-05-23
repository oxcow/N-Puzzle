import Utils from "../Utils";

export default class Puzzle {
  constructor(n, numbers) {
    this.N = n;
    if (numbers) {
      this.numbers = numbers;
    } else {
      this.numbers = Utils.getSolvablePuzzleNumbers(this.N);
    }
    this.nullIndex = Utils.findIndex(this.numbers, null);
  }

  getOffsetByIndex(elementIndex) {
    const row = Math.floor(elementIndex / this.N);
    const col = elementIndex % this.N;
    return { R: row, C: col };
  }

  swapToNull = (elementIndex) => {

    if (this.isSolved()) {
      return;
    }

    const nullOffset = this.getOffsetByIndex(this.nullIndex);
    const elementOffset = this.getOffsetByIndex(elementIndex);

    const canSwapToNull = nullOffset.R === elementOffset.R && Math.abs(nullOffset.C - elementOffset.C) === 1 ||
      nullOffset.C === elementOffset.C && Math.abs(nullOffset.R - elementOffset.R) === 1;

    if (canSwapToNull) {
      this.numbers[this.nullIndex] = this.numbers[elementIndex];
      this.numbers[elementIndex] = null;
      this.nullIndex = elementIndex;
    } else {
      console.log("Can swap", this.numbers[elementIndex], "to null");
    }
  }

  isSolved = () => {
    if (this.numbers.includes(null, -1)) {
      let isSolved = true;
      let baseNumber = this.numbers[0];
      for (let i = 1; i < this.numbers.length - 1; i++) {
        if (this.numbers[i] - baseNumber !== 1) {
          isSolved = false;
          break;
        } else {
          baseNumber = this.numbers[i];
        }
      }
      return isSolved;
    }
    return false;
  }

  clone = () => {
    const clone = Object.assign({}, this);
    Object.setPrototypeOf(clone, Puzzle.prototype);
    return clone;
  }
}