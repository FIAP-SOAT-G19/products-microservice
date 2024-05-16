Feature: Create Product
  As a user
  I want to create a new product
  So that the product can be added to the system

  Scenario: Successfully create a new product
    Given I have a valid product data create
    When I send a POST request to "/products" with the product data
    Then I should receive a 201 status code and the product id