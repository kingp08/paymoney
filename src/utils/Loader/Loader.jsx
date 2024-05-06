import React, {useEffect, useRef} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';

const Loader = ({
  source,
  size,
  color='#000000',
  onAnimationFinish,
  autoplay = true,
  loop = true,
  speed = 1.5,
  keypath='loader'
}) => {
  const animationProgress = useRef(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [])
  return (
    <AnimatedLottieView
      source={source}
      autoPlay={autoplay}
      loop={loop}
      style={size}
      speed={speed}
      colorFilters={[{keypath: keypath, color: color}]}
      onAnimationFinish={onAnimationFinish}
      progress={animationProgress.current}
    />
  );
};

export default Loader;
