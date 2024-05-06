import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import {useTheme} from '@react-navigation/native';
import {selectCurrencyBottomSheetStyle} from './selectCurrencyBottomSheet.style';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import { bottomSheetStyle } from '../../../../Deposit/CreateDeposit/DepositBottomSheet/bottomSheet.style';

const SelectCurrencyBottomSheet = ({
  bottomSheetRef,
  setSelectedItem,
  selectedItem,
  data = [],
  label,
}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const style = selectCurrencyBottomSheetStyle(colors);
  const latestData = data.filter(item=>item?.currency?.type === 'fiat');
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>{label}</Text>
      <ScrollView>
        {latestData?.length === 0 ? (
          <Text style={style.textStyle}>{trans('Loading')} ...</Text>
        ) : (
          latestData?.map((item, index) => {
            return (
              <View key={index}>
                {index !== 0 && <View style={style.textBottomBorder}></View>}
                <Pressable
                  key={item?.id}
                  style={style.textContainer}
                  onPress={() => {
                    setSelectedItem(item?.currency);
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={bottomSheetStyle(colors, item?.currency?.code, selectedItem?.code).textStyle}>{item?.currency?.code}</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default memo(SelectCurrencyBottomSheet);
