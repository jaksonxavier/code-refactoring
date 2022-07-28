import createStatementData from "./create-statement-data.mjs";
import htmlTemplate from "./template/html-template.mjs";
import plainTextTemplate from "./template/plain-text-template.mjs";

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
  return plainTextTemplate(data);
}

function renderHtml(data) {
  return htmlTemplate(data);
}
