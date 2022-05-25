module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
