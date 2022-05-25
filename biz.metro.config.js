/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const {getModuleIdByPath} = require('./metro.config.utils');
const moduleIdsList = require('./multibundler/index_ios_module_id.json');

const moduleIds = new Set();
const excludeAssetsExt = ['.png', '.jpg', '.jpeg'];

function init() {
  if (moduleIds == null || moduleIds.length === 0) {
    console.log('请先打基础包');
    process.exit(1);
  }
}

init();

function createModuleIdFactory() {
  return modulePath => {
    return getModuleIdByPath(__dirname, modulePath);
  };
}

// 返回false的模块 不会打入
function processModuleFilter(module) {
  const moduleId = getModuleIdByPath(__dirname, module.path);

  const extname = path.extname(moduleId);
  // 如果是图片资源则不过滤
  if (excludeAssetsExt.includes(extname)) {
    return true;
  }

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
