import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import { URL_BACKEND_AUTH } from '../app/appConst'

export const handlers = [
  rest.post(URL_BACKEND_AUTH, (req, res, ctx) => {
    return res(ctx.json({
      access_token: 'dsa',
      token_type: 'dsa',
      refresh_token: 'dsa',
      expires_in: 1,
      scope: 'dsa',
      greetings: 'dsa',
      error: 'dsa',
      error_description: 'dsa'
    }), ctx.delay(200))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('user login and logout', async() => {
  // renderWithProviders(<UserDisplay />)
  // expect(screen.getByText(/no user/i)).toBeInTheDocument()
});