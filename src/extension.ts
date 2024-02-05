import fs from "fs";
import { default as Templates } from "./template";

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "template.create-template",
    (args) => {
      useExtension(args);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

const useExtension = async (args: any) => {
  const path = vscode.workspace.workspaceFolders;

  if (!path || path.length <= 0) {
    vscode.window.showErrorMessage("请先打开一个工作区!");
    return;
  }

  const fileName = await vscode.window.showInputBox({
    title: "请输入组件名称",
    prompt: "输入的名称将会作为组件名称创建",
  });

  if (!fileName) {
    return;
  }

  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "是否是公共组件";
  quickPick.items = [
    {
      label: "是",
    },
    {
      label: "否",
    },
  ];

  quickPick.onDidChangeSelection((e) => {
    if (e.length <= 0) {
      return;
    }
    // 文件夹路径
    const selectPath = args.fsPath;
    const selName = e[0].label;
    createFiles(selectPath, fileName, selName == "是");
    quickPick.hide();
  });
  quickPick.show();
};

const createFiles = (
  path: string,
  fileName: string,
  publicControl: boolean
) => {
  try {
    /** 文件夹名称 */
    const folderName = toDashCase(fileName);
    /** 目标文件夹路径 */
    const folderPath = `${path}/${folderName}`;

    if (fs.existsSync(folderPath)) {
      vscode.window.showErrorMessage(`文件夹 ${folderName} 已存在`);
    }

    fs.mkdirSync(folderPath);

    for (const iterator of Templates) {
      const preFix = publicControl ? "K" : "";
      // 获取结果
      const result = iterator(preFix + fileName);
      // 创建路径
      const indexjsPath = `${folderPath}/${result.fileName}`;

      if (!fs.existsSync(indexjsPath)) {
        fs.writeFileSync(indexjsPath, result.fileContent);
      } else {
        vscode.window.showErrorMessage("该目录下已存在 index.vue 文件!");
        return;
      }
    }
  } catch (error) {
    vscode.window.showErrorMessage(JSON.stringify(error));
  }
};

const toDashCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
};
