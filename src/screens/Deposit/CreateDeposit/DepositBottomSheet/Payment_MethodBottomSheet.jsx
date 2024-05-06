import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {bottomSheetStyle} from './bottomSheet.style';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import {Fragment} from 'react';
import {handleSetInfo} from '../../../utilities/handleFromData/handleFromData';

const Payment_MethodBottomSheet = ({
  bottomSheetRef,
  setSelectedItem,
  data,
  selectedItem,
  setError,
  error,
  name,
}) => {
  const {colors} = useTheme();
  const style = bottomSheetStyle(colors);
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
                        name,
                        item,
                        setSelectedItem,
                        selectedItem,
                        setError,
                        error,
                      );
                    bottomSheetRef.current.close();
                  }}>
                  <Text style={bottomSheetStyle(colors, item?.name, selectedItem[name]?.name).textStyle}>{item?.name}</Text>
                </TouchableOpacity>
              </Fragment>
            );
          })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default Payment_MethodBottomSheet;
