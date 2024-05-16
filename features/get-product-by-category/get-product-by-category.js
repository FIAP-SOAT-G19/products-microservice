const { Given, When, Then } = require('@cucumber/cucumber');
const { GetProductByCategoryController } = require('../../dist/infra/adapters/controllers/products/get-product-by-category.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class GetProductByCategoryUseCaseMock {
  async execute(data) {
    return [
      {
        id: '1',
        name: 'Coca Cola',
        category: 'drink',
      },
      {
        id: '2',
        name: 'Fanta Uva',
        category: 'drink',
      },
    ];
  }
}

Given('I have a valid product category', function () {
  requestData = 'drink'
  controller = new GetProductByCategoryController(new GetProductByCategoryUseCaseMock());
});

When('I send a GET request to {string} with a category', async function (path) {
  const httpRequest = {
    path,
    method: 'GET',
    query: { category: requestData } 
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the products related to the category', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body[0].id).to.equal('1');
  expect(response.body[0].name).to.equal('Coca Cola');
  expect(response.body[0].category).to.equal('drink');
  expect(response.body[1].id).to.equal('2');
  expect(response.body[1].name).to.equal('Fanta Uva');
  expect(response.body[1].category).to.equal('drink');
});
