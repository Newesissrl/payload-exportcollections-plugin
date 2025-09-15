import type { Config, Plugin } from "mzinga/config";
import { exportCollectionsPlugin } from "../../src";

describe("exportCollectionsPlugin", () => {
  let plugin: Plugin;
  beforeEach(() => {
    plugin = exportCollectionsPlugin();
  });
  it("config with empty config should not throw exception", () => {
    expect(async () => await plugin({} as Config)).not.toThrow();
  });
});
