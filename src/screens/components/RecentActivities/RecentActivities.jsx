import {View, Text} from 'react-native';
import React, {memo, useRef} from 'react';
import {recentActivitiesStyle} from './recentActivities.style';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import RippleButton from '../../utilities/RippleButton/RippleButton';
const RecentActivities = ({
  setNewData,
  setIndividualRef,
  item,
  image = false,
  name = false,
  actionType,
  time = false,
  fee = false,
  amount = false,
  status = false,
  statusColor = false,
  borderColor = false,
  bg = false,
  feeColor = false,
  style,
  index
}) => {
  const {colors} = useTheme();
  let individualRef = useRef(null);
  const handleItem = () => {
    setNewData(item);
    individualRef.current?.snapToIndex(0);
    setIndividualRef(individualRef);
  };
  const {
    container,
    imageCont,
    leftCont,
    actionTypeS,
    actionCont,
    nameTextS,
    feeCont,
    statusText,
    amountText,
    feeText,
    flex,
    card,
  } = recentActivitiesStyle(colors, bg, statusColor, borderColor, feeColor,index);
  const {t:trans} = useTranslation();
  return (
    <View style={container}>
      <RippleButton onTap={()=>handleItem()}
        style={[card, style]}>
        <View style={[flex]}>
          <View style={leftCont}>
            {image && <View style={imageCont}>{image}</View>}
            <View style={actionCont}>
              <Text style={nameTextS}>{name}</Text>
              <Text style={actionTypeS}>{actionType}</Text>
              <Text style={nameTextS}>{time}</Text>
            </View>
          </View>
          <View style={feeCont}>
            <Text style={feeText}>
              {fee !== false && fee !== 0 && `${trans('Fee')} ${fee}`}
            </Text>
            <Text style={amountText}>{amount}</Text>
            <Text style={statusText}>{status}</Text>
          </View>
        </View>
      </RippleButton>
    </View>
  );
};

export default memo(RecentActivities);
