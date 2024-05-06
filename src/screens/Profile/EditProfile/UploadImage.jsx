import React from 'react';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ImageSvg from '../../../assets/svg/user-01.svg';
import Edit from '../../../assets/svg/edit-03.svg';
import DocumentPicker from 'react-native-document-picker';
import {postInfoUsingFormData} from '../../../features/auth/login/loginApi';
import {updateUserInfo} from '../../../features/auth/login/loginSlice';
import {updateUserSummerInfo} from '../../../features/slices/user/getProfile/getProfile';
import {rs} from '../../../utils/styles/responsiveSize';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
import config from '../../../../config';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {memo} from 'react';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
const UploadImage = ({
  data: {profileImage, setProfileImage, isConnected, userInfo, loginUserData},
}) => {
  const {colors} = useTheme();
  const {token} = loginUserData || {};
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const {preferenceData} = useSelector(state => state.systemPreference);
  const handleFileUpload = async () => {
    try {
     const granted=await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result)=>{
        return result;
      });
      if (granted !=RESULTS.DENIED) {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
          const supportedFormat= ['jpg', 'jpeg', 'png', 'gif', 'bmp']
          const isSupportedFormat=(supportedFormat.indexOf(res.type.split('/')[1]) > -1);
          if (res.size / 1000000 <= parseInt(preferenceData.file_size) && isConnected && isSupportedFormat) {
            setProfileImage(res.uri);
            const URL = `${config.BASE_URL_VERSION}/profile/upload-image`;
            const formData = new FormData();
            formData.append('image', res);
            const result = await postInfoUsingFormData(
              formData,
              URL,
              token,
              'POST',
            );
            if (result) {
              if (result?.response?.status?.code === 200) {
                const updateLoginInfo = {...loginUserData, picture: res?.uri};
                const updateSummaryInfo = {
                  ...userInfo,
                  picture: res?.uri,
                };
                dispatch(updateUserInfo(updateLoginInfo));
                dispatch(updateUserSummerInfo(updateSummaryInfo));
                handleToaster(
                  trans('Successfully uploaded Profile Picture'),
                  'success',
                  colors,
                );
              } else {
                setProfileImage(userInfo?.picture)
                handleToaster(
                  trans(result?.response?.status?.message),
                  'warning',
                  colors,
                );
              }
            }
          } else {
            (isConnected && isSupportedFormat) &&
              handleToaster(
                trans(`Profile image size must be less than or equal to ${parseInt(preferenceData.file_size)} MB`),
                'warning',
                colors,
              );
            (!isSupportedFormat && isConnected) && handleToaster(
              trans("Profile image allow extension 'jpg', 'jpeg', 'png', 'gif', 'bmp'."),
              'warning',
              colors,
            );
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          }
        }
      }else{
        handleToaster(
          trans('Please grant storage permission to access your storage and try again.'),
          'error',
          colors,
        );
      }
    } catch (err1) {}
  };
  return (
    <ProfileImage
      imageURL={
        profileImage ? (
          profileImage
        ) : (
          <ImageSvg
            height={rs(50)}
            width={rs(50)}
            fill={colors.bgTertiaryVariant}
          />
        )
      }
      badgeIconBgSize={rs(28)}
      defaultColor={colors.green}
      imageSize={rs(100)}
      onPress={() => handleFileUpload()}
      badgeIcon={<Edit height={rs(14)} fill={colors.white} />}
      badgeIconBg={colors.bgQuaternaryVariant}
      svgBg={colors.borderSeptenary}
    />
  );
};

export default memo(UploadImage);
