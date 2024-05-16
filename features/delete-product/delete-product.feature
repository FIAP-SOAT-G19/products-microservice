Feature: Delete Product
  As a user
  I want to delete a product
  So that the product can be deleted from the system

  Scenario: Successfully delete a product
    Given I have a valid product data delete
    When I send a DELETE request to "/products" with the product data
    Then I should receive a 200 status code, message and the product id