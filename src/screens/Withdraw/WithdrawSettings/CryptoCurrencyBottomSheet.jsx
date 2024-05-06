import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {selectCurrencyBottomSheetStyle} from '../../RequestMoney/Create/CreateRequest/SelectCurrencyBottomSheet/selectCurrencyBottomSheet.style';
import {useTheme} from '@react-navigation/native';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import { bottomSheetStyle } from '../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';
import { memo } from 'react';

const CryptoCurrencyBottomSheet = ({
  data,
  bottomSheetRef,
  setSelectedItem,
  selectedItem,
  error,
  setError,
  handleSetInfo,
}) => {
  const {colors} = useTheme();
  const style = selectCurrencyBottomSheetStyle(colors);
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={['42%']}>
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
                    setSelectedItem(item);
                    handleSetInfo &&
                      handleSetInfo(
                        item,
                        setSelectedItem,
                        selectedItem,
                        setError,
                        error,
                      );
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

export default memo(CryptoCurrencyBottomSheet);
