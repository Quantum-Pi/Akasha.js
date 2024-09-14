# Akasha.js &middot; [![NPM Version](https://img.shields.io/npm/v/akasha.js)](https://www.npmjs.com/package/akasha.js) [![NPM Downloads](https://img.shields.io/npm/dm/akasha.js)](https://www.npmjs.com/package/akasha.js) [![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/akasha.js)](https://www.npmjs.com/package/akasha.js?activeTab=code) ![GitHub License](https://img.shields.io/github/license/Quantum-Pi/Akasha.js) [![Static Badge](https://img.shields.io/badge/API_Contract-Swagger-green)](https://editor.swagger.io/?url=https://raw.githubusercontent.com/Quantum-Pi/Akasha.js/main/spec/openapi.yaml)

Unofficial API Wrapper for [akasha.cv](https://akasha.cv/)

## Usage

### Installation

```sh
npm i akasha.js
yarn add akasha.js
pnpm i akasha.js
```

### Example

```ts
import Akasha from 'akasha.js'

const akasha = new Akasha('uuid')
const calcs = await akasha.getCalculationsForUser()
const ranking =
    (calcs.data[0].calculations.fit.ranking /
        calcs.data[0].calculations.fit.outOf) *
    100
const name = calcs.data[0].name

console.log(`${name}: ${ranking.toFixed(2)}%`)
```

## API Documentation

The API is documented using the OpenAPI Specification. The contract file is automatically generated from a HAR file obtained by loading the various endpoints on akasha.cv.

The documentation can be viewed on [swagger.io](https://editor.swagger.io/?url=https://raw.githubusercontent.com/Quantum-Pi/Akasha.js/main/spec/openapi.yaml)

NOTE:

-   The method used to capture API calls doesn't reflect the full scope of endpoints on akasha.cv. This decision was made due to my narrow use case. If you've discovered an endpoint not covered in the contract, please open an issue specifying what it is and I can look into supporting it. Please keep in mind that any endpoints containing data that can be found on Enka.network and/or interact with (Enka.network)[https://enka.network/] are intentionally excluded.
-   The automated generation of the contract isn't perfect. If you find a discrepency between the expected type and what it actually contains, please open an issue to notify me.
-   Akasha.cv's API isn't intended for public use and can change at any time. The script `pnpm run validate` can detect unexpected changes between the repo's contract and a newly generated one. `pnpm run gen` will genereate an updated contract & typings.
-   Other's are more then welcome to use the generated API contract in this repo for their own purposes, such as a wrapper in another language. Please keep in mind that it can quickly become out of date is you choose to copy it.

## Project Structure

### Scripts

```sh
pnpm run gen:openapi # generate the OpenAPI contract from a HAR file (named akasha_profile.har)
pnpm run gen:types   # generate TS types from the json contract and export them to src/schema.ts
pnpm run gen         # runs gen:openapi -> gen:types
pnpm run validate    # validates the current schema against an updated HAR file
```
