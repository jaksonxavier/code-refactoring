export default function statement(invoice, plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances
  };

  return renderPlainText(statementData, plays);
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    const play = playFor(perf, plays);
    let thisAmount = amountFor(perf, play);

    // exibe a linha para esta requisição
    result += `${play.name}: ${formatAsUSD(thisAmount)}(${
      perf.audience
    } seats)\n`;
  }

  let volumeCredits = totalVolumeCredits(data.performances, plays);
  let amount = totalAmount(data.performances, plays);

  result += `Amount owed is ${formatAsUSD(amount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}

function amountFor(performance, play) {
  let amount = 0;

  switch (play.type) {
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
      throw new Error(`unknown type: ${play.type}`);
  }

  return amount;
}

function playFor(performance, plays) {
  return plays[performance.playID];
}

function volumeCreditsFor(performance, play) {
  let volumeCredits = 0;

  // soma créditos por volume
  volumeCredits += Math.max(performance.audience - 30, 0);

  // soma um crédito extra para cada dez espectadores de comédia
  if (play.type === "comedy") {
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

function totalVolumeCredits(performances, plays) {
  let volumeCredits = 0;

  for (let performance of performances) {
    const play = playFor(performance, plays);
    volumeCredits += volumeCreditsFor(performance, play);
  }

  return volumeCredits;
}

function totalAmount(performances, plays) {
  let totalAmount = 0;

  for (let performance of performances) {
    const play = playFor(performance, plays);
    totalAmount += amountFor(performance, play);
  }

  return totalAmount;
}
