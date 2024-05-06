import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import TransactionStep from "../../components/TransactionStep/TransactionStep";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NetworkContext } from "../../../utils/Network/NetworkProvider";
import { depositUsingStripeStyle } from "../ConfirmDeposit/Stripe/depositUsingStripe.style";
import ConfirmDepositDetails from "./ConfirmDepositDetails";
import { HOME, PAYMENT_VIEW } from "../../../navigation/routeName/routeName";
import { useDispatch, useSelector } from "react-redux";
import { depositConfirm } from "../../../features/slices/depositMoneySlice/paymentConfirm";
import { depositWebViewConfirmSelector } from "../../../features/slices/depositMoneySlice/depositWebViewSelector";
import Loader from "../../../utils/Loader/Loader";
import { rs } from "../../../utils/styles/responsiveSize";

const ConfirmDeposit = (props) => {
    const {data} = props?.route?.params || {};
    const {colors} = useTheme();
    const {isConnected} = useContext(NetworkContext);
    const navigation = useNavigation();
    const {t:trans} = useTranslation();
    const dispatch = useDispatch();

    const {user: {token} = {}} = useSelector(
        state => state.loginUserReducer,
    );
    const {isLoading} = useSelector(depositWebViewConfirmSelector)

    const styles = depositUsingStripeStyle(colors);

    const handleProceed = async () => {
        const body = {
            currency_id: data?.currency?.id,
            amount: data?.amount,
            payment_method_id: data?.payment_method?.id
        };
        const res  = await dispatch(depositConfirm({body, token}));
        const {records, status} = res?.payload || {};
        if (isConnected && status?.code == 200) {
            navigation.navigate(PAYMENT_VIEW, {records});
        }
    };
    return (
        <View style={{flex: 1}}>
            <KeyboardAvoidingView
                style={styles.onKeyboard}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
            >
                <ScrollView
                    style={styles.scroll_view}
                    keyboardShouldPersistTaps={'always'}
                    showsVerticalScrollIndicator={false}
                >
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
                        <ConfirmDepositDetails data={data} />
                        <CustomButton
                            title={
                                isLoading ? 
                                <View>
                                    <Loader
                                    source={require('../../../assets/lottie/loader.json')}
                                    size={{width: rs(65), height: rs(55)}}
                                    color={colors.white}
                                    />
                                </View>
                                :
                                trans('Confirm')
                            }
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
        </View>
    );
};

export default ConfirmDeposit;

const styles = StyleSheet.create({});
