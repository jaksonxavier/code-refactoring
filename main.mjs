import statement from "./src/statement.mjs";

import invoices from "./src/dataset/invoices.json" assert { type: "json" };
import plays from "./src/dataset/plays.json" assert { type: "json" };

for (const invoice of invoices) {
  console.log(statement(invoice, plays));
}
