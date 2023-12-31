# Blog post platform backend

---

## Installation

1. [`Node.js`](https://nodejs.org/) `LTS`
2. [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or
   [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
3. [`git`](https://git-scm.com/)
4. Install all dependencies (see below)

```sh
cd blog-platform-backend
yarn install
```

## Mode development

`yarn dev`

## Mode production

`yarn server`

## Stack (backend)

- Express
- express-validator
- MongoDB
- Multer
- bcrypt
- JWT

## Configuration

Example of config is `.env.example`, but should use normal file\
Env integration in js located in `./src/shared/constants.ts`
