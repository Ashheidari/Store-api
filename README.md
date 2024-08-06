# Product API

This is a Node.js application that provides API endpoints to manage and retrieve products. The application supports various query parameters to filter, sort, and paginate the list of products.

## Features

- Filter products by features, company, name, and numeric values (price, rating).
- Sort products based on multiple fields.
- Select specific fields to be returned in the response.
- Paginate the list of products.

## Prerequisites

- Docker installed on your machine.
- A MongoDB instance (you can also use Docker to run MongoDB).

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/yourusername/product-api.git
cd product-api
```
### Environment Variables

Create a .env file in the root of the project and add the following environment variables:
- MONGO_URI=<your_mongodb_connection_string>
- PORT=3500

### Running the Application with Docker

1. Build the Docker Image
```sh
docker build -t product-api .
```
2. Run the Docker Container
```sh
docker run -d -p 3500:3500 --name product-api --env-file .env product-api 
```

## API Endpoints
### Get All Products
**URL: /api/products**
**Method: GET**
### Query Parameters
- featured: (boolean) Filter by featured products.
- company: (string) Filter by company name.
- name: (string) Filter by product name (supports partial match)
- sort: (string) Sort by fields (comma separated).
- fields: (string) Select specific fields to return (comma separated).
- numericFilters: (string) Filter by numeric fields (supports price and rating).
- page: (number) Page number for pagination.
- limit: (number) Number of items per page.

### Example Request
```sh
curl -X GET "http://localhost:3000/api/products?featured=true&company=Apple&sort=price,-name&fields=name,price,rating&page=2&limit=5"
```

### Example Response
```json
{
  "products": [
    {
      "name": "iPhone",
      "price": 999,
      "rating": 4.5
    }
    // more products
  ],
  "nbHits": 5
}

```