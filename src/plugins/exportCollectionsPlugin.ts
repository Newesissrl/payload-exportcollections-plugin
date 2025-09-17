import { json2csv } from "json-2-csv";
import type { Config } from "mzinga/config";
import type { PayloadRequest } from "mzinga/types";
import qs from "qs";
import { ExportListButtons } from "../components/ExportListButtons";
import type { ExportCollectionsPluginConfig } from "../types";
import { FSUtils } from "../utils/FSUtils";

export const exportCollectionsPlugin = (
  pluginConfig?: ExportCollectionsPluginConfig
) => {
  return (incomingConfig: Config): Config => {
    const disabledCollections = pluginConfig?.disabledCollections || [];
    const exportsRootDir = pluginConfig?.rootDir || ".";
    const componentPlacement =
      pluginConfig?.componentPlacement || "BeforeListTable";
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
              [componentPlacement]: [ExportListButtons],
            },
          },
          endpoints: (collection.endpoints || []).concat([
            {
              method: "get",
              path: "/save-exports",
              handler: async function (req: PayloadRequest, res) {
                const { useAsTitle, listSearchableFields = [] } =
                  req.collection.config?.admin || {};
                if (
                  listSearchableFields.indexOf(useAsTitle) === -1 &&
                  useAsTitle
                ) {
                  listSearchableFields.push(useAsTitle);
                }
                const { search, where = { or: [] } } = qs.parse(req.query, {
                  depth: 10,
                  ignoreQueryPrefix: true,
                }) || { where: { or: [] } };
                if (search) {
                  if (!where.or) {
                    where.or = [];
                  }
                  for (const searchableField of listSearchableFields) {
                    where.or.push({
                      [searchableField]: {
                        like: search,
                      },
                    });
                  }
                }
                const { type, slug, id } = req.query;
                const { payload } = req;
                let page = 1;
                let results = [];
                while (page) {
                  const items = await payload.find({
                    collection: slug,
                    limit: 50,
                    page: page,
                    where,
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
                  type == "json"
                    ? JSON.stringify(results, pluginConfig?.jsonReplacer)
                    : json2csv(results, pluginConfig?.csvOptions),
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
