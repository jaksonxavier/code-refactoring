import assert, { match } from "node:assert";
import http from "node:http";
import test from "node:test";

import handler, { routes } from "./handler.mjs";

const callTracker = new assert.CallTracker();
process.on("exit", () => callTracker.verify());

test("Routers test suite", async (t) => {
  const port = 9009;
  const address = "http://localhost:" + port;
  const server = http.createServer(handler);

  await server.listen(port);

  await t.test("it should be able to carry out a health check", async () => {
    const response = await fetch(address + "/healthcheck", {
      method: "GET",
    });

    assert.strictEqual(response.status, 200);
  });

  await t.test("it should be able returns 404 if route not found", async () => {
    const response = await fetch(address + "/" + Date.now().toString(36));

    assert.strictEqual(response.status, 404);
  });

  // @TODO: it should be able returns 500 if throws any errors

  await server.close();
});
