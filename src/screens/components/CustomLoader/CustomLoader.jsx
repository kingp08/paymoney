import React from 'react';
import {View} from 'react-native';
import {customLoaderStyle} from './customLoader.style';
import {useTheme} from '@react-navigation/native';
import Loader from '../../../utils/Loader/Loader';
import { rs } from '../../../utils/styles/responsiveSize';

const CustomLoader = () => {
  const {colors} = useTheme();
  const styles = customLoaderStyle(colors);
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Loader
          source={require('../../../assets/lottie/loader.json')}
          size={{width: rs(65), height: rs(55)}}
          color={colors.textTertiaryVariant}
        />
      </View>
      <View style={styles.backgroundLoader}></View>
    </View>
  );
};

export default CustomLoader;
