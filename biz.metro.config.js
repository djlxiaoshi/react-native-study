/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getModuleIdByPath} = require('./metro.config.utils');
const moduleIdsList = require('./dist/common/index_ios_module_id.json');

const moduleIds = new Set();

function init() {
  if (moduleIds == null || moduleIds.length === 0) {
    console.log('请先打基础包');
    process.exit(1);
  }
}

init();

function createModuleIdFactory() {
  return path => {
    return getModuleIdByPath(__dirname, path);
  };
}

// 返回false的模块 不会打入
function processModuleFilter(module) {
  const moduleId = getModuleIdByPath(__dirname, module.path);
  if (moduleIdsList.indexOf(moduleId) >= 0) {
    return false;
  }

  return true;
}

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    createModuleIdFactory,
    processModuleFilter,
  },
};
