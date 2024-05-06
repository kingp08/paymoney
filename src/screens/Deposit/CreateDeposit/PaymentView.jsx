import { StyleSheet, Dimensions, View, Text, BackHandler, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from 'react-native-webview';
import Loader from "../../../utils/Loader/Loader";
import { rs } from "../../../utils/styles/responsiveSize";
import { useNavigation, useTheme } from "@react-navigation/native";
import { CREATE_DEPOSIT, HOME } from "../../../navigation/routeName/routeName";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../../features/slices/transactions/transactions";
import { handleToaster } from "../../../utils/CustomAlert/handleAlert";
import { useTranslation } from "react-i18next";
import HomeIcon from "../../../assets/svg/home.svg"

const {height} = Dimensions.get('screen');

const PaymentView = (props) => {
    const {records} = props?.route?.params || {};

    const {colors} = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {t: trans} = useTranslation();

    const [loading, setLoading] = useState(true);
    let [code, setCode] = useState(null);

    const {user: {token} = {}} = useSelector(state => state.loginUserReducer);

    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true
        );
        return () => subscription.remove();
    }, []);

    const handleLoad = () => {
        setLoading(false);
    };

    const leaveTile = 4000;
    const handleMessage = (event) => {
        const status = JSON.parse(event.nativeEvent.data);
        setCode(status);
        if(status == 201) {
            navigation.setOptions({headerLeft: () => <></>});
        };
        if(status == 'coinpayment-success') {
            navigation.setOptions({headerLeft: () => (
                <Pressable 
                    onPress={() => navigation.navigate(HOME)}
                >
                    <HomeIcon
                        fill={colors.white}
                        height={rs(21)} 
                        width={rs(21)}
                    />
                </Pressable>
            )});
        }

        setTimeout(() => {
            if(status == 201) {
                dispatch(getAllTransactions({token}));
                navigation.navigate(HOME);
            } else if(status == 401) {
                handleToaster(trans('Deposit has been failed'), 'error', colors);
                navigation.navigate(CREATE_DEPOSIT);
            };
        }, leaveTile);
    }

    const styles = Styles(colors);
    return (
        <>
        <View style={styles.cont}>
            {
                loading && <View style={styles.loader}>
                    <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={{width: rs(100), height: rs(100)}}
                        color={colors.white}
                    />
                </View>
            }
            <WebView
                source={{ uri: records?.url }}
                onLoad={handleLoad}
                incognito={true}
                onMessage={handleMessage}
                style={styles.webView}
            />
        </View>
        {code == 201 && (
            <View style={styles.bottomCont}>
                <Text style={styles.bottomText}>
                    {`This screen automatically redirect to home after ${leaveTile/1000}s`}
                </Text>
            </View>
        )}
        </>
    );
};

export default PaymentView;

const Styles = (colors) => StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: "#1A1721",
        minHeight: height,
    },
    webView: {
        marginBottom: rs(120)
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height-rs(200),
        backgroundColor: "#1A1721"
    },
    bottomCont:{
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    bottomText: {
        textAlign: 'center'
    }
});
