import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {bottomSheetStyle} from '../../../../CreateDeposit/DepositBottomSheet/bottomSheet.style';
import CustomBottomSheet from '../../../../../components/CustomBottomSheet/CustomBottomSheet';
import {Fragment} from 'react';
import {handleSetInfo} from '../../../../../utilities/handleFromData/handleFromData';
import {selectCurrencyBottomSheetStyle} from '../../../../../Profile/EditProfile/BottomSheet/SelectCurrency/selectCurrencyBottomSheet.style';
import {useTranslation} from 'react-i18next';

const MonthBottomSheet = ({
  bottomSheetRef,
  setSelectedItem,
  selectedItem,
  setError,
  error,
  name,
}) => {
  const data = {
    title: 'Select Month',
    months: [
      {month: 'January', value: 1},
      {month: 'February', value: 2},
      {month: 'March', value: 3},
      {month: 'April', value: 4},
      {month: 'May', value: 5},
      {month: 'June', value: 6},
      {month: 'July', value: 7},
      {month: 'August', value: 8},
      {month: 'September', value: 9},
      {month: 'October', value: 10},
      {month: 'November', value: 11},
      {month: 'December', value: 12},
    ],
  };
  const {colors} = useTheme();
  const style = selectCurrencyBottomSheetStyle(colors);
  const styles = bottomSheetStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <CustomBottomSheet
      style={styles.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={['90%']}
      contentHeight={false}
      header={
        <View style={styles.titleContainer}>
          <Text style={[style.title]}>{trans(data?.title)}</Text>
        </View>
      }>
      <View>
        {data?.months.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <View style={styles.textBottomBorder}></View>}
              <TouchableOpacity
                key={item.value}
                style={styles.textContainer}
                onPress={() => {
                  setSelectedItem(item);
                  handleSetInfo(
                    name,
                    item,
                    setSelectedItem,
                    selectedItem,
                    setError,
                    error,
                  );
                  bottomSheetRef.current.close();
                }}>
                <Text style={bottomSheetStyle(colors,item.month, selectedItem.month?.month).textStyle}>{item.month}</Text>
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </View>
    </CustomBottomSheet>
  );
};

export default MonthBottomSheet;
