export default class PerformanceCalculator {
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
