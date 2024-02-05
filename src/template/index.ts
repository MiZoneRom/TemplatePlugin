const getVueFile = (fileName: string) => {
  const fileContent = `<template>
  ${fileName}
</template>
<script lang="ts">
import { defineView } from '@kmsoft/upf-core'
import { ${fileName}PropOptions } from './interface'
import ${fileName}ViewModel from './${fileName}ViewModel'

export default defineView({
  name: '${fileName}',
  props: ${fileName}PropOptions,
  viewModel: ${fileName}ViewModel,
  data() {}
})
</script>
`;

  return {
    fileName: `${fileName}.vue`,
    fileContent: fileContent,
  };
};

const getVueModelFile = (fileName: string) => {
  const fileContent = `import { BaseViewModel } from '@kmsoft/upf-core'
import { I${fileName}EventEmits, I${fileName}State, ${fileName}PropType } from './interface'

/** 导航管理 */
export default class ${fileName}ViewModel extends BaseViewModel<I${fileName}State, I${fileName}EventEmits, ${fileName}PropType> {
  /** 加载完成函数 */
  viewDidMount() {}
}
`;

  return {
    fileName: `${fileName}ViewModel.ts`,
    fileContent: fileContent,
  };
};

const getInterfaceFile = (fileName: string) => {
  const fileContent = `import { IBaseViewEventEmits, BaseViewOptions, ViewPropsTypeExtract, VuePropTypes } from '@kmsoft/upf-core'

/** ${fileName} 状态 **/
export interface I${fileName}State {}

/** ${fileName} 事件 **/
export interface I${fileName}EventEmits extends IBaseViewEventEmits {}

/** ${fileName} 参数 **/
export const ${fileName}PropOptions = {
  ...BaseViewOptions
}

/** ${fileName} 参数类型 **/
export type ${fileName}PropType = ViewPropsTypeExtract<typeof ${fileName}PropOptions>
`;

  return {
    fileName: `interface.ts`,
    fileContent: fileContent,
  };
};

const getIndexFile = (fileName: string) => {
  const fileContent = `import { connect } from '@kmsoft/upf-core'
import ${fileName} from './${fileName}.vue'
import ${fileName}ViewModel from './${fileName}ViewModel'

export default connect(${fileName}, ${fileName}ViewModel)
`;

  return {
    fileName: `index.ts`,
    fileContent: fileContent,
  };
};

const templates = [getVueFile, getVueModelFile, getInterfaceFile, getIndexFile];

export default templates;
