import assert from "node:assert";
import { describe, it } from "node:test";

import createStatementData from "./create-statement-data.mjs";
import statement from "./statement.mjs";
import htmlTemplate from "./templates/html-template.mjs";
import plainTextTemplate from "./templates/plain-text-template.mjs";

describe("Statement", () => {
  const database = {
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
    const { invoice, plays } = database;

    const expected = plainTextTemplate(createStatementData(invoice, plays));

    const received = statement(invoice, plays);

    assert.strictEqual(received, expected);
  });

  it("should not be able to generate a report if unknown play type", () => {
    const { invoice } = database;
    const plays = {
      "auto-da-compadecida": { name: "Auto da Compadecida", type: "melodrama" },
    };

    const result = () => statement(invoice, plays);

    assert.throws(result, `unknown type: ${plays["auto-da-compadecida"].type}`);
  });

  it("should be able to generate a report in html", () => {
    const { invoice, plays } = database;

    const expected = htmlTemplate(createStatementData(invoice, plays));

    const received = statement(invoice, plays, "html");

    assert.strictEqual(received, expected);
  });

  it("should be able to throws if report type is unknown", () => {
    const { invoice, plays } = database;

    const result = () => statement(invoice, plays, "invalid-type");

    assert.throws(result, `unknown type: invalid-type`);
  });
});
