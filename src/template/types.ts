export type TemplateFile = {
  fileName: string;
  fileContent: string;
};

export type FileTemplate = {
  templateName: string;
  files: Array<TemplateFile>;
};
