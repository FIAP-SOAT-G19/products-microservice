Feature: Get Product
  As a user
  I want to get a product information
  So that I can read the product information

  Scenario: Successfully get a product
    Given I have a valid product id
    When I send a GET request to "/product" with the product id
    Then I should receive a 200 status code and the product information


