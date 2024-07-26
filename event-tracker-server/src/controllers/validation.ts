import Joi from 'joi'

// Define the schema for event validation
export const eventSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  timestamp: Joi.date().required(),
  data: Joi.object().required()
})
