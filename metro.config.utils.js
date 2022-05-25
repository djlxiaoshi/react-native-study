const path = require('path');
const pathSep = path.sep;

function getModuleIdByPath(projectRootPath, modulePath) {
  let name = '';
  if (modulePath.startsWith(projectRootPath)) {
    name = modulePath.substr(projectRootPath.length + 1);
  }

  let regExp =
    pathSep === '\\' ? new RegExp('\\\\', 'gm') : new RegExp(pathSep, 'gm');
  let moduleId = name.replace(regExp, '/');

  return moduleId;
}

module.exports = {
  getModuleIdByPath,
};
