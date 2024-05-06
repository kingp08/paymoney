import React from 'react';
import { View } from 'react-native';
import {
  LongPressGestureHandler,
  TapGestureHandler
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';



const RippleButton = ({
  style,
  onTap,
  children,
}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent =
    useAnimatedGestureHandler({
      onStart: (tapEvent) => {
        const layout = measure(aRef);
        width.value = layout.width;
        height.value = layout.height;

        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 700 });
      },
      onActive: () => {
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: 'rgba(0,0,0,0.1)',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
        },
      ],
    };
  });
  const handleLongPress = (event) =>{
    event.nativeEvent.duration>400 && onTap() 
  }
  return (
    <View ref={aRef} style={style}>
      <LongPressGestureHandler
        onHandlerStateChange={handleLongPress}
        minDurationMs={800}>
          <Animated.View >
            <TapGestureHandler onActivated={onTap}  onGestureEvent={tapGestureEvent}  >
              <Animated.View style={[style, { overflow: 'hidden' }]}>
                <View>{children}</View>
                <Animated.View style={rStyle} />
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
      </LongPressGestureHandler>
    </View>
  );
};

export default RippleButton;