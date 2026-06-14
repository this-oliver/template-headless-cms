# Backend

This backend implements a content management system (CMS) powered by [Strapi](https://strapi.io/), a headless CMS framework.

## Getting Started

Prerequisites:
- Node.js 24+
- PNPM 11+
- Prepare environmental variables (see [.env.example](./.env.example))

Install dependencies:

```bash
pnpm Install
```

Setup credentials for the Strapi instance:

```bash
pnpm seed:example
```

Build the admin panel:

```bash
pnpm build
```

## Usage

The Strapi instance can run in two modes:

| Mode        | Create & Manage Schemas | Create & Manage Content |
| ---         | ---                     | ---                     |
| development | yes                     | yes                     |
| production  | no                      | yes                     |

Both modes can be reached at [http://localhost:1337](http://localhost:1337).

### Development

To run the instance in development mode, execute the following command:

```bash
pnpm dev
```

This command will start the Strapi instance and open the admin panel in your default web browser

### Production

To run the instance in production mode, execute the following command:

```bash
pnpm start
```

This command will start the Strapi instance.
