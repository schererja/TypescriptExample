"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as http from "http";
import * as usersRouter from "./core/user/user.routes";


class HttpServer {
  public app: express.Application;
  public router: express.Router;

  public static bootstrap(): HttpServer {
    return new HttpServer();
  }

  constructor() {
    this.app = express();

    this.ExpressConfiguration();
    this.UsersRoutes();
  }

  private ExpressConfiguration(){
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use((err: any,
                  req: express.Request,
                  res: express.Response,
                  next: express.NextFunction) => {
      let error = new Error("Not Found");
      err.status = 404;
      next(err);

    });
  }
  private UsersRoutes() {
    this.router = express.Router();
    var user: usersRouter.User = new usersRouter.User();
    this.router.get("/", user.all.bind(user.all));
    this.router.get("/:id", user.get.bind(user.get));
    this.router.post("/", user.post.bind(user.post));
    this.router.put("/", user.delete.bind(user.delete));
    this.router.delete("/", user.delete.bind(user.delete));
    this.app.use("/api/user", this.router);
  }
}

let port: number = 8080;

let httpServer = HttpServer.bootstrap();
let app = httpServer.app;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
}

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string"
      ? "Pipe " + port
      : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
