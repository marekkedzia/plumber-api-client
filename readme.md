# @marekkedzia/plumber-app

`@marekkedzia/plumber-app` is a comprehensive Express.js middleware and utility library that provides robust error handling, internal storage management, validation, and logging capabilities designed to enhance and streamline the development of Express applications.

## Features

- **Error Handling**: Customizable error handling middleware to catch and respond to various HTTP errors.
- **Internal Storage**: Utilizes `AsyncLocalStorage` for scoped request storage, enhancing traceability and debuggability.
- **Validation**: Body and query validators using `zod` to ensure incoming requests meet expected formats.
- **Logging**: Integrated logging setup using Winston for detailed and color-coded logging.
- **Utilities**: Helper functions like `getOrThrow` for safer data retrieval and `unless` for conditional middleware execution.

## Installation

This package is hosted on a GitHub Package Registry, ensure you have the correct access tokens and configuration to interact with GitHub packages.

1. **Configure npm for GitHub Packages:**

   You may need to create or edit your `~/.npmrc` file to include a line specifying GitHub's package registry URL and your personal access token:

   ```sh
   @marekkedzia:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
   ```

2. **Install the package:**

   ```sh
   npm install @marekkedzia/plumber-app
   ```

## Usage

### Basic Setup

To integrate `@marekkedzia/plumber-app` into your Express application:

```javascript
const express = require('express');
const { getPlumberApp } = require('@marekkedzia/plumber-app');

const appConfig = {
    cors: 'https://yourdomain.com',
    urlPrefix: '/api',
    routers: [/* your plumber routers here */],
    auth: [{
        middleware: (req, res, next) => {/* authentication logic */},
        unless: ['/public']
    }]
};

const app = getPlumberApp(appConfig);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

### Advanced Configuration

Refer to the exported modules to customize your application further:

- **Error Handling**: Customize how errors are caught and handled across your app.
- **Internal Storage**: Use the provided methods to manage request-scoped storage throughout the application lifecycle.
- **Validators**: Use `validateBody` and `validateQuery` to enforce data integrity before handling business logic.

## Contributing

Contributions are welcome! Please refer to the repository's issues tab on GitHub to report bugs or suggest features.

## Author

Marek Kedzia

---
