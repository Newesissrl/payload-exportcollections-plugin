export type LoadResult = {
  result: boolean;
  cause?: string;
  data?: any[];
  strData?: string;
};

export type ExportCollectionsPluginConfig = {
  disabledCollections?: string[];
  rootDir?: string;
  componentPlacement?:
    | "AfterList"
    | "AfterListTable"
    | "BeforeList"
    | "BeforeListTable";
};

export type JsonToCsvParserOptions = {
  delimiter?: string;
};
