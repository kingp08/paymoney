import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, { memo } from 'react';
import {useTheme} from '@react-navigation/native';
import {Fragment} from 'react';
import { selectCurrencyBottomSheetStyle } from '../../../RequestMoney/Create/CreateRequest/SelectCurrencyBottomSheet/selectCurrencyBottomSheet.style';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';

const PriorityBottomSheet = ({bottomSheetRef, data, handleSetInfo, selected}) => {
  const {colors} = useTheme();
  const style = selectCurrencyBottomSheetStyle(colors);
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>{data?.title}</Text>
      <ScrollView>
        {data?.value?.length > 0 &&
          data?.value.map((item, index) => {
            return (
              <Fragment key={index}>
                {index !== 0 && <View style={style.textBottomBorder}></View>}
                <TouchableOpacity
                  style={style.textContainer}
                  onPress={() => {
                    handleSetInfo(item.name, 'priority');
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={{...style.textStyle, color:item?.name === selected ?colors.textTertiaryVariant : colors.textQuinary}}>{item?.name}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default memo(PriorityBottomSheet);
