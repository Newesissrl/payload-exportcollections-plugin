# payload-exportcollections-plugin

Extends `payloadcms` with the ability to export all collection's data to CSV or JSON

## Install

`yarn add @newesissrl/payload-exportcollections-plugin`

## Get Started

### payload.config.ts

```js
import { exportCollectionsPlugin } from "@newesissrl/payload-exportcollections-plugin";

export default buildConfig({
    ....
    plugins: [exportCollectionsPlugin(config?)],
    i18n: {
      resources: {
        // to localize the buttons' labels
        en: {
          general: {
            "export-list-csv": "Export list (CSV)",
            "export-list-json": "Export list (JSON)",
          },
        },
        it: {
          general: {
            "export-list-csv": "Esporta lista (CSV)",
            "export-list-json": "Esporta lista (JSON)",
          },
        },
      },
    }
    ....
})
```

The plugin may expects a `config` object defined like this:

```js
export type ExportCollectionsPluginConfig = {
  disabledCollections?: string[];
  rootDir?: string;
  jsonReplacer?: (key: string, value: any) => any;
  csvOptions?: Json2CsvOptions;
  componentPlacement?:
    | "AfterList"
    | "AfterListTable"
    | "BeforeList"
    | "BeforeListTable";
};
```

where:
- `disabledCollections` is a list of collections' slugs that you want to exclude from the plugin's enrichment.
- `rootDir` is the directory where to temporarily store the exported files
- `componentPlacement` identify where to place the component
- `jsonReplacer` is a function useful to replace fields (and/or omit them in the final result). see [here](https://dillionmegida.com/p/second-argument-in-json-stringify/#function-replacers)
- `csvOptions` is the same implementation as per the core [json-2-csv](https://www.npmjs.com/package/json-2-csv) package. see [here](https://mrodrig.github.io/json-2-csv/)



## Notes

If you followed the above guide and still cannot see the buttons, it may be needed to update your webpack config as per below:

```js
export default buildConfig({
  admin: {
    webpack: (config: any) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            payload: path.resolve("./node_modules/payload"), // this will fix the components usage of `useConfig` hook
          }
        }
      }
    }
  }
})
```