/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const fs = require('fs');
const {getModuleIdByPath} = require('./metro.config.utils');

const platform = process.env.PLATFORM;
const MODULE_ID_FILE = `./dist/common/index_${platform}_module_id.json`;
const FILTER_MODULE_ID_FILE = `./dist/common/index_${platform}_filter_module_id.json`;

const moduleIds = new Set();
const filterModuleIds = new Set();

function updateModuleIdFile(moduleId, filePath = MODULE_ID_FILE) {
  if (!moduleIds.has(moduleId)) {
    moduleIds.add(moduleId);
    const moduleIdsString = JSON.stringify(Array.from(moduleIds), 4);
    fs.writeFileSync(filePath, moduleIdsString);
  }
}

function createModuleIdFactory() {
  return path => {
    const moduleId = getModuleIdByPath(__dirname, path);
    updateModuleIdFile(moduleId, MODULE_ID_FILE);
    return moduleId;
  };
}

function processModuleFilter(module) {
  const moduleId = getModuleIdByPath(__dirname, module.path);
  if (!filterModuleIds.has(moduleId)) {
    filterModuleIds.add(moduleId);
    const moduleIdsString = JSON.stringify(Array.from(filterModuleIds), 4);
    fs.writeFileSync(FILTER_MODULE_ID_FILE, moduleIdsString);
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
