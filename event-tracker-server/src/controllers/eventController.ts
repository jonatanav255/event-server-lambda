import { Request, Response } from 'express'
import kafka from 'kafka-node'
import { eventSchema } from './validation' // Import the validation schema

// Kafka client and producer setup
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }) // Update with your Kafka broker address
const producer = new kafka.Producer(client)

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.')
})

producer.on('error', error => {
  console.error('Error in Kafka Producer', error)
})

export const handleEvent = (req: Request, res: Response) => {
  const { error, value } = eventSchema.validate(req.body)

  if (error) {
    return res.status(400).send(`Validation error: ${error.details[0].message}`)
  }

  // Kafka message
  const message = JSON.stringify(value)
  const payloads = [{ topic: 'events', messages: message }] // Update 'events' with your topic name

  // Send to Kafka
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message to Kafka', err)
      res.status(500).send('Error sending message to Kafka')
    } else {
      console.log('Message sent to Kafka', data)
      res.status(200).send('Event received')
    }
  })
}
