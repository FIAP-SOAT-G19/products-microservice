Feature: Get Products
  As a user
  I want to get all products
  So that I can read all the products

  Scenario: Successfully get a product
    Given I have produts
    When I send a GET request to "/product"
    Then I should receive a 200 status code and the products


