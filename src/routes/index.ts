
import BaseRoute from "xhelpers-api/lib/base-route";
import { todoQueryParams, todoCreatePutPayload, todoPatchPayload } from "./schemas/index";
import { TodoService } from "../services/index";
import { server } from "../index";

const httpResourcePath = "todos";

class TodoRoutes extends BaseRoute<TodoService> {
  constructor() {
    super(new TodoService(), [httpResourcePath]);

    this.route("GET",`/api/${httpResourcePath}`,{
        description: "Search 'Todos'",
      },
      false
    )
      .validate({ query: todoQueryParams })
      .handler(async (r, h, u) => {
        return h.response(
          await this.service.queryAll({}, { filter: r.query, fields: ["-__v"] })
        ).code(200);
      })
      .build();

    this.route("GET", `/api/${httpResourcePath}/{id}`, {
        description: "Get 'Todo' by id",
      },
      false
    )
      .handler(async (r, h, u) => {
        return h.response(
          await this.service.queryAll({}, r.params)
        ).code(200);
      })
      .build();

    this.route("POST", `/api/${httpResourcePath}`, {
        description: "Create new 'Todo'",
      },
      false
    )
      .validate({ payload: todoCreatePutPayload })
      .handler(async (r, h, u) => {
        const response = await this.service.create({}, r.payload);
        await server.publish("/todo", {
          message: "[POST] created todo",
          response: {
            ...response,
            ...r.payload,
            method: "POST",
          }
        });
        return h
          .response(response)
        .code(200);
      })
      .build();

    this.route("PATCH", `/api/${httpResourcePath}/{id}`, {
        description: "Update 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty, payload: todoPatchPayload })
      .handler(async (r, h, u) => {
        const response = await this.service.update({}, r.params.id, r.payload);
        await server.publish("/todo", {
          message: "[PATCH] updated todo",
          response: {
            ...response,
            ...r.payload,
            method: "PATCH",
          }
        });
        return h
          .response(response)
          .code(200);
      })
      .build();

    this.route("PUT", `/api/${httpResourcePath}/{id}`, {
        description: "Replace 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty, payload: todoPatchPayload })
      .handler(async (r, h, u) => {
        const response = await this.service.update({}, r.params.id, r.payload);
        await server.publish("/todo", {
          message: "[PUT] updated todo",
          response: {
            ...response,
            ...r.payload,
            method: "PUT",
          }
        });
        return h
          .response(response)
          .code(200);
      })
      .build();

    this.route("DELETE", `/api/${httpResourcePath}/{id}`, {
        description: "Delete 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty })
      .handler(async (r, h, u) => {
        await this.service.delete({}, r.params.id)
        await server.publish("/todo", {
          message: "[DELETE] deleted todo",
          response: {
            method: "DELETE",
            id: r.params.id
          }
        });
        return h
          .response({})
          .code(201);
      })
      .build();
  }
}

module.exports = [...new TodoRoutes().buildRoutes()];
