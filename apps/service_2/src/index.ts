import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { red } from '@repo/logger'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono 2!')
})

const port = 3001
red(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
