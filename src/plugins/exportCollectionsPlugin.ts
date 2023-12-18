import { Config } from "payload/config";
import path from "path";
import { ExportCollectionsPluginConfig } from "../types";
import { FSUtils } from "../utils/FSUtils";
import { ExportListButtons } from "../components/ExportListButtons";
import { Parser } from "@json2csv/plainjs";

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
              ...collection.admin.components,
              BeforeListTable: [ExportListButtons],
            },
          },
          endpoints: (collection.endpoints || []).concat([
            {
              method: "post",
              path: "/save-exports",
              handler: function (req, res) {
                const { type, slug, id } = req.query;
                const { data } = req.body;
                const fsUtils = new FSUtils();
                fsUtils.EmptyFolder(
                  `${id}/${type}`,
                  `${exportsRootDir}/exports`
                );
                const parser = new Parser({
                  formatters: {
                    boolean: (item: any) => {
                      return item ? "0" : "1";
                    },
                    object: (item: any) => {
                      if (!item) {
                        return "";
                      }
                      if (Array.isArray(item)) {
                        item = item.join("|");
                      }
                      return JSON.stringify(item);
                    },
                  },
                });
                const filePath = fsUtils.SaveToFolder(
                  `${id}/${type}`,
                  `exports-${slug}-${Date.now()}.${type}`,
                  type == "json" ? JSON.stringify(data) : parser.parse(data),
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
