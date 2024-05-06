import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {paginationStyle} from './pagination.style';
const Pagination = ({data, x, size}) => {
  const {colors} = useTheme();
  const styles = paginationStyle(colors);
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const widthAnimation = interpolate(
            x.value,
            [(i - 1) * size, i * size, (i + 1) * size],
            [7, 16, 7],
            Extrapolate.CLAMP,
          );
          const opacityAnimation = interpolate(
            x.value,
            [(i - 1) * size, i * size, (i + 1) * size],
            [1, 1, 1],
            Extrapolate.CLAMP,
          );
          const backgroundColorAnimation = interpolateColor(
            x.value,
            [(i - 1) * size, i * size, (i + 1) * size],
            [colors.white, colors.sunshade, colors.white],
          );

          return {
            width: widthAnimation,
            opacity: opacityAnimation,
            backgroundColor: backgroundColorAnimation,
          };
        });
        return <Animated.View style={[styles.dot, animatedDotStyle]} key={i} />;
      })}
    </View>
  );
};

export default Pagination;
