import * as vscode from "vscode";
import {
  createFiles,
  getFileName,
  getIsPublicView,
  getTemplate,
} from "./utils";

export * from "./utils";
export * from "./types";

export const useTemplate = (context: vscode.ExtensionContext) => {
  let disposable = vscode.commands.registerCommand(
    "projectPlugin.createTemplate",
    (args) => {
      useExtension(args);
    }
  );

  context.subscriptions.push(disposable);
};

const useExtension = async (args: any) => {
  const path = vscode.workspace.workspaceFolders;

  if (!path || path.length <= 0) {
    vscode.window.showErrorMessage("请先打开一个工作区!");
    return;
  }

  // 文件夹路径
  const selectPath = args.fsPath;

  /** 获取模板类型 */
  const template = await getTemplate();

  if (!template) {
    return;
  }

  /** 文件名 */
  const fileName = await getFileName();

  if (!fileName) {
    return;
  }

  // 默认为公共组件
  //const isPublic = await getIsPublicView();

  // if (isPublic == undefined) {
  //   return;
  // }

  createFiles(selectPath, fileName, true, template);
};
