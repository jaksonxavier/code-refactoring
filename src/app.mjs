import http from "node:http";

import handler from "./routers/handler.mjs";

const server = http.createServer(handler);

server.listen(3333, () =>
  console.log("The server is running on port: " + 3333)
);
