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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwillyandor%2Fmeta-storage-koa-gateway%2Ftree%2Ffleek-storage&env=FLEEK_STORAGE_API_KEY,FLEEK_STORAGE_API_SECRET,JWT_PUBLIC_KEY&envDescription=API%20Keys&envLink=https%3A%2F%2Fgithub.com%2Fwillyandor%2Fmeta-storage-koa-gateway%2Fblob%2Ffleek-storage%2F.env.example&demo-title=Simple%20Fleek%20Storage%20Gateway&demo-description=A%20fleek-storage%20based%20file%20uploader%20gateway%20example&demo-url=https%3A%2F%2Fmeta-storage-koa-gateway-3jsfahf95-meta-summer.vercel.app%2F&skippable-integrations=1)
