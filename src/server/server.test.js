const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

// Tests request to /updateContent endpoint
it('Gets the /updateContent endpoint', async callTest => {
  const response = await request.post('/updateContent')
  expect(response.status).toBe(200)
  callTest()
})

// Tests request to /destinationDetails endpoint
it('Gets the /destinationDetails endpoint', async callTest => {
  const response = await request.post('/destinationDetails')
  expect(response.status).toBe(200)
  callTest()
})

// Tests request to /imageDetails endpoint
it('Gets the /imageDetails endpoint', async callTest => {
  const response = await request.post('/imageDetails')
  expect(response.status).toBe(200)
  callTest()
})

// Tests request to /weatherDetails endpoint
it('Gets the /weatherDetails endpoint', async callTest => {
  const response = await request.post('/weatherDetails')
  expect(response.status).toBe(200)
  callTest()
})
