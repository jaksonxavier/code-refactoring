import ComedyCalculator from "./calculator/comedy-calculator.mjs";
import TragedyCalculator from "./calculator/tragedy-calculator.mjs";

export default function createStatementData(invoice, plays) {
  const performances = invoice.performances.map((performance) =>
    enrichPerformance(performance, plays)
  );
  const amount = totalAmount(performances);
  const volumeCredits = totalVolumeCredits(performances);

  return {
    customer: invoice.customer,
    performances,
    totalAmount: amount,
    totalVolumeCredits: volumeCredits,
  };
}

function enrichPerformance(performance, plays) {
  const { play, amount, volumeCredits } = createPerformanceCalculator(
    performance,
    playFor(performance, plays)
  );

  return {
    ...performance,
    play,
    amount,
    volumeCredits,
  };
}

function createPerformanceCalculator(performance, play) {
  switch (play.type) {
    case "tragedy":
      return new TragedyCalculator(performance, play);
      break;
    case "comedy":
      return new ComedyCalculator(performance, play);
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
}

function playFor(performance, plays) {
  return plays[performance.playID];
}

function totalAmount(performances) {
  return performances.reduce(
    (total, performance) => total + performance.amount,
    0
  );
}

function totalVolumeCredits(performances) {
  return performances.reduce(
    (total, performance) => total + performance.volumeCredits,
    0
  );
}
