import React, {useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
  BottomSheetHandle,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import {bottomSheetStyles} from './bottomSheet.style';
import {Pressable} from 'react-native';

export const CustomBottomSheet = ({
  style = {},
  bottomSheetRef,
  snapPoint,
  bgColor,
  indicatorColor,
  children,
  contentHeight = true,
  header,
  footer,
  scroll=true
}) => {
  const initialSnapPoints = useMemo(
    () => ['CONTENT_HEIGHT', ...snapPoint],
    [snapPoint],
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const {colors} = useTheme();

  const bottomSheetStyle = bottomSheetStyles(colors, indicatorColor, bgColor);

  const renderBackdrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.2}
      />
    );
  }, []);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 700,
  });
  const renderBottomSheetHandle = () => {
    return (
      <Pressable onPress={() => bottomSheetRef?.current?.close()}>
        <BottomSheetHandle
          indicatorStyle={bottomSheetStyle.bottomSheetIndicator}
        />
      </Pressable>
    );
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animationConfigs={animationConfigs}
      handleComponent={renderBottomSheetHandle}
      backgroundStyle={bottomSheetStyle.backgroundStyle}
      snapPoints={contentHeight ? animatedSnapPoints : snapPoint}
      handleHeight={animatedHandleHeight}
      contentHeight={contentHeight && animatedContentHeight}>
      {header}
      <BottomSheetScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={scroll}
        contentContainerStyle={
          !header ? [bottomSheetStyle.contentContainer, style] : style
        }
        scrollEnabled={true}
        onLayout={handleContentLayout}>
        {children}
      </BottomSheetScrollView>
      {footer}
    </BottomSheet>
  );
};

export default CustomBottomSheet;
