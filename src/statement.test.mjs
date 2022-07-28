import assert from "node:assert";
import { describe, it } from "node:test";

import statement from "./statement.mjs";

describe("Statement", () => {
  const dataset = {
    plays: {
      "romeo-juliet": { name: "Romeo and Juliet", type: "tragedy" },
      "ugly-americans": { name: "Ugly Americans", type: "comedy" },
    },
    invoice: {
      customer: "The Jackson's",
      performances: [
        {
          playID: "romeo-juliet",
          audience: 35,
        },
        {
          playID: "ugly-americans",
          audience: 28,
        },
      ],
    },
  };

  it("should be able to generate a report in plain text", () => {
    const { invoice, plays } = dataset;

    const result = statement(invoice, plays);

    assert.strictEqual(
      result,
      `Statement for The Jackson's\nRomeo and Juliet: $450.00(35 seats)\nUgly Americans: $524.00(28 seats)\nAmount owed is $974.00\nYou earned 10 credits\n`
    );
  });

  it("should not be able to generate a report if unknown play type", () => {
    const { invoice } = dataset;
    const plays = {
      "auto-da-compadecida": { name: "Auto da Compadecida", type: "melodrama" },
    };
  
    const result = () => statement(invoice, plays);
  
    assert.throws(result, `unknown type: ${plays["auto-da-compadecida"].type}`);
  });
});
