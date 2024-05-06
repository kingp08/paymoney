import {View, Image, TouchableHighlight, Pressable} from 'react-native';
import React from 'react';
import {profileImageStyle} from './profileImage.style';
import {useTheme} from '@react-navigation/native';
import DefaultTheme from '../../../assets/svg/user-01.svg';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
const ProfileImage = ({
  imageURL,
  imageSize,
  borderColor,
  badgeIcon,
  badgeIconBg,
  badgeIconBgSize,
  onPress,
  svgBg,
  style,
  logo,
}) => {
  const {colors} = useTheme();
  const {
    imageCont,
    image,
    logoImage,
    badgeIcon: badgeIconS,
  } = profileImageStyle(
    colors,
    imageSize,
    borderColor,
    badgeIconBg,
    badgeIconBgSize,
    svgBg,
    logo,
  );
  const {t:trans} = useTranslation();
  return (
    <Pressable onPress={onPress}>
      <View style={[imageCont, style]}>
        {typeof imageURL !== 'object' ? (
          !imageURL && typeof imageURL !== 'object' ? (
            <View
              style={
                profileImageStyle(
                  colors,
                  imageSize,
                  borderColor,
                  badgeIconBg,
                  badgeIconBgSize,
                  svgBg,
                ).defaultSvg
              }>
              <DefaultTheme fill={colors.textQuaternaryVariant} />
            </View>
          ) : !logo ? (
            <Image
              style={image}
              source={
                typeof imageURL === 'string' && imageURL !== ''
                  ? {uri: imageURL && imageURL}
                  : imageURL
              }
              alt={trans('Profile Image')}
            />
          ) : (
            <Image
              style={logoImage}
              source={
                typeof imageURL === 'string' && imageURL !== ''
                  ? {uri: imageURL && imageURL}
                  : imageURL
              }
              alt={trans('Logo')}
            />
          )
        ) : (
          <View
            style={
              profileImageStyle(
                colors,
                imageSize,
                borderColor,
                badgeIconBg,
                badgeIconBgSize,
                svgBg,
              ).svg
            }>
            {imageURL}
          </View>
        )}
        {badgeIcon && (
          <TouchableHighlight onPress={onPress}>
            <View style={badgeIconS}>{badgeIcon}</View>
          </TouchableHighlight>
        )}
      </View>
    </Pressable>
  );
};

export default memo(ProfileImage);
