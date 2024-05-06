import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';

import {
  DEPOSIT_USING_PAYPAL,
  HOME,
} from '../../../navigation/routeName/routeName';
import DepositUsingStripeDetails from '../ConfirmDeposit/Stripe/Details/DepositUsingStripeDetails';
import {useTranslation} from 'react-i18next';
import {depositUsingStripeStyle} from '../ConfirmDeposit/Stripe/depositUsingStripe.style';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {TouchableOpacity} from 'react-native';
const TransactionFailed = ({
  navigation,
  route: {
    params: {
      data,
      setDepositInfo = {},
      initialState = {},
      setAmount = {},
      setError = {},
      errorText = {},
    },
  },
}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const styles = depositUsingStripeStyle(colors);
  const currency_Id = {currency_id: data?.currency.id};
  const handleProceed = () => {
    navigation.navigate(DEPOSIT_USING_PAYPAL, {
      currency_Id,
      data,
      setDepositInfo,
      initialState,
      setAmount,
      setError,
      errorText,
    });
  };

  return (
    <>
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
            <DepositUsingStripeDetails data={data} via={trans('Paypal')} />
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
    </>
  );
};

export default TransactionFailed;
