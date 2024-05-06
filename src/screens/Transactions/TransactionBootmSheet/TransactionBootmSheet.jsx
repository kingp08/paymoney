import {View, Text} from 'react-native';
import React, {memo, useContext, useState} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import ButtonOutline from '../../components/Buttons/ButtonOutline/ButtonOutline';
import {useNavigation, useTheme} from '@react-navigation/native';
import BottomInfo from '../../components/BottomInfo/BottomInfo';
import {
  generateStatus,
  sheetNameGenerate,
  transaction_amount_type_name,
  transaction_type_generate,
  transaction_type_name,
} from '../TransactionsFunctionality/transactionFunctionality';
import moment from 'moment';
import {transactionBottomSheetStyle} from './transactionBottomSheet.style';
import {REVIEW_REQUEST} from '../../../navigation/routeName/routeName';
import {dynamicStatusColor} from '../../utilities/dynamicStatusColor/dynamicStatusColor';
import {getInfo, postInfo} from '../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {changeTransactionStatus} from '../../../features/slices/transactions/transactions';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import {rs} from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
const TransactionBottomSheet = ({bottomSheetRef, data, setNewData}) => {
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const styles = transactionBottomSheetStyle(colors);
  const navigation = useNavigation();
  const [denyLoading, setDenyLoading] = useState(false);
  const {user: {token} = {}} = useSelector(state => state.loginUserReducer);
  const {user} = useSelector(state => state.loginUserReducer);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const dispatch = useDispatch();
  const {t: trans} = useTranslation();
  const {
    id,
    transaction_created_at,
    transaction_type,
    display_totalFess,
    note,
    status,
    uuid,
    email,
    phone,
    display_total,
    transaction_reference_id,
    user_email,
    end_user_email,
    user_phone,
    end_user_phone,
    display_subtotal,
  } = data || {};
  const handleDeny = async () => {
    setDenyLoading(true);
    const obj = {tr_id: id};
    const URL = `${config.BASE_URL_VERSION}/request-money/cancel-by-receiver`;
    const res = await postInfo(obj, URL, token, 'POST');
    if (res) {
      setDenyLoading(false);
      const {code, message} = res?.response?.status;
      if (code === 200) {
        dispatch(changeTransactionStatus(data));
        setNewData({});
        bottomSheetRef?.current?.close();
      } else {
        setNewData({});
        bottomSheetRef?.current?.close();
        showToaster(code, message);
      }
    }
  };
  const handleCancelRequest = async () => {
    setDenyLoading(true);
    const obj = {tr_id: id};
    const URL = `${config.BASE_URL_VERSION}/request-money/cancel-by-creator`;
    const res = await postInfo(obj, URL, token, 'POST');
    if (res) {
      setDenyLoading(false);
      const {code, message} = res?.response?.status;
      if (code === 200) {
        dispatch(changeTransactionStatus(data));
        setNewData({});
        bottomSheetRef?.current?.close();
      } else {
        showToaster(code, message);
        setNewData({});
        bottomSheetRef?.current?.close();
      }
    }
  };
  const handleAcceptRequest = async () => {
    setAcceptLoading(true);
    if (transaction_reference_id) {
      const URL = `${config.BASE_URL_VERSION}/accept-money/details?tr_ref_id=${transaction_reference_id}`;
      const res = await getInfo(token, URL);
      if (res) {
        const {code, message} = res?.response?.status;
        if (res?.response?.status?.code === 200) {
          navigation.navigate(REVIEW_REQUEST, {
            data: res?.response?.records,
            id: transaction_reference_id,
          });
          setNewData({});
          bottomSheetRef?.current?.close();
          setAcceptLoading(false);
        } else {
          showToaster(code, message);
          setNewData({});
          bottomSheetRef?.current?.close();
          setAcceptLoading(false);
        }
      }
    }
  };
  const showToaster = (code, message) => {
    code === 403
      ? handleToaster(
          trans('You are not permitted for this transaction!'),
          'warning',
          colors,
        )
      : code === 400
      ? handleToaster(
          trans('Your account has been suspended!'),
          'warning',
          colors,
        )
      : handleToaster(trans(message), 'warning', colors);
  };
  const contentHeader = (
    <>
      <Text style={styles.bottomHeaderText}>{trans('Details')}</Text>
      <Text style={styles.bottomMainHeader}>
        {transaction_type_generate(data, trans)}
      </Text>
      <Text style={styles.bottomMoneyText}>{display_subtotal}</Text>
    </>
  );
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoint={['80%']}
      contentHeight={false}
      scroll={false}
      header={
        ((transaction_type === 'Request_Received' && status === 'Pending') ||
          (transaction_type === 'Request_Sent' && status === 'Pending')) &&
        contentHeader
      }
      footer={
        <>
          {transaction_type === 'Request_Received' && status === 'Pending' && (
            <View style={{...styles.btnCont, paddingVertical: rs(20)}}>
              <ButtonOutline
                style={styles.btnCancel}
                title={!denyLoading && trans('Deny')}
                icon={
                  denyLoading && (
                    <View>
                      <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={{width: rs(65), height: rs(55)}}
                        color={colors.textSenaryVariant}
                      />
                    </View>
                  )
                }
                onPress={!denyLoading && isConnected ? handleDeny : null}
              />
              <ButtonOutline
                style={styles.btnDelete}
                title={!acceptLoading ? trans('Accept') : ''}
                onPress={
                  !acceptLoading && isConnected ? handleAcceptRequest : null
                }
                icon={
                  acceptLoading && (
                    <View>
                      <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={{width: rs(65), height: rs(55)}}
                        color={colors.white}
                      />
                    </View>
                  )
                }
                bgColor={colors.btnOctonary}
                borderColor={colors.btnOctonary}
                color={colors.btnSenary}
              />
            </View>
          )}
          {transaction_type === 'Request_Sent' && status === 'Pending' && (
            <ButtonOutline
              style={{...styles.btnOutline, paddingVertical: rs(20)}}
              title={!denyLoading && trans('Cancel Request')}
              icon={
                denyLoading && (
                  <View>
                    <Loader
                      source={require('../../../assets/lottie/loader.json')}
                      size={{width: rs(65), height: rs(55)}}
                      color={colors.textSenaryVariant}
                    />
                  </View>
                )
              }
              onPress={!denyLoading && isConnected ? handleCancelRequest : null}
            />
          )}
        </>
      }>
      <View>
        {Object.keys(data)?.length > 0 && (
          <View style={styles.container}>
            {!(
              (transaction_type === 'Request_Received' && status === 'Pending') ||
              (transaction_type === 'Request_Sent' && status === 'Pending')
            ) && contentHeader}
            <BottomInfo
              title={transaction_type_name(data, trans)}
              text={sheetNameGenerate(data, trans, user)}
              email={
                (email && (email === user_email ? end_user_email : email)) ||
                (phone && (phone === user_phone ? end_user_phone : phone))
              }
            />
            <BottomInfo
              title={trans('Transaction ID')}
              text={uuid}
              copy={true}
            />
            <BottomInfo
              title={trans('Time')}
              text={moment(transaction_created_at, 'DD/MM/YYYY hh:mm A').format(
                'DD MMM YYYY, hh:mm A',
              )}
            />
            <BottomInfo
              title={transaction_amount_type_name(data, trans)}
              text={display_subtotal}
            />
            {!(
              Number(display_totalFess?.split(' ')[0]) === 0 ||
              Number(display_totalFess?.split(' ')[1]) === 0
            ) && <BottomInfo title={trans('Fee')} text={display_totalFess} />}
            <BottomInfo
              title={trans('Total')}
              text={display_total.replace('-', '')}
            />
            <BottomInfo
              title={trans('Status')}
              text={trans(generateStatus(status))}
              statusColor={dynamicStatusColor(status, colors)}
              last={note ? false : true}
            />
            {note && (
              <BottomInfo
                title={trans('Note')}
                text={note}
                last={true}
                note={true}
              />
            )}
          </View>
        )}
      </View>
    </CustomBottomSheet>
  );
};

export default memo(TransactionBottomSheet);
