const pathSep = require('path').sep;

function getModuleIdByPath(projectRootPath, path) {
  let name = '';
  if (path.startsWith(projectRootPath)) {
    name = path.substr(projectRootPath.length + 1);
  }
  let regExp =
    pathSep === '\\' ? new RegExp('\\\\', 'gm') : new RegExp(pathSep, 'gm');
  let moduleId = name.replace(regExp, '/');

  return moduleId;
}

module.exports = {
  getModuleIdByPath,
};
