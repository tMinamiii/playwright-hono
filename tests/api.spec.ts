import {test, request, expect} from '@playwright/test'

test('api', async ({request}) => {
  const result = await request.get('http://localhost:3000/')
  expect(result.ok()).toBeTruthy()
  expect(await result.text()).toEqual('Hello Hono!')
})

test('APIテスト', async ({request}) => {
  const result = await request.get('http://localhost:3000/hello')
  expect(result.ok()).toBeTruthy()
  expect(await result.text()).toEqual('Hello Hono!')
})

test('APIテスト(fetch)', async ({request}) => {
  const result = await request.fetch('http://localhost:3000/hello', {method: 'get'})
  expect(result.ok()).toBeTruthy()
  expect(await result.text()).toEqual('Hello Hono!')
})

test('APIテスト(header and query)', async ({request}) => {
  const result = await request.get('http://localhost:3000/header-and-query', {
    headers: {
      'X-Test-Header': 'text'
    },
    params: {
      'search': 'word',
    }
  })
  expect(result.ok()).toBeTruthy()
  expect(await result.text()).toEqual('ok')
})

test('APIテスト(json)', async ({request}) => {
  const result = await request.post('http://localhost:3000/json', {
    data: {
      from: 'Playwright API test'
    }
  })
  expect(result.ok()).toBeTruthy()
  expect(await result.text()).toEqual('ok')
})


