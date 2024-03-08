import { FileTemplate } from "./types";
import * as vscode from "vscode";
import fs from "fs";
import { defaultTemplate } from "./templates";

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param publicControl
 * @param template
 * @returns
 */
export const createFiles = (
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
      return;
    }

    fs.mkdirSync(folderPath);

    // 循环文件
    for (const iterator of template.files) {
      /** 前缀 */
      const preFix = publicControl ? "K" : "";
      /** 文件名称 */
      const finalFileName = preFix + fileName;
      /** 本地文件名称 */
      const localFileName = iterator.fileName
        .replaceAll("{{fileName}}", finalFileName)
        .replaceAll("{{folderName}}", folderName);
      /** 创建路径 */
      const indexjsPath = `${folderPath}/${localFileName}`;

      // 检查文件路径
      if (!fs.existsSync(indexjsPath)) {
        const fileContent = iterator.fileContent.replaceAll(
          "{{fileName}}",
          finalFileName
        );
        fs.writeFileSync(indexjsPath, fileContent);
      } else {
        vscode.window.showErrorMessage(`该目录下已存在 ${localFileName} 文件!`);
        return;
      }
    }
  } catch (error) {
    vscode.window.showErrorMessage(JSON.stringify(error));
  }
};

export const toDashCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
};

/** 获取所有模板 */
export const getTemplates = () => {
  const customCommitType = vscode.workspace
    .getConfiguration("Files")
    .get<Array<FileTemplate>>("Templates");

  if (!customCommitType || customCommitType.length <= 0) {
    return defaultTemplate;
  }

  return customCommitType;
};

/** 获取文件名 */
export const getFileName = async () => {
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
export const getTemplate = () => {
  return new Promise<FileTemplate | undefined>((reslove, reject) => {
    const templates = getTemplates();

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
export const getIsPublicView = () => {
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
