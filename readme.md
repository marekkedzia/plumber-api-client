# @marekkedzia/api-client

`@marekkedzia/api-client` is a robust HTTP client library built on top of Axios, designed to simplify API integrations with features such as retry mechanisms, dynamic query building, and customizable authentication.

---

## Features

- **Retry Mechanism**: Automatically retries failed requests based on customizable conditions.
- **Authentication**: Supports dynamic authorization headers using client-provided credentials.
- **Query Building**: Easily build query strings from parameter objects.
- **Error Handling**: Throws detailed, structured errors for easier debugging and handling in application logic.
- **Flexible Configuration**: Works seamlessly with any RESTful API by providing customizable request options.

---

## Installation

Install the package via npm:

```bash
npm install @marekkedzia/api-client
```

---

## Usage

### Basic Setup

To integrate `@marekkedzia/api-client` into your application:

```typescript
import { ApiClient } from '@marekkedzia/api-client';

const client = new ApiClient({
    url: 'https://api.yourservice.com',
    authHeader: async () => 'Bearer your-token', // Custom function to fetch authorization headers
});

const fetchData = async () => {
    try {
        const response = await client.call({
            method: 'GET',
            path: '/data',
        });
        console.log(response);
    } catch (error) {
        console.error('API call failed:', error);
    }
};

fetchData();
```

---

### Advanced Features

#### Retry Mechanism
The retry logic is customizable and handles transient errors like `5xx` responses by default. You can provide:
- **Custom retry conditions**
- **Before-retry hooks**

Example:
```typescript
await client.call({
    method: 'POST',
    path: '/submit',
    body: { key: 'value' },
});
```

#### Query Builder
Quickly create query strings for GET requests:
```typescript
const query = client.buildQuery({ search: 'term', page: '1' });
// Result: "?search=term&page=1"
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for feature requests or bug fixes.

---

## Author

**Marek Kędzia**  
Developer of tools and libraries to enhance API integrations.

---

## About

`@marekkedzia/api-client` is a TypeScript-based HTTP client library designed for flexibility and reliability, ideal for applications requiring seamless API communication.


## Author

Marek Kedzia

---
