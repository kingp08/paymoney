import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {Fragment, memo} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import {useTheme} from '@react-navigation/native';
import {selectCurrencyBottomSheetStyle} from '../../RequestMoney/Create/CreateRequest/SelectCurrencyBottomSheet/selectCurrencyBottomSheet.style';
import { useSelector } from 'react-redux';
import { bottomSheetStyle } from '../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';

const WithdrawPaymentBottomSheet = ({
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
  const {payment_method_withdraw} = useSelector(
    state => state.getAddWithdrawalMethods,
  );
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
                  style={{
                    ...style.textContainer,
                    ...style.btmsheetHorizontalPadding,
                  }}
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
                  {item?.payment_method?.toString() === payment_method_withdraw?.Paypal?.toString() ? (
                    <Text
                      style={bottomSheetStyle(colors, item?.email, selectedItem?.email).textStyle}>{`Paypal (${item?.email})`}</Text>
                  ) : item?.payment_method?.toString() === payment_method_withdraw?.Bank?.toString() ? (
                    <Text
                      style={
                        bottomSheetStyle(colors, item?.account_name, selectedItem?.account_name).textStyle
                      }>{`Bank (${item?.account_name})`}</Text>
                  ) : (
                    <Text
                      style={
                        bottomSheetStyle(colors, item?.crypto_address, selectedItem?.crypto_address).textStyle
                      }>{`Crypto ${item?.currency?.code} - ${item?.crypto_address}`}</Text>
                  )}
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default memo(WithdrawPaymentBottomSheet);
