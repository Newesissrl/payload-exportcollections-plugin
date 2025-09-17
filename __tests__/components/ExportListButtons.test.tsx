import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import React, { act } from "react";
//this below to avoid vscode auto-organize import to remove 'React' dependency
type _react = typeof React;

import { ExportListButtons } from "../../src/components/ExportListButtons";

describe("ExportListButtons", () => {
  it("should render", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return {
            user: {
              id: "test-user",
            },
          };
        },
      })
    );
    await act(async () => render(<ExportListButtons collection="users" />));
    expect(screen.getByTestId("export-list-json")).toBeDefined();
  });
});
