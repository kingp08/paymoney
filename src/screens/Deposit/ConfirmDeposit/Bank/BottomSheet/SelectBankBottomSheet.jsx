import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Fragment} from 'react';
import {bottomSheetStyle} from '../../../CreateDeposit/DepositBottomSheet/bottomSheet.style';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import {useTranslation} from 'react-i18next';

const SelectBankBottomSheet = ({
  bottomSheetRef,
  setSelectedItem,
  selectedItem,
  data,
}) => {
  const {colors} = useTheme();
  const styles = bottomSheetStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <CustomBottomSheet
      style={styles.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={['42%']}>
      <Text style={styles.title}>{trans('Select Bank')}</Text>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <View style={styles.textBottomBorder}></View>}
              <TouchableOpacity
                key={item}
                style={styles.textContainer}
                onPress={() => {
                  setSelectedItem({
                    ...selectedItem,
                    bankName: item?.bank_name,
                    bankId: item?.id,
                    accountName: item?.account_name,
                    accountNumber: item?.account_number
                  });
                  bottomSheetRef.current.close();
                }}>
                <Text style={bottomSheetStyle(colors, item?.bank_name, selectedItem?.bankName).textStyle}>{item?.bank_name}</Text>
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default SelectBankBottomSheet;
