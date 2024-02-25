import fs from "fs";
import { default as Template } from "./template";

import * as vscode from "vscode";
import { FileTemplate } from "./types";

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

  const isPublic = await getIsPublicView();

  if (isPublic == undefined) {
    return;
  }

  createFiles(selectPath, fileName, isPublic, template);
};

const createFiles = (
  path: string,
  fileName: string,
  publicControl: boolean,
  template: FileTemplate
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

    for (const iterator of template.files) {
      const preFix = publicControl ? "K" : "";
      const finalFileName = preFix + fileName;
      // 创建路径
      const indexjsPath = `${folderPath}/${iterator.fileName.replaceAll(
        "{{fileName}}",
        finalFileName
      )}`;

      if (!fs.existsSync(indexjsPath)) {
        fs.writeFileSync(
          indexjsPath,
          iterator.fileContent.replaceAll("{{fileName}}", finalFileName)
        );
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

/** 获取所有模板 */
const getTemplates = () => {
  const customCommitType = vscode.workspace
    .getConfiguration("Files")
    .get<Array<FileTemplate>>("Templates");

  if (!customCommitType || customCommitType.length <= 0) {
    return [Template];
  }

  return customCommitType;
};

/** 获取文件名 */
const getFileName = async () => {
  const fileName = await vscode.window.showInputBox({
    title: "请输入组件名称",
    prompt: "输入的名称将会作为组件名称创建",
  });

  if (!fileName) {
    return;
  }

  return fileName;
};

/**
 * 选择模板
 */
const getTemplate = () => {
  return new Promise<FileTemplate | undefined>((reslove, reject) => {
    const templates = getTemplates();

    console.info(templates);

    const quickPick = vscode.window.createQuickPick();
    quickPick.title = "请选择模板";
    quickPick.items = templates.map((a) => {
      return { label: a.templateName };
    });

    quickPick.onDidChangeSelection((e) => {
      if (e.length <= 0) {
        reslove(undefined);
        return;
      }

      const selName = e[0].label;

      reslove(templates.find((a) => a.templateName == selName));

      quickPick.hide();
    });
    quickPick.show();
  });
};

/** 获取是否公用组件 */
const getIsPublicView = () => {
  return new Promise<boolean | undefined>((reslove, reject) => {
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
        reslove(undefined);
        return;
      }

      const selName = e[0].label;

      reslove(selName == "是");

      quickPick.hide();
    });

    quickPick.show();
  });
};
