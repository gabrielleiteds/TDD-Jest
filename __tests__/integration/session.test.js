const request = require('supertest')
const faker = require('faker')
//model
const User = require('../../src/models/User')

const app = require('../../src/app');

const truncate = require('../utils/truncate')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  })

  it('should authenticate with valid credentials', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = '123';

    const user = await User.create({
      name,
      email,
      password
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'

      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = '123';

    const user = await User.create({
      name,
      email,
      password
    })

    console.log(user)

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123'

      })

    expect(response.body).toHaveProperty('token');
  })

  it('should be able to access private routes when authenticated', async () => {
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = '123';

    const user = await User.create({
      name,
      email,
      password
    })

    console.log(user)

    const response = await request(app)
      .get('/dashboard')
      .set('authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200);
  })

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/dashboard')

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set("authorization", `Bearer 123123`)
    
      expect(response.status).toBe(401)
    })

}); 
