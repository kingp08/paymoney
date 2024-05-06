import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {Fragment} from 'react';
import {useTheme} from '@react-navigation/native';
import {selectCurrencyBottomSheetStyle} from '../../RequestMoney/Create/CreateRequest/SelectCurrencyBottomSheet/selectCurrencyBottomSheet.style';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';

const SendMoneyCurrencyBottomSheet = ({
  bottomSheetRef,
  setSelectedItem,
  data,
  selectedItem,
  setError,
  error,
  handleSetInfo = false,
  name,
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
        {data?.value?.length > 1 &&
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
                        name,
                        item,
                        setSelectedItem,
                        selectedItem,
                        setError,
                        error,
                      );
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={style.textStyle}>{item?.code}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default SendMoneyCurrencyBottomSheet;
