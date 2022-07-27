export default function statement(invoice, plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map((performance) => enrichPerformance(performance, plays))
  };

  return renderPlainText(statementData);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    let thisAmount = amountFor(perf);

    // exibe a linha para esta requisição
    result += `${perf.play.name}: ${formatAsUSD(thisAmount)}(${
      perf.audience
    } seats)\n`;
  }

  let volumeCredits = totalVolumeCredits(data.performances);
  let amount = totalAmount(data.performances);

  result += `Amount owed is ${formatAsUSD(amount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
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

function formatAsUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function totalVolumeCredits(performances) {
  let volumeCredits = 0;

  for (let performance of performances) {
    volumeCredits += volumeCreditsFor(performance);
  }

  return volumeCredits;
}

function totalAmount(performances) {
  let totalAmount = 0;

  for (let performance of performances) {
    totalAmount += amountFor(performance);
  }

  return totalAmount;
}

function enrichPerformance(performance, plays) {
  const result = Object.assign({}, performance);

  result.play = playFor(performance, plays);

  return result;
}
