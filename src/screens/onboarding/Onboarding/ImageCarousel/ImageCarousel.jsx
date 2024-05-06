import {View, useWindowDimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from 'react-native-reanimated';
import {onBoardingElements} from './onBoardingElements';
import OnboardingDisplay from './OnboardingDisplay';

import Pagination from './Pagination/Pagination';
import {onboardingStyle} from '../onboarding.style';
import {useTheme} from '@react-navigation/native';

const ImageCarousel = () => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [newData] = useState([
    {key: 'spacer-left'},
    ...onBoardingElements,
    {key: 'spacer-right'},
  ]);
  const {width} = useWindowDimensions();
  const SIZE = width;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);
  const {colors} = useTheme();
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (
          _offSet >= Math.floor(SIZE * (onBoardingElements.length - 1) - 10)
        ) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current.scrollTo({x: _offSet, y: 0});
      }, 4000);
    } else {
      clearInterval(interval.current);
    }
  }, [
    SIZE,
    SPACER,
    isAutoPlay,
    onBoardingElements.length,
    offSet.value,
    scrollViewRef,
  ]);
  return (
    <>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        overScrollMode="never"
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={e => {
          offSet.value = e.nativeEvent.contentOffset.x;
          setIsAutoPlay(true);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8],
            );
            return {
              transform: [{scale}],
            };
          });
          if (!item.Image) {
            return (
              <View
                style={onboardingStyle(colors, SPACER).dynamicWidth}
                key={index}
              />
            );
          }
          return (
            <View
              style={onboardingStyle(colors, SIZE).dynamicWidth}
              key={index}>
              <Animated.View>
                <OnboardingDisplay item={item} />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      <Pagination data={onBoardingElements} x={x} size={SIZE} />
    </>
  );
};

export default ImageCarousel;
