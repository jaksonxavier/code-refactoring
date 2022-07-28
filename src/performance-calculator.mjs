export default class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    let amount = 0;
  
    switch (this.play.type) {
      case "tragedy":
        amount = 40000;
        if (this.performance.audience > 30) {
          amount += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        amount = 30000;
        if (this.performance.audience > 20) {
          amount += 10000 + 500 * (this.performance.audience - 20);
        }
        amount += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.performance.play.type}`);
    }
  
    return amount;
  }

  get volumeCredits() {
    let volumeCredits = 0;
  
    // soma créditos por volume
    volumeCredits += Math.max(this.performance.audience - 30, 0);
  
    // soma um crédito extra para cada dez espectadores de comédia
    if (this.play.type === "comedy") {
      volumeCredits += Math.floor(this.performance.audience / 5);
    }
  
    return volumeCredits;
  }
}
