import PerformanceCalculator from "./performance-calculator.mjs";

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
  const calculator = new PerformanceCalculator(
    performance,
    playFor(performance, plays)
  );

  const result = Object.assign({}, performance);

  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = volumeCreditsFor(result);

  return result;
}

function playFor(performance, plays) {
  return plays[performance.playID];
}

function volumeCreditsFor(performance) {
  let volumeCredits = 0;

  // soma créditos por volume
  volumeCredits += Math.max(performance.audience - 30, 0);

  // soma um crédito extra para cada dez espectadores de comédia
  if (performance.play.type === "comedy") {
    volumeCredits += Math.floor(performance.audience / 5);
  }

  return volumeCredits;
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
