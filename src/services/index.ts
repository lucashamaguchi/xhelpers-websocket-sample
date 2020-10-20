import Todo, { ITodo } from "../model/index"; // mongoose or sequelize "Model"
import BaseServiceMongoose from "xhelpers-api/lib/base-service-mongoose";

// mongoose
export class TodoService extends BaseServiceMongoose<ITodo> {
  protected sentitiveInfo: any = ["-__v"];
  constructor() {
    super(Todo);
  }
  protected async validate(entity: ITodo, payload: ITodo): Promise<boolean> {
    const invalid = false;
    if (invalid) throw new Error("Invalid payload.");
    return Promise.resolve(true);
  };
}
