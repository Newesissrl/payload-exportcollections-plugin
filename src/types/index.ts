import { Json2CsvOptions } from "json-2-csv";

export type LoadResult = {
  result: boolean;
  cause?: string;
  data?: any[];
  strData?: string;
};

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

export type JsonToCsvParserOptions = {
  delimiter?: string;
};
