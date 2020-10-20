require("dotenv").config();

import { createServer } from "xhelpers-api/lib/server";
import * as Nes from "@hapi/nes";
const pkgJson = require("../package.json");

export let server: any;
const options: any = {
  serverOptions: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "127.0.0.1",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  },
  options: {
    jwt_secret: process.env.JWT_SECRET,
    app_key_auth: process.env.WEBSOCKET_API_APP_KEY,
    swaggerOptions: {
      info: {
        title: pkgJson.name,
        version: pkgJson.version,
      },
      schemes: [process.env.SSL === "true" ? "https" : "http"],
      grouping: "tags",
    },
    routeOptions: {
      routes: "*/routes/*.js",
    },
    mongooseOptions: {
      uri: process.env.MONGODB_URI,
    },
  },
};

export async function getServer(){
  let serverAux: any = {};
  serverAux = await createServer(options);
  await serverAux.register(Nes);
  serverAux.subscription('/{channel}', { auth: false });
  serverAux.subscription('/{channel}/{id}', { auth: false });
  return serverAux;
}

async function start() {
  server = await getServer();
  await server.start();
  return server;
}

if (typeof require !== 'undefined' && require.main === module) {
  start();
}
