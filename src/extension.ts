
const fs = require('fs');
import { default as Templates } from './template';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('template.create-template', (args) => {
		useExtension(args);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

const useExtension = async (args: any) => {
	try {
		const path = vscode.workspace.workspaceFolders;

		if (!path || path.length <= 0) {
			vscode.window.showErrorMessage('请先打开一个工作区!');
			return;
		}

		const text = await vscode.window.showInputBox({ title: '请输入文件名称', prompt: '文件名将会作为组件名称创建' });

		if (!text) {
			return;
		}

		// 文件夹路径
		const selectPath = args.fsPath;

		for (const iterator of Templates) {
			// 获取结果
			const result = iterator(text);
			// 创建路径
			const indexjsPath = `${selectPath}/${result.fileName}`;

			if (!fs.existsSync(indexjsPath)) {
				fs.writeFileSync(indexjsPath, result.fileContent);
			} else {
				vscode.window.showErrorMessage('该目录下已存在 index.vue 文件!');
				return;
			}
		}

	}
	catch (error) {
		vscode.window.showErrorMessage(JSON.stringify(error));
	}
};