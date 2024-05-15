Feature: Update Product
  As a user
  I want to update an existing product
  So that the product can be updated to the system

  Scenario: Successfully update an existing product
    Given I have a valid product data update
    When I send a PATCH request to "/products" with the product data
    Then I should receive a 200 status code and the product information updated