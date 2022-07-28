import createStatementData from "./create-statement-data.mjs";
import formatAsUSD from "./format-usd.mjs";
import htmlTemplate from "./template/html-template.mjs";

export default function statement(invoice, plays, type = "plainText") {
  const statementData = createStatementData(invoice, plays);

  switch (type) {
    case "plainText":
      return renderPlainText(statementData);
    case "html":
      return renderHtml(statementData);
    default:
      throw new Error(`unknown report type: ${type}`);
  }
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

function renderHtml(data) {
  return htmlTemplate(data);
}
