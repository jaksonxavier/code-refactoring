import { parse } from "node:url";

import { DEFAULT_HEADER } from "../utils/default-header.mjs";

export const routes = {
  "/healthcheck:get": (request, response) =>
    response.writeHead(200, DEFAULT_HEADER).end(),
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.end();
  },
};

export default function handler(request, response) {
  const { url, method } = request;

  const { pathname } = parse(url, true);

  const key = pathname + ":" + method.toLowerCase();

  const chosen = routes[key] || routes.default;

  return Promise.resolve(chosen(request, response)).catch(
    handlerError(response)
  );
}

function handlerError(response) {
  return () => {
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Server failed. Try again soon" }));
    response.end();
  };
}
