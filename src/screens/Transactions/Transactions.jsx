import {
  View,
  FlatList,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {memo, useContext, useMemo} from 'react';
import RecentActivities from '../components/RecentActivities/RecentActivities';
import moment from 'moment/moment';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import {
  generateSignedAmount,
  generateStatus,
  nameGenerate,
  profileGenerate,
  svgBgGenerate,
  transaction_type_generate,
} from './TransactionsFunctionality/transactionFunctionality';
import {useTheme} from '@react-navigation/native';
import {transactionStyle} from './transactions.style';
import TransactionBottomSheet from './TransactionBootmSheet/TransactionBootmSheet';
import {useState} from 'react';
import {rs} from '../../utils/styles/responsiveSize';
import {useEffect} from 'react';
import {HOME} from '../../navigation/routeName/routeName';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import {
  fetchAllTransactions,
  getAllTransactions,
  getMoreTransactions,
  getMyAllTransactionList,
} from '../../features/slices/transactions/transactions';
import {getInfo, refresh} from '../../features/auth/login/loginApi';
import NoRecordCard from '../components/NoRecordCard/NoRecordCard';
import {useTranslation} from 'react-i18next';
import config from '../../../config';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import {getProfileSummary} from '../../features/slices/user/getProfile/getProfile';
import Loader from '../../utils/Loader/Loader';
import { getMyWallets } from '../../features/slices/myWallets/myWallets';

const Transactions = ({
  navigation,
  route: {params: {route: previousRoute} = {}},
}) => {
  const {user: {token} = {}} = useSelector(state => state.loginUserReducer);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const [newData, setNewData] = useState({});
  const [individualRef, setIndividualRef] = useState(null);
  const {allTransactions, loading, loadMore, offset, limit, order, isRefresh,totalRecords} =
    useSelector(state => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    individualRef?.current?.snapToIndex(0);
  }, [individualRef]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (allTransactions?.length === 0 && isConnected) {
        dispatch(getAllTransactions({token}));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, isConnected]);
  const handleMoreData = () => {
    if (totalRecords > allTransactions?.length && isConnected) {
      const URL = `${config.BASE_URL_VERSION}/transaction/activityall?offset=${offset}&limit=${limit}&type=allTransactions&order=${order}`;
      dispatch(getMoreTransactions({token, URL}));
    }
  };
  useEffect(() => {
    if (previousRoute) {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        navigation.dispatch(navigation.navigate(HOME));
      });
    }
  }, [navigation, previousRoute]);
  const onRefresh = async () => {
    const URL = `${config.BASE_URL_VERSION}/transaction/activityall?offset=0&limit=${limit}&type=allTransactions&order=desc`;
    const res = await refresh(
      token,
      URL,
      dispatch,
      fetchAllTransactions,
      getInfo,
      getMyAllTransactionList,
    );
    typeof res === 'undefined' && (dispatch(getProfileSummary({token})), dispatch(getMyWallets({token})));
  };
  const [fastLoad, setFastLoad] = useState(true);
  const renderItem = ({item, index}) => (
    <RecentActivities
      setNewData={setNewData}
      setIndividualRef={setIndividualRef}
      item={item}
      name={nameGenerate(item, trans)}
      index={index}
      fee={
        !(
          Number(item?.display_totalFess?.split(' ')[0]) === 0 ||
          Number(item?.display_totalFess?.split(' ')[1]) === 0
        ) && item?.display_totalFess
      }
      time={moment(item?.transaction_created_at, 'DD/MM/YYYY hh:mm A').format(
        'DD MMM YYYY, hh:mm A',
      )}
      actionType={transaction_type_generate(item, trans)}
      amount={generateSignedAmount(item, "mainTrans")}
      status={trans(generateStatus(item?.status))}
      statusColor={item?.status}
      image={
        <ProfileImage
          imageURL={profileGenerate(item, colors)}
          logo={item?.payment_method_name === 'Mts'}
          imageSize={rs(44)}
          svgBg={svgBgGenerate(item, colors)}
        />
      }
    />
  );
  const memoizedValue = useMemo(() => renderItem, [allTransactions]);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View style={transactionStyle(colors).container} />;

  return (
    <>
      <StatusBar backgroundColor={colors.bgPrimary} barStyle="light-content" />
      {loading && allTransactions?.length === 0 && <CustomLoader />}
      {allTransactions?.length > 0 ? (
        <FlatList
          initialNumToRender={1}
          data={allTransactions}
          windowSize={10}
          updateCellsBatchingPeriod={20}
          showsVerticalScrollIndicator={false}
          style={transactionStyle(colors).container}
          renderItem={memoizedValue}
          keyExtractor={(item, index) => index}
          refreshing={isRefresh}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.3}
          onEndReached={() => handleMoreData()}
          ListFooterComponent={
            loadMore &&
            totalRecords > allTransactions?.length && (
              <View style={transactionStyle(colors).transactionLottieCont}>
                <Loader
                  source={require('../../assets/lottie/loader.json')}
                  size={{width: rs(65), height: rs(55)}}
                  color={colors.textTertiaryVariant}
                  />
                <View>
            </View>
              </View>
            )
          }
        />
      ) : (!loading && allTransactions?.length === 0) || !allTransactions ? (
        <ScrollView
          style={transactionStyle(colors).container}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }>
          <NoRecordCard
            style={transactionStyle(colors).noTransactionsCard}
            text={
              isConnected
                ? trans('No Transactions History')
                : trans('Your internet connection might not be working at the moment. Please check and try again.')
            }
          />
        </ScrollView>
      ) : (
        ''
      )}
      <TransactionBottomSheet
        bottomSheetRef={individualRef}
        data={newData}
        setNewData={setNewData}
      />
    </>
  );
};
export default memo(Transactions);
