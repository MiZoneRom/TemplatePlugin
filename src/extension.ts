import fs from "fs";

import * as vscode from "vscode";
import { useTemplate } from "./template";
import { useGitCommit } from "./git";

export function activate(context: vscode.ExtensionContext) {
  useTemplate(context);
  useGitCommit(context);
}

export function deactivate() {}
