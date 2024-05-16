Feature: Get Product
  As a user
  I want to get a product by category
  So that I can find the specific category products

  Scenario: Successfully get a product category
    Given I have a valid product category
    When I send a GET request to "/product" with a category
    Then I should receive a 200 status code and the products related to the category


