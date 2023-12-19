export type LoadResult = {
  result: boolean;
  cause?: string;
  data?: any[];
  strData?: string;
};

export type ExportCollectionsPluginConfig = {
  disabledCollections?: string[];
  rootDir?: string;
};

export type JsonToCsvParserOptions = {
  delimiter?: string;
};
