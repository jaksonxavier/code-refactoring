import createStatementData from "./create-statement-data.mjs";

export default function statement(invoice, plays) {
  const statementData = createStatementData(invoice, plays);

  return renderPlainText(statementData);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // exibe a linha para esta requisição
    result += `${perf.play.name}: ${formatAsUSD(perf.amount)}(${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${formatAsUSD(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;

  return result;
}

function formatAsUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}
