import { exportCollectionsPlugin } from "../../src";
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
