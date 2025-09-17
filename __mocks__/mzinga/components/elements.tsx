import React from "react";
//this below to avoid vscode auto-organize import to remove 'React' dependency
type _react = typeof React;
export const Button = (args: any) => {
  return <button {...args}></button>;
};
