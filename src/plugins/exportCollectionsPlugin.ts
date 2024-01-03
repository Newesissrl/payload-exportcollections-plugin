import { Config } from "payload/config";
import { ExportCollectionsPluginConfig } from "../types";
import { FSUtils } from "../utils/FSUtils";
import { ExportListButtons } from "../components/ExportListButtons";
import { json2csv } from "json-2-csv";
import { PayloadRequest } from "payload/dist/types";

export const exportCollectionsPlugin = (
  pluginConfig?: ExportCollectionsPluginConfig
) => {
  return (incomingConfig: Config): Config => {
    const disabledCollections = pluginConfig?.disabledCollections || [];
    const exportsRootDir = pluginConfig?.rootDir || ".";
    const config: Config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        if (disabledCollections.includes(collection.slug)) {
          return collection;
        }
        return {
          ...collection,
          admin: {
            ...collection.admin,
            components: {
              ...collection.admin?.components,
              BeforeListTable: [ExportListButtons],
            },
          },
          endpoints: (collection.endpoints || []).concat([
            {
              method: "get",
              path: "/save-exports",
              handler: async function (req: PayloadRequest, res) {
                const { type, slug, id } = req.query;
                const { payload } = req;
                let page = 1;
                let results = [];
                while (page) {
                  const items = await payload.find({
                    collection: slug,
                    limit: 50,
                    page: page,
                  });
                  page = items.nextPage;
                  results = results.concat(items.docs || []);
                }
                const fsUtils = new FSUtils();
                fsUtils.EmptyFolder(
                  `${id}/${type}`,
                  `${exportsRootDir}/exports`
                );

                const filePath = fsUtils.SaveToFolder(
                  `${id}/${type}`,
                  `exports-${slug}-${Date.now()}.${type}`,
                  type == "json" ? JSON.stringify(results) : json2csv(results),
                  `${exportsRootDir}/exports`
                );
                res.send(filePath);
              },
            },
            {
              method: "get",
              path: "/download-exports",
              handler: function (req, res) {
                const { filePath } = req.query;
                res.download(filePath.toString());
              },
            },
          ]),
        };
      }),
    };
    return config;
  };
};
