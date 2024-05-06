import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import {selectCurrencyBottomSheetStyle} from '../../RequestMoney/Create/CreateRequest/SelectCurrencyBottomSheet/selectCurrencyBottomSheet.style';
import {useTheme} from '@react-navigation/native';
import { bottomSheetStyle } from '../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';
import { memo } from 'react';

const AddWithdrawMethodBottomSheet = ({
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
                  <Text style={bottomSheetStyle(colors, item?.name, selectedItem?.name).textStyle}>{item?.name}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default memo(AddWithdrawMethodBottomSheet);
