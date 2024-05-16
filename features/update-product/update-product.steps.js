const { Given, When, Then } = require('@cucumber/cucumber');
const { UpdateProductController } = require('../../dist/infra/adapters/controllers/products/update-product.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class UpdateProductUseCaseMock {
  async execute(data) {
    return {
      id: '1',
      name: 'Test Product',
      category: 'dessert',
      price: 10,
      description: 'product description',
      image: 'product-url'
    };
  }
}

Given('I have a valid product data update', function () {
  requestData = {
    name: 'Test Product',
    price: 10,
  };
  controller = new UpdateProductController(new UpdateProductUseCaseMock());
});

When('I send a PATCH request to {string} with the product data', async function (path) {
  const httpRequest = {
    path,
    method: 'PATCH',
    body: requestData,
    params: { productId: '1' }
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the product information updated', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body.id).to.equal('1');
  expect(response.body.name).to.equal('Test Product');
  expect(response.body.category).to.equal('dessert');
  expect(response.body.price).to.equal(10);
  expect(response.body.description).to.equal('product description');
  expect(response.body.image).to.equal('product-url');
});
