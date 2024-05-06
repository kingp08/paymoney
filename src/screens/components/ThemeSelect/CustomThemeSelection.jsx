import {View, TouchableWithoutFeedback} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import {customThemeSelection} from './customThemeSelection.style';
import {rs} from '../../../utils/styles/responsiveSize';
import CheckedIcon from '../../../assets/svg/checkedFill.svg';
import {useState} from 'react';
import CustomRectangle from './CustomRactangle/CustomRectangle';
const CustomThemeSelection = ({theme, onPress, isChecked, fixedWidth}) => {
  const {colors} = useTheme();
  const styles = customThemeSelection(colors, theme, fixedWidth, isChecked);
  const [dimensions, setDimensions] = useState(0);
  return (
    <TouchableWithoutFeedback onPress={() => onPress(theme)}>
      <View
        style={styles.container}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setDimensions(width - rs(70));
        }}>
        <View style={styles.checkboxSize}>
          <View style={styles.selectionBorder}>
            {isChecked && <CheckedIcon fill={colors.cornflowerBlue} />}
          </View>
        </View>
        <View style={styles.themeContainer}>
          <View style={styles.mb_5}>
            <CustomRectangle
              width={dimensions / 1.8}
              height={12}
              bgColor={colors.cornflowerBlue}
              radius={4}
            />
          </View>
          <View style={styles.mb_6}>
            <CustomRectangle
              width={dimensions / 3 - rs(3)}
              height={6}
              bgColor={colors.sunshade}
              radius={3}
            />
          </View>
          <View style={styles.middleCont}>
            <CustomRectangle
              width={dimensions / 3 - rs(3)}
              height={17}
              bgColor={theme == 'light' ? colors.snuff : colors.gunPowder}
              radius={3}
            />
            <CustomRectangle
              width={dimensions / 3 - rs(3)}
              height={17}
              bgColor={theme == 'light' ? colors.snuff : colors.gunPowder}
              radius={3}
            />
            <CustomRectangle
              width={dimensions / 3 - rs(3)}
              height={17}
              bgColor={theme == 'light' ? colors.snuff : colors.gunPowder}
              radius={3}
            />
          </View>
          <View style={styles.mb_4}>
            <CustomRectangle
              width={dimensions}
              height={3}
              bgColor={theme == 'light' ? colors.mischka : colors.stormGray}
              radius={4}
            />
          </View>
          <CustomRectangle
            width={dimensions}
            height={3}
            bgColor={theme == 'light' ? colors.mischka : colors.stormGray}
            radius={4}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CustomThemeSelection);
