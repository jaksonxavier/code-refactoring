export default function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = playFor(perf, plays);
    let thisAmount = amountFor(perf, play);

    // exibe a linha para esta requisição
    result += `${play.name}: ${formatAsUSD(thisAmount)}(${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }

  let volumeCredits = 0;
  for(let perf of invoice.performances) {
    const play = playFor(perf, plays);
    volumeCredits += volumeCreditsFor(perf, play);
  }

  result += `Amount owed is ${formatAsUSD(totalAmount)}\n`;
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
