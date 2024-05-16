const { Given, When, Then } = require('@cucumber/cucumber');
const { DeleteProductController } = require('../../dist/infra/adapters/controllers/products/delete-product.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class DeleteProductUseCaseMock {
  async execute(data) {
    return {
      message: 'Product deleted',
      productId: 'mock-product-id'
    };
  }
}

Given('I have a valid product data delete', function () {
  requestData = 'mock-product-id'
  controller = new DeleteProductController(new DeleteProductUseCaseMock());
});

When('I send a DELETE request to {string} with the product data', async function (path) {
  const httpRequest = {
    path,
    method: 'DELETE',
    params: { productId: requestData }
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code, message and the product id', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body.message).to.equal('Product deleted');
  expect(response.body.productId).to.equal('mock-product-id');
});
