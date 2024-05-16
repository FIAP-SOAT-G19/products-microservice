const { Given, When, Then } = require('@cucumber/cucumber');
const { GetProductsController } = require('../../dist/infra/adapters/controllers/products/get-products.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;

class GetProductsUseCaseMock {
  async execute(data) {
    return [
      {
        id: '1',
        name: 'Coca Cola',
        category: 'drink',
      },
      {
        id: '2',
        name: 'Fries',
        category: 'snack',
      },
    ]
  }
}

Given('I have produts', function () {
  controller = new GetProductsController(new GetProductsUseCaseMock());
});

When('I send a GET request to {string}', async function (path) {
  const httpRequest = {
    path,
    method: 'GET',
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the products', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body[0].id).to.equal('1');
  expect(response.body[0].name).to.equal('Coca Cola');
  expect(response.body[0].category).to.equal('drink');
  expect(response.body[1].id).to.equal('2');
  expect(response.body[1].name).to.equal('Fries');
  expect(response.body[1].category).to.equal('snack');
});
