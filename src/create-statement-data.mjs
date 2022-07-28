import {
  ComedyCalculator,
  TragedyCalculator
} from "./performance-calculator.mjs";

export default function createStatementData(invoice, plays) {
  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map((performance) =>
    enrichPerformance(performance, plays)
  );
  statementData.totalAmount = totalAmount(statementData.performances);
  statementData.totalVolumeCredits = totalVolumeCredits(
    statementData.performances
  );

  return statementData;
}

function enrichPerformance(performance, plays) {
  const calculator = createPerformanceCalculator(
    performance,
    playFor(performance, plays)
  );

  const result = Object.assign({}, performance);

  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;

  return result;
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
