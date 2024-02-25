import { FileTemplate } from "../types";

const getDefaultView = () => {
  const vueFile = {
    fileName: `{{fileName}}.vue`,
    fileContent: `<template>
    {{fileName}}
  </template>
  <script lang="ts">
  import { defineView } from '@kmsoft/upf-core'
  import { {{fileName}}PropOptions } from './interface'
  import {{fileName}}ViewModel from './{{fileName}}ViewModel'
  
  export default defineView({
    name: '{{fileName}}',
    props: {{fileName}}PropOptions,
    viewModel: {{fileName}}ViewModel,
    data() {}
  })
  </script>
  `,
  };

  const vueModelFile = {
    fileName: `{{fileName}}ViewModel.ts`,
    fileContent: `import { BaseViewModel } from '@kmsoft/upf-core'
    import { I{{fileName}}EventEmits, I{{fileName}}State, {{fileName}}PropType } from './interface'
    
    /** 导航管理 */
    export default class {{fileName}}ViewModel extends BaseViewModel<I{{fileName}}State, I{{fileName}}EventEmits, {{fileName}}PropType> {
      /** 加载完成函数 */
      viewDidMount() {}
    }
    `,
  };

  const interfaceFile = {
    fileName: `interface.ts`,
    fileContent: `import { IBaseViewEventEmits, BaseViewOptions, ViewPropsTypeExtract, VuePropTypes } from '@kmsoft/upf-core'
  
  /** {{fileName}} 状态 **/
  export interface I{{fileName}}State {}
  
  /** {{fileName}} 事件 **/
  export interface I{{fileName}}EventEmits extends IBaseViewEventEmits {}
  
  /** {{fileName}} 参数 **/
  export const {{fileName}}PropOptions = {
    ...BaseViewOptions
  }
  
  /** {{fileName}} 参数类型 **/
  export type {{fileName}}PropType = ViewPropsTypeExtract<typeof {{fileName}}PropOptions>
  `,
  };

  const indexFile = {
    fileName: `index.ts`,
    fileContent: `import { connect } from '@kmsoft/upf-core'
  import {{fileName}} from './{{fileName}}.vue'
  import {{fileName}}ViewModel from './{{fileName}}ViewModel'
  
  export default connect({{fileName}}, {{fileName}}ViewModel)
  `,
  };

  const defaultView: FileTemplate = {
    templateName: "View",
    files: [vueFile, vueModelFile, interfaceFile, indexFile],
  };

  return defaultView;
};

const getExtendView = () => {
  const vueFile = {
    fileName: `{{fileName}}.ts`,
    fileContent: `import { defineExtendView, KTreeView } from '@kmsoft/upf-core'
import { {{fileName}}PropOptions } from './interface'

export default defineExtendView({
  name: '{{fileName}}',
  props: {{fileName}}PropOptions,
  emits: {},
  view: {{fileName}}
})
  `,
  };

  const vueModelFile = {
    fileName: `{{fileName}}ViewModel.ts`,
    fileContent: `import { BaseViewModel } from '@kmsoft/upf-core'
    import { I{{fileName}}EventEmits, I{{fileName}}State, {{fileName}}PropType } from './interface'
    
    /** 导航管理 */
    export default class {{fileName}}ViewModel extends BaseViewModel<I{{fileName}}State, I{{fileName}}EventEmits, {{fileName}}PropType> {
      /** 加载完成函数 */
      viewDidMount() {}
    }
    `,
  };

  const interfaceFile = {
    fileName: `interface.ts`,
    fileContent: `import { IBaseViewEventEmits, BaseViewOptions, ViewPropsTypeExtract, VuePropTypes } from '@kmsoft/upf-core'
  
  /** {{fileName}} 状态 **/
  export interface I{{fileName}}State {}
  
  /** {{fileName}} 事件 **/
  export interface I{{fileName}}EventEmits extends IBaseViewEventEmits {}
  
  /** {{fileName}} 参数 **/
  export const {{fileName}}PropOptions = {
    ...BaseViewOptions
  }
  
  /** {{fileName}} 参数类型 **/
  export type {{fileName}}PropType = ViewPropsTypeExtract<typeof {{fileName}}PropOptions>
  `,
  };

  const indexFile = {
    fileName: `index.ts`,
    fileContent: `import { connect } from '@kmsoft/upf-core'
  import {{fileName}} from './{{fileName}}.vue'
  import {{fileName}}ViewModel from './{{fileName}}ViewModel'
  
  export default connect({{fileName}}, {{fileName}}ViewModel)
  `,
  };

  const defaultView: FileTemplate = {
    templateName: "ExtendView",
    files: [vueFile, vueModelFile, interfaceFile, indexFile],
  };

  return defaultView;
};

const defaultTemplate = [getDefaultView(), getExtendView()];
export { defaultTemplate };
