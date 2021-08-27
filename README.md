<h1 align="center">Meta Storage Koa Gateway</h1>

## Introduction

### Feature

- IPFS
  - Fleek Storage
- JWT Auth
  - Cookie
  - Authorization header as bearer token

## Development

### Running

```bash

$ yarn start
# watch mode
$ yarn start:dev
# production environment
$ yarn start:prod

```

### Coding Style

`ESLint` + `Prettier` + `Lint staged` + `Editorconfig`

```bash

$ yarn format

```

#### Conventional Commits

This project is following [commitlint](https://github.com/conventional-changelog/commitlint) rules and checks the commit message with [husky](https://typicode.github.io/husky/#/?id=features). You can also follow the [Local setup](https://commitlint.js.org/#/guides-local-setup) installation guide to install this lint in your project, like following:

```bash
# Install and configure if needed
yarn add -D @commitlint/{cli,config-conventional}
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Active hooks
npx husky install
# or
yarn husky install

# Add hook
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
# or
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

## Deployment

### Environment

Environment file: `.env.${NODE_ENV}`

Environments:

- `dev`
- `test`
- `prod`

Check `.env.example`

### Hosts

#### Vercel
