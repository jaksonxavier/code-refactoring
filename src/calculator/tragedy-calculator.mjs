import PerformanceCalculator from "./performance-calculator.mjs";

export default class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let amount = 40000;
    if (this.performance.audience > 30) {
      amount += 1000 * (this.performance.audience - 30);
    }

    return amount;
  }
}
