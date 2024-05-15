const { Given, When, Then } = require('@cucumber/cucumber');
const { CreateProductController } = require('../../dist/infra/adapters/controllers/products/create-product.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class CreateProductUseCaseMock {
  async execute(data) {
    return 'mock-product-id';
  }
}

Given('I have a valid product data create', function () {
  requestData = {
    name: 'Test Product',
    category: 'drink',
    price: 10,
    description: 'product description',
    image: 'product-url'
  };
  controller = new CreateProductController(new CreateProductUseCaseMock());
});

When('I send a POST request to {string} with the product data', async function (path) {
  const httpRequest = {
    body: requestData,
    path,
    method: 'POST',
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the product id', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body).to.equal('mock-product-id');
});
