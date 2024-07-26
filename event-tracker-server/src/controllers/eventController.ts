import { Request, Response } from 'express'
import Joi from 'joi'

// Define the schema for event validation
const eventSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  timestamp: Joi.date().required(),
  data: Joi.object().required()
})

export const handleEvent = (req: Request, res: Response) => {
  const { error, value } = eventSchema.validate(req.body)

  if (error) {
    return res.status(400).send(`Validation error: ${error.details[0].message}`)
  }

  // Log the valid event
  console.log('Event received:', value)

  // Forward to event queue or store in event bucket

  res.status(200).send('Event received')
}
