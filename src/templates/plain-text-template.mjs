import formatAsUSD from "../utils/format-usd.mjs";

export default function plainTextTemplate(data) {
  return `Statement for ${data.customer}\n
${renderPlays(data.performances)}
Amount owed is ${formatAsUSD(data.totalAmount)}
You earned ${data.totalVolumeCredits} credits`;
}

function renderPlays(performances) {
  return performances.reduce(
    (acc, cur) =>
      (acc += `${cur.play.name}: ${formatAsUSD(cur.amount)} (${
        cur.audience
      } seats)\n`),
    ""
  );
}
