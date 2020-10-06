const User = require('../../src/models/User')

describe('Authentication', () => {
  it('should sum two numbers', async () => {
    const user = await User.create({
      name: 'Guilherme Leite',
      email: 'Guilherme@email.com',
      password: '123'
    })

    console.log(user)

    expect(user.email).toBe('Guilherme@email.com');
  });
}); 
