import {View, StatusBar} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Wallet from './Wallet';
import {MyWalletStyle} from './MyWalletStyle';
import {useTheme} from '@react-navigation/native';
import WalletBottomsheet from './WalletBottomsheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyWallets,
  refreshMyWallets,
} from '../../features/slices/myWallets/myWallets';
import {HOME} from '../../navigation/routeName/routeName';
import {FlatList} from 'react-native';
import {getProfileSummary} from '../../features/slices/user/getProfile/getProfile';

const MyWallet = ({
  navigation,
  route: {params: {route: previousRoute} = {}},
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer);
  const {walletsData, isRefresh} = useSelector(state => state.myWallets);
  const [newData, setNewData] = useState({});
  const [individualRef, setIndividualRef] = useState(null);
  useEffect(() => {
    individualRef?.current?.snapToIndex(0);
  }, [individualRef]);
  useEffect(() => {
    if (previousRoute) {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        navigation.dispatch(navigation.navigate(HOME));
      });
    }
  }, [navigation, previousRoute]);
  const renderItem = ({item}) => {
    return (
      <Wallet
        setIndividualRef={setIndividualRef}
        setNewData={setNewData}
        item={item}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, [walletsData]);
  useEffect(() => {
    if (walletsData?.length === 0) {
      dispatch(getMyWallets({token}));
    }
  }, [dispatch]);
  const onRefresh = async () => {
    dispatch(refreshMyWallets({token}));
    dispatch(getProfileSummary({token}));
  };
  const [fastLoad, setFastLoad] = useState(true);
  const [openBottomShet, setOpenBottomShet] = useState(false);
  setTimeout(() => {
    setOpenBottomShet(true);
  }, 1000);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View />;
  return (
    <>
      <StatusBar backgroundColor={colors.bgPrimary} barStyle="light-content" />
      <FlatList
        contentContainerStyle={MyWalletStyle(colors).walletSections}
        data={walletsData}
        renderItem={memoizedValue}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        refreshing={isRefresh}
        removeClippedSubviews={true}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={10}
        windowSize={5}
        onRefresh={onRefresh}
      />
      {openBottomShet && (
        <WalletBottomsheet
          newData={newData}
          bottomSheetRef={individualRef}
        />
      )}
    </>
  );
};

export default MyWallet;
