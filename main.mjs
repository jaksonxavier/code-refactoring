import statement from "./src/statement.mjs";

import invoices from "./invoices.json" assert { type: "json" };
import plays from "./plays.json" assert { type: "json" };

for (const invoice of invoices) {
  console.log(statement(invoice, plays));
}
