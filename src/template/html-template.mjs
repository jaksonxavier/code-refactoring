import formatAsUSD from "../format-usd.mjs";

export default function htmlTemplate(data) {
  return `<h1>Statement for ${data.customer}</h1>
  <table>
    <tr>
      <th>play</th>
      <th>seats</th>
      <th>cost</th>
    </tr>
    ${renderPlays(data.performances)}
  </table>
  <p>Amount owed is <em>${formatAsUSD(data.totalAmount)}</em></p>
  <p>You earned <em>${data.totalVolumeCredits}</em> credits</p>`;
}

function renderPlays(performances) {
  return performances.reduce(
    (acc, cur) =>
      (acc += `
    <tr>
      <td>${cur.play.name}</td>
      <td>${cur.audience}</td>
      <td>${formatAsUSD(cur.amount)}</td>
    </tr>`),
    ''
  );
}
