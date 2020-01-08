
var expect = require('chai').expect
// var assert = require('chai').assert// chai断言库
// assert.typeOf(addNum, 'string')

/*
测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。
describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"测试index.js"），第二个参数是一个实际执行的函数。

it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称，第二个参数是一个实际执行的函数。
*/
var formatTime = require('./../index')

describe('测试index.js', () => {
  // before(() => console.info('在本区块的所有测试用例之前执行'))

  // after(() => console.info('在本区块的所有测试用例之后执行'))

  // beforeEach(() => console.info('在本区块的每个测试用例之前执行'))

  // afterEach(() => console.info('在本区块的每个测试用例之后执行'))

  describe('Test the addNum function', () => {
    it('Adding two numbers results in the sum of two numbers', () => {
      expect(formatTime(1577498204873)).to.be.equal('2019-12-28 01:56')
    })
  })
})

