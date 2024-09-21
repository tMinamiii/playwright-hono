import {test, request, expect} from '@playwright/test'
import {createReadStream} from 'node:fs'

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

test('APIテスト(form)', async ({request}) => {
  const result = await request.post('http://localhost:3000/form', {
    form: {
      username: 'bob',
      password: 'sercret'
    }
  })
  expect(result.ok()).toBeTruthy()
  expect(await result.json()).toEqual({status: 'ok'})
})

test('APIテスト(file)', async ({request}) => {
  const result = await request.post('http://localhost:3000/file', {
    multipart: {
      file1: {
        name: 'dummy.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('test text')
      },
      file2: createReadStream('./tests/text.txt'),
      notFile: 'ファイル以外も同時に送れます'
    },
  })
  expect(result.ok()).toBeTruthy()
  expect(await result.json()).toEqual({status: 'ok'})
})
