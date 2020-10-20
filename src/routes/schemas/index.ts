import * as Joi from "@hapi/joi";

// ****
// Validation Joi

export const todoBase = Joi.object({
  task: Joi.string()
    .description("Title"),
  description: Joi.string()
    .description("Description"),
  done: Joi.boolean()
    .description("Todo is done"),
});

export const todoQueryParams = todoBase;

export const todoCreatePutPayload = todoBase.keys({
  task: Joi.string()
    .required()
    .description("Title"),
  description: Joi.string()
    .required()
    .description("Description"),
  done: Joi.boolean()
    .required()
    .default(false)
    .description("Todo is done"),
  })
  .description("Todo create payload")
  .label("TodoCreatePayload");

export const todoPatchPayload = todoBase.keys({
  task: Joi.string()
    .description("Title"),
  description: Joi.string()
    .description("Description"),
  done: Joi.boolean()
    .description("Todo is done"),
  })
  .description("Todo update payload")
  .label("TodoUpdatePayload");
