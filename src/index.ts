import {serve} from '@hono/node-server'
import {Hono} from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.text('Hello Hono!')
})

app.get('header-and-query', async (c) => {
  console.log(c.req.header())
  console.log(c.req.queries())
  return c.text('ok')
})

app.post('/json', async (c) => {
  const json = await c.req.json()
  console.log(JSON.stringify(json, null, 2))
  return c.text('ok')
})

app.post('/form', async (c) => {
  const form = await c.req.formData()
  for (const [key, value] of form.entries()) {
    console.log(`${key}: ${value}`)
  }
  return c.json({status: 'ok'})
})


app.post('/file', async (c) => {
  const form = await c.req.formData()
  for (const [key, value] of form.entries()) {
    if (value instanceof File) {
      console.log(`${key}: name=${value.name} type=${value.type} content=${await value.text()}`)
    } else {
      console.log(`${key}: ${value}`)
    }
  }
  return c.json({status: 'ok'})
})


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
