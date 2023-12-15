import { PayloadRequest } from "payload/types";
import exportCollectionsPlugin from "../src/plugins";
import { Config, Plugin } from "payload/config";

describe("exportCollectionsPlugin", () => {
  let plugin: Plugin;
  beforeEach(() => {
    plugin = exportCollectionsPlugin();
  });
  it("config with empty config should not throw exception", () => {
    expect(async () => await plugin({} as Config)).not.toThrow();
  });
});
