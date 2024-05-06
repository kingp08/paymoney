import {Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');

export const rs = size => {
  if (height > 800) {
    const x = size / 860;
    return x * height;
  } else if (height <= 800 && height > 750) {
    const x = size / 810;
    return x * height;
  } else if (height <= 750 && height > 700) {
    const x = size / 760;
    return x * height;
  } else if (height <= 700 && height > 650) {
    const x = size / 710;
    return x * height;
  } else if (height <= 650 && height > 600) {
    const x = size / 660;
    return x * height;
  } else if (height <= 600 && height > 550) {
    const x = size / 610;
    return x * height;
  } else if (height <= 550 && height > 500) {
    const x = size / 560;
    return x * height;
  } else {
    const x = size / 510;
    return x * height;
  }
};
