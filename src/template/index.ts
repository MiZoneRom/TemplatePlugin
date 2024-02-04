

const getVueFile = (fileName: string) => {

  const fileContent = `
  <template>
    <div></div>
  </template>

  <script setup>
  import { onMounted } from 'vue'

  const handleData = () => {
    console.log('handle data!')
  }

  onMounted(() => {
    handleData()
  })

  </script>

  <style scoped>
  </style>
  `;

  return {
    fileName: `${fileName}.vue`,
    fileContent: fileContent
  };
};

const getVueModelFile = (fileName: string) => {

  const fileContent = `
  export class Test {}
  `;

  return {
    fileName: `${fileName}ViewModel.ts`,
    fileContent: fileContent
  };
};

const getInterfaceFile = (fileName: string) => {

  const fileContent = `
  export class Test {}
  `;

  return {
    fileName: `interface.ts`,
    fileContent: fileContent,
  };
};

const getIndexFile = (fileName: string) => {

  const fileContent = `
  export class Test {}
  `;

  return {
    fileName: `index.ts`,
    fileContent: fileContent,
  };
};

const templates = [
  getVueFile,
  getVueModelFile,
  getInterfaceFile,
  getIndexFile
];

export default templates;