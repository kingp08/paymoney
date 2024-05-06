import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import {Fragment} from 'react';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import {selectExCurrencyBottomSheetStyle} from './selectExCurrencyBottomSheet.style';
import { bottomSheetStyle } from '../../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';

const SelectExCurrencyBottomSheet = ({
  bottomSheetRef,
  data,
  handleSetInfo,selectedItem,
  label,
}) => {
  const {colors} = useTheme();
  const style = selectExCurrencyBottomSheetStyle(colors);
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>{label}</Text>
      <ScrollView>
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <Fragment key={index}>
                {index !== 0 && <View style={style.textBottomBorder}></View>}
                <TouchableOpacity
                  key={item?.id}
                  style={style.textContainer}
                  onPress={() => {
                    handleSetInfo(item);
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={bottomSheetStyle(colors, item?.code, selectedItem?.code).textStyle}>{item?.code}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default memo(SelectExCurrencyBottomSheet);
