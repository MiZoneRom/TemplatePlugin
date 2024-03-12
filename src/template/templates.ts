import { FileTemplate } from "../types";

const getDefaultView = () => {
  const vueFile = {
    fileName: `{{fileName}}.vue`,
    fileContent: `<template>
  {{fileName}}
</template>
<script lang="ts">
import { defineView } from '@kmsoft/upf-core'
import { {{fileName}}PropOptions, {{fileName}}EventEmits } from './interface'
import {{fileName}}ViewModel from './{{fileName}}ViewModel'

export default defineView({
  name: '{{fileName}}',
  props: {{fileName}}PropOptions,
  emits: {{fileName}}EventEmits,
  viewModel: {{fileName}}ViewModel,
  setup(props, { emit, slots, attrs, vm }) {}
})
</script>
`,
  };

  const vueModelFile = {
    fileName: `{{fileName}}ViewModel.ts`,
    fileContent: `import { BaseViewModel, ViewModelOptions } from '@kmsoft/upf-core'
import { {{fileName}}EmitsType, {{fileName}}PropType } from './interface'

/** {{fileName}} */
export default class {{fileName}}ViewModel extends BaseViewModel<{{fileName}}EmitsType, {{fileName}}PropType> {
  constructor(options: ViewModelOptions<{{fileName}}PropType>) {
    super(options)
  }

  viewDidMount() {}
}
`,
  };

  const interfaceFile = {
    fileName: `interface.ts`,
    fileContent: `import {
  BaseViewPropOptions,
  BaseViewEventEmits,
  ViewEmitsTypeExtract,
  ViewPropsTypeExtract,
  VuePropTypes
} from '@kmsoft/upf-core'

/** 参数 **/
export const {{fileName}}PropOptions = {
  ...BaseViewPropOptions
}

/** 参数类型 **/
export type {{fileName}}PropType = ViewPropsTypeExtract<typeof {{fileName}}PropOptions>

/** 事件 */
export const {{fileName}}EventEmits = {
  ...BaseViewEventEmits
}

/** 事件类型 **/
export type {{fileName}}EmitsType = ViewEmitsTypeExtract<typeof {{fileName}}EventEmits>
`,
  };

  const indexFile = {
    fileName: `index.ts`,
    fileContent: `import { connect, withInstall } from '@kmsoft/upf-core'
import {{fileName}}View from './{{fileName}}.vue'
import {{fileName}}ViewModel from './{{fileName}}ViewModel'

const {{fileName}} = connect({{fileName}}View, {{fileName}}ViewModel)

export default withInstall({{fileName}})
export { {{fileName}}, {{fileName}}View, {{fileName}}ViewModel }

// 模板生成文件
// export * from './{{folderName}}'
`,
  };

  const defaultView: FileTemplate = {
    templateName: "View 普通组件",
    files: [vueFile, vueModelFile, interfaceFile, indexFile],
  };

  return defaultView;
};

const getExtendView = () => {
  const vueFile = {
    fileName: `{{fileName}}.tsx`,
    fileContent: `import { defineExtendView, KTreeView } from '@kmsoft/upf-core'
import { {{fileName}}PropOptions, {{fileName}}EventEmits } from './interface'

export default defineExtendView({
  name: '{{fileName}}',
  props: {{fileName}}PropOptions,
  emits: {{fileName}}EventEmits,
  parent: KTreeView
})
`,
  };

  const vueModelFile = {
    fileName: `{{fileName}}ViewModel.ts`,
    fileContent: `import { BaseViewModel } from '@kmsoft/upf-core'
import { {{fileName}}EmitsType, {{fileName}}PropType } from './interface'

/** {{fileName}} */
export default class {{fileName}}ViewModel extends BaseViewModel<{{fileName}}EmitsType, {{fileName}}PropType> {
  constructor(options: ViewModelOptions<{{fileName}}PropType>) {
    super(options)
  }
  
  /** 加载完成函数 */
  viewDidMount() {}
}
`,
  };

  const interfaceFile = {
    fileName: `interface.ts`,
    fileContent: `import {
  KTreeViewPropOptions,
  KTreeViewEventEmits,
  ViewEmitsTypeExtract,
  ViewPropsTypeExtract,
  VuePropTypes
} from '@kmsoft/upf-core'

/** 参数 **/
export const {{fileName}}PropOptions = {
  ...KTreeViewPropOptions
}

/** 参数类型 **/
export type {{fileName}}PropType = ViewPropsTypeExtract<typeof {{fileName}}PropOptions>

/** 事件 */
export const {{fileName}}EventEmits = {
  ...KTreeViewEventEmits
}

/** 事件类型 **/
export type {{fileName}}EmitsType = ViewEmitsTypeExtract<typeof {{fileName}}EventEmits>
`,
  };

  const indexFile = {
    fileName: `index.ts`,
    fileContent: `import { connect, withInstall } from '@kmsoft/upf-core'
import {{fileName}}View from './{{fileName}}.vue'
import {{fileName}}ViewModel from './{{fileName}}ViewModel'

const {{fileName}} = connect({{fileName}}View, {{fileName}}ViewModel)

export default withInstall({{fileName}})
export { {{fileName}}, {{fileName}}View, {{fileName}}ViewModel }
`,
  };

  const defaultView: FileTemplate = {
    templateName: "ExtendView 继承组件",
    files: [vueFile, vueModelFile, interfaceFile, indexFile],
  };

  return defaultView;
};

const defaultTemplate = [getDefaultView(), getExtendView()];
export { defaultTemplate };
