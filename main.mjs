import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import invoices from "./src/database/invoices.json" assert { type: "json" };
import plays from "./src/database/plays.json" assert { type: "json" };
import statement from "./src/statement.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const [, , reportType = "plainText", filename = "report.txt"] = process.argv;

for (const invoice of invoices) {
  try {
    fs.writeFileSync(
      path.join(__dirname, "reports", filename),
      statement(invoice, plays, reportType)
    );

    console.log("✅ - Report generated successfully");
  } catch (error) {
    console.error("❌ - " + error.message);
  }
}
