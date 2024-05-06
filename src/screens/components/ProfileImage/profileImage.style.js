import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const profileImageStyle = (
  colors,
  imageSize,
  borderColor,
  badgeIconBg,
  badgeIconBgSize,
  svgBg,
  logo,
) =>
  StyleSheet.create({
    imageCont: {
      borderWidth: borderColor && 1,
      borderColor: borderColor || colors.textQuinaryVariant,
      borderRadius:
        imageSize && borderColor
          ? (imageSize + rs(6)) / 2
          : imageSize
          ? imageSize / 2
          : rs(76) / 2,
      width:
        imageSize && borderColor
          ? imageSize + rs(6)
          : imageSize
          ? imageSize
          : rs(76),
      height:
        imageSize && borderColor
          ? imageSize + rs(6)
          : imageSize
          ? imageSize
          : rs(76),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: logo && colors.white,
    },
    image: {
      width: imageSize || rs(70),
      height: imageSize || rs(70),
      borderRadius: imageSize / 2 || rs(70) / 2,
      resizeMode: 'cover',
    },
    logoImage: {
      width: rs(40),
      height: rs(10),
      resizeMode: 'cover',
    },
    svg: {
      width: imageSize || rs(70),
      height: imageSize || rs(70),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: imageSize / 2 || rs(70) / 2,
      backgroundColor: svgBg || colors.borderSeptenary,
    },
    defaultSvg: {
      width: imageSize || rs(70),
      height: imageSize || rs(70),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: imageSize / 2 || rs(70) / 2,
      backgroundColor: colors.borderSeptenary,
    },
    badgeIcon: {
      position: 'absolute',
      left: rs(15),
      bottom: 0,
      width: badgeIconBgSize || rs(21),
      height: badgeIconBgSize || rs(21),
      backgroundColor: badgeIconBg || colors.cornFlowerBlue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: badgeIconBgSize / 2 || rs(21) / 2,
    },
    p_8: {
      padding: 8,
    },
  });
