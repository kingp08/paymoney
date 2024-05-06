import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import {useTheme} from '@react-navigation/native';
import {depositUsingStripeStyle} from './depositUsingStripe.style';
import DepositUsingStripeDetails from './Details/DepositUsingStripeDetails';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {
  ACCOUNT_INFORMATION,
  HOME,
} from '../../../../navigation/routeName/routeName';
import {useTranslation} from 'react-i18next';
import {useContext} from 'react';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';

const DepositUsingStripe = ({
  navigation,
  route: {
    params: {
      data,
      setDepositInfo = {},
      setAmount = {},
    } = {},
  },
}) => {
  const {colors} = useTheme();
  const {isConnected} = useContext(NetworkContext);
  const styles = depositUsingStripeStyle(colors);
  const {t:trans} = useTranslation();

  const handleProceed = () => {
    if (isConnected) {
      navigation.navigate(ACCOUNT_INFORMATION, {
        setDepositInfo,
        setAmount,
        data,
      });
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TransactionStep
             currentPage={trans('{{x}} of {{y}}', {
              x: 2,
              y: 3,
            })}
            header={trans('Confirm Your Deposit')}
            presentStep={2}
            totalStep={3}
            description={trans('Please review the details before confirming')}
            style={[styles.mb_20, styles.transactionStep]}
          />
          <DepositUsingStripeDetails data={data} />
          <CustomButton
            title={trans('Confirm')}
            onPress={handleProceed}
            bgColor={colors.cornflowerBlue}
            style={styles.processButton}
            color={colors.white}
          />
          <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
            <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DepositUsingStripe;
