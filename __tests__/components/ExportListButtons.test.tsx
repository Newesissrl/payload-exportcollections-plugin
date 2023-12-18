import React from "react";
import renderer from "react-test-renderer";
import { ExportListButtons } from "../../src/components/ExportListButtons";

describe("ExportListButtons", () => {
  it("should render", () => {
    const component = renderer.create(<ExportListButtons collection="users" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
