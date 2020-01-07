const superagent = require('supertest')

describe('API test', function() {
  describe('user api', () => {
    it('login respond done', function(done) {
      superagent('http://localhost:3000')
        .get('/users/login')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
    it('register respond done', function(done) {
      superagent('http://localhost:3000')
        .get('/users/register')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
    it('signUp respond done', function(done) {
      superagent('http://localhost:3000')
        .post('/users/signUp')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
    it('exit respond done', function(done) {
      superagent('http://localhost:3000')
        .get('/users/exit')
        .set('Accept', 'application/json')
        .expect(302, done)
    })
  })
  describe('Chat api', () => {
    it('saveChat respond done', function(done) {
      superagent('http://localhost:3000')
        .post('/chat/saveChat')
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })
})
