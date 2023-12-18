# payload-exportcollections-plugin

Extends `payloadcms` with the ability to export all collection's data to CSV or JSON

## Install

`yarn add @newesissrl/payload-exportcollections-plugin`

## Get Started

### payload.config.ts

```js
import exportCollectionsPlugin from "@newesissrl/payload-exportcollections-plugin";

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
