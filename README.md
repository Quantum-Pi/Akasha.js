# Akasha.js

**THIS PROJECT IS UNDER ACTIVE DEVELOPMENT**

Unofficial API Wrapper for [akasha.cv](https://akasha.cv/)

## Usage

TODO

## API Documentation

The API is documented using the OpenAPI Specification. The contract file is automatically generated from a HAR file obtained by loading the profiles endpoint on akasha.cv.

The documentation can be viewed on [swagger.io](https://editor.swagger.io/?url=https://raw.githubusercontent.com/Quantum-Pi/Akasha.js/main/spec/openapi.yaml)

NOTE:

-   The method of only capturing API calls on the profiles page doesn't reflect the full scope of endpoints on akasha.cv. This decision was made due to my narrow use case. If you've discovered an endpoint not covered in the contract, please open an issue specifying what it is and I can look into supporting it.
-   The automated generation of the contract isn't perfect. If you find a discrepency between the expected type and what it actually contains, please open an issue to notify me.
-   Since akasha.cv's API isn't intended for public use, it can change at any time. The script `pnpm run validate` can detect unexpected changes between the current contract & and an updated HAR file.

## Scripts

```sh
pnpm run gen:openapi # generate the OpenAPI contract from a HAR file (named akasha_profile.har)
pnpm run gen:types   # generate TS types from the json contract and export them to src/schema.ts
pnpm run gen         # runs gen:openapi -> gen:types
pnpm run validate    # validates the current schema against an updated HAR file
```
