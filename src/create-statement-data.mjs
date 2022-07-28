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
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);

  return result;
}

function playFor(performance, plays) {
  return plays[performance.playID];
}

function amountFor(performance) {
  let amount = 0;

  switch (performance.play.type) {
    case "tragedy":
      amount = 40000;
      if (performance.audience > 30) {
        amount += 1000 * (performance.audience - 30);
      }
      break;
    case "comedy":
      amount = 30000;
      if (performance.audience > 20) {
        amount += 10000 + 500 * (performance.audience - 20);
      }
      amount += 300 * performance.audience;
      break;
    default:
      throw new Error(`unknown type: ${performance.play.type}`);
  }

  return amount;
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
