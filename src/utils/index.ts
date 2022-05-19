import {Dimensions} from 'react-native';

export function px2dp(elePX: number, uiPxWidth = 375) {
  const deviceWidth = Dimensions.get('window').width;

  return (deviceWidth * elePX) / uiPxWidth;
}
