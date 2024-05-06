import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {moneyRequestTransactionDetailsStyle} from './moneyRequestTransactionDetailsStyle';
import ButtonOutline from '../../../components/Buttons/ButtonOutline/ButtonOutline';
import TransactionsDetailsCard from './DetailsCard/TransactionsDetailsCard';
import MoneyInfoCard from '../../../components/MoneyInfoCard/MoneyInfoCard';
import {HOME} from '../../../../navigation/routeName/routeName';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {postInfo} from '../../../../features/auth/login/loginApi';
import MyStatusBar from '../../../../utils/MyStatusBar/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {getAllTransactions} from '../../../../features/slices/transactions/transactions';
import {useContext} from 'react';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import config from '../../../../../config';
import Loader from '../../../../utils/Loader/Loader';
import { rs } from '../../../../utils/styles/responsiveSize';

const MoneyRequestTransactionDetails = ({
  navigation,
  route: {
    params: {data: transactionDetails},
  },
}) => {
  const {colors} = useTheme();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {t:trans} = useTranslation();
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.dispatch(navigation.navigate(HOME));
    });
  }, []);
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();
  const {
    preference: {money_format},
  } = useSelector(state => state.preference);
  const [cancelLoading, setCancelLoading] = useState(false);
  const styles = moneyRequestTransactionDetailsStyle(colors);
  const handleCancelRequest = async () => {
    setCancelLoading(true);
    if (isConnected && transactionDetails) {
      const URL = `${config.BASE_URL_VERSION}/request-money/cancel-by-creator`;
      const obj = {
        tr_id: transactionDetails?.id,
      };
      const res = await postInfo(obj, URL, token, 'POST');
      if (res) {
        if (res?.response?.status?.code === 200) {
          dispatch(getAllTransactions({token}));
          handleToaster(trans('Money request cancelled'), 'success', colors);
          navigation.navigate(HOME);
        } else {
          setCancelLoading(false);
          handleToaster(res?.response?.status?.message, 'warning', colors);
        }
      }
    }
  };
  const {
    total,
    currency_code,
    user_email,
    user_phone,
    note,
    user_first_name,
    user_last_name,
  } = transactionDetails || {};
  return (
    <>
      <MyStatusBar backgroundColor={colors.bgPrimary} />
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll_view}>
          <View style={styles.container}>
            <View style={styles.amountContainer}>
              <MoneyInfoCard
                header={trans('Sent Request')}
                amount={`${
                  money_format === 'before'
                    ? total?.split(' ')[1]
                    : total?.split(' ')[0]
                } ${currency_code}`}
                name={`By ${user_first_name} ${user_last_name}`}
                email={user_email || user_phone}
                style={styles.contentWidth}
              />
            </View>
            <TransactionsDetailsCard
              data={transactionDetails}
              style={{
                container: styles.cardCont,
                headerText: styles.headerText,
              }}
            />
            <View style={styles.cardCont}>
              <Text style={styles.headerText}>{trans('Note')}</Text>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerCont}>
          <ButtonOutline
            title={!cancelLoading && trans('Cancel Request')}
            icon={
              cancelLoading && (
                <View>
                  <Loader
                    source={require('../../../../assets/lottie/loader.json')}
                    size={{width: rs(65), height: rs(55)}}
                    color={colors.textSenaryVariant}
                  />
            </View>
              )
            }
            onPress={!cancelLoading ? handleCancelRequest : null}
            style={styles.btnOutline}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default MoneyRequestTransactionDetails;
