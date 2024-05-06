import {View, Text, ScrollView, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Edit from '../../../assets/svg/edit-03.svg';
import Trash from '../../../assets/svg/trash-03.svg';
import {useTheme} from '@react-navigation/native';
import {rs} from '../../../utils/styles/responsiveSize';
import WithdrawSettingsList from '../../components/components/WithdrawSettingsList/WithdrawSettingsList';
import {withdrawSettingsStyle} from './WithdrawSettings.style';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {ADD_WITHDRAW_SETTINGS} from '../../../navigation/routeName/routeName';
import {useDispatch, useSelector} from 'react-redux';
import {getAllWithdrawSettingsLists} from '../../../features/slices/WithdrawLists/getWithdrawSettingsLists';
import {useTranslation} from 'react-i18next';
import {getProfileSummary} from '../../../features/slices/user/getProfile/getProfile';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {deleteInfo} from '../../../features/auth/login/loginApi';
import {modalBottomSheetStyle} from '../../components/components/Modals/ModalBottomSheet/modalBottomSheet.style';
import ButtonOutline from '../../components/Buttons/ButtonOutline/ButtonOutline';
import config from '../../../../config';
import Loader from '../../../utils/Loader/Loader';
import { memo } from 'react';

const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;

const WithdrawSettings = ({navigation, route}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {withdrawSettingsList} = useSelector(
    state => state.getWithdrawSettingsLists,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const style = withdrawSettingsStyle(colors, modalVisible);
  useEffect(() => {
    dispatch(getProfileSummary({token}));
  }, [dispatch]);
  const {setSelectedMethod, setSelectedCurrency} = route?.params || {};

  let withdrawSettings = {};
  const Paypal = [],
    Bank = [],
    Crypto = [];
  const createWithdrawStyle = CreateWithdrawStyle(colors);
  const handleAdd = () => {
    navigation.navigate(ADD_WITHDRAW_SETTINGS, {
      setWithdrawMethod: setSelectedMethod,
      setWithdrawCurrency: setSelectedCurrency,
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getAllWithdrawSettingsLists({token, URL}));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  for (let i = 0; i < withdrawSettingsList.length; i++) {
    if (withdrawSettingsList[i].hasOwnProperty('email')) {
      Paypal.push(withdrawSettingsList[i]);
    } else if (withdrawSettingsList[i].hasOwnProperty('swift_code')) {
      Bank.push(withdrawSettingsList[i]);
    } else if (withdrawSettingsList[i].hasOwnProperty('crypto_address')) {
      Crypto.push(withdrawSettingsList[i]);
    }

    withdrawSettings = {
      Paypal: Paypal,
      Bank: Bank,
      Crypto: Crypto,
    };
  }

  const deleteOption = async id => {
    setDeleteLoader(true);
    const URL = `${config.BASE_URL_VERSION}/withdrawal-settings/${id}`;
    const res = await deleteInfo(URL, token);
    const {records, status} = res.response;
    handleDeleteMethod(records, status);
  };

  const handleDeleteMethod = async (records, status) => {
    if (Array.isArray(records)) {
      if (records.length === 0) {
        if (status.code === 200) {
          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const updatedSettingsList = await dispatch(
            getAllWithdrawSettingsLists({token, URL}),
          );
          handleToaster(trans(status.message), 'success', colors);
          setDeleteLoader(false);
          setModalVisible(false);
          if (setSelectedMethod) {
            updatedSettingsList.payload.response.records.length > 0
              ? setSelectedMethod(
                  updatedSettingsList.payload.response.records[0],
                )
              : (setSelectedMethod(null), setSelectedCurrency(null));
          }
        } else {
          handleToaster(trans(status.message), 'warning', colors);
          setDeleteLoader(false);
          setModalVisible(false);
        }
      }
    }
  };
  const bsExtraStyle = modalBottomSheetStyle(colors);
  return (
    <View style={style.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <WithdrawSettingsList
            withdrawSettingsData={withdrawSettings}
            containerHorizontalGap={rs(50)}
            bgColor={colors.bgQuaternary}
            titleColor={colors.textTertiaryVariant}
            actionIcon={<Edit fill={colors.textQuinary} />}
            deleteIcon={<Trash fill={colors.textQuinary} />}
            setModalVisible={setModalVisible}
            setDeleteItemId={setDeleteItemId}
            setWithdrawMethod={setSelectedMethod}
            setWithdrawCurrency={setSelectedCurrency}></WithdrawSettingsList>
        </View>
      </ScrollView>
      <View style={style.centeredView}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={bsExtraStyle.deleteConfirmationText}>
                {trans('Are you sure you want to delete?')}
              </Text>
              <View>
                <View style={bsExtraStyle.btnCont}>
                  <ButtonOutline
                    style={bsExtraStyle.btnCancel}
                    title={trans('Cancel')}
                    onPress={() => {
                      !deleteLoader && setModalVisible(false);
                    }}
                  />
                  <ButtonOutline
                    style={bsExtraStyle.btnDelete}
                    title={!deleteLoader && trans('Delete')}
                    icon={
                      deleteLoader && (
                        <View>
                          <Loader
                              source={require('../../../assets/lottie/loader.json')}
                              size={{width: rs(65), height: rs(55)}}
                              color={colors.white}
                            />
                        </View>
                      )
                    }
                    onPress={() => deleteLoader ? null : deleteOption(deleteItemId)}
                    bgColor={colors.sunshade}
                    borderColor={colors.sunshade}
                    color={colors.gunPowder}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          ...createWithdrawStyle.setUpBtnContainer,
          ...style.addoptionBtnContainer,
        }}>
        <CustomButton
          onPress={handleAdd}
          style={style.addOptionBtnStyle}
          title={trans('Add Option')}
          bgColor={colors.cornflowerBlue}
          color={colors.white}
        />
      </View>
    </View>
  );
};

export default memo(WithdrawSettings);
