import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Fragment} from 'react';
import {selectCurrencyBottomSheetStyle} from './selectCurrencyBottomSheet.style';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import { bottomSheetStyle } from '../../../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';

const SelectCurrencyBottomSheet = ({bottomSheetRef, data, handleSetInfo, selectedItem}) => {
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
                  key={item?.id}
                  style={style.textContainer}
                  onPress={() => {
                    handleSetInfo(item);
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={bottomSheetStyle(colors, item?.code, selectedItem?.currency?.code).textStyle}>{item?.code}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default SelectCurrencyBottomSheet;
