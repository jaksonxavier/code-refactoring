import PerformanceCalculator from "./performance-calculator.mjs";

export default class ComedyCalculator extends PerformanceCalculator {
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
