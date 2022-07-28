class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    throw new Error(`subclass responsibility`);
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

export class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let amount = 40000;
    if (this.performance.audience > 30) {
      amount += 1000 * (this.performance.audience - 30);
    }

    return amount;
  }
}

export class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let amount = 30000;

    if (this.performance.audience > 20) {
      amount += 10000 + 500 * (this.performance.audience - 20);
    }

    amount += 300 * this.performance.audience;

    return amount;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
