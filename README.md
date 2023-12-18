# payload-exportcollections-plugin

Extends `payloadcms` with the ability to export all collection's data to CSV or JSON

## Current status

[![codeql](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/codeql.yml/badge.svg)](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/codeql.yml)

[![test](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/test.yml)

[![publish](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/publish.yml/badge.svg)](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/publish.yml)

[![GitHub Super-Linter](https://github.com/finkinfridom/payload-exportcollections-plugin/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/finkinfridom/payload-exportcollections-plugin/actions/workflows/linter.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4d0eff40f92741f5a2e85a917597b0ec)](https://app.codacy.com/gh/finkinfridom/payload-exportcollections-plugin/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## Install

`yarn add payload-exportcollections-plugin`

## Get Started

### payload.config.ts

```js
import exportCollectionsPlugin from "payload-exportcollections-plugin/dist/plugins";

export default buildConfig({
    ....
    plugins: [exportCollectionsPlugin(config?)]
    ....
})
```

The plugin may expects a `config` object defined like this:

```js
export type ExportCollectionsPluginConfig = {
  disabledCollections?: string[];
};
```

where `disabledCollections` is a list of collections' slugs that you want to exclude from the plugin's enrichment.
