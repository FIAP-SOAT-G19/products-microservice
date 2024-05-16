const { Given, When, Then } = require('@cucumber/cucumber');
const { GetProductController } = require('../../dist/infra/adapters/controllers/products/get-product.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class GetProductUseCaseMock {
  async execute(data) {
    return {
        id: '1',
        name: 'Coca Cola',
        category: 'drink',
        price: 10,
        description: 'Coca cola description',
        image: 'url'
    };
  }
}

Given('I have a valid product id', function () {
  requestData = '1'
  controller = new GetProductController(new GetProductUseCaseMock());
});

When('I send a GET request to {string} with the product id', async function (path) {
  const httpRequest = {
    path,
    method: 'GET',
    params: { productId: requestData }
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the product information', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body.id).to.equal('1');
  expect(response.body.name).to.equal('Coca Cola');
  expect(response.body.category).to.equal('drink');
  expect(response.body.price).to.equal(10);
  expect(response.body.description).to.equal('Coca cola description');
  expect(response.body.image).to.equal('url');
});
