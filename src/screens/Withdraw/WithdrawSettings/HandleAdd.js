import config from '../../../../config';
import {useDispatch, useSelector} from 'react-redux';
import {getAllWithdrawSettingsLists} from '../../../features/slices/WithdrawLists/getWithdrawSettingsLists';
import {useNavigation, useTheme} from '@react-navigation/native';
import {WITHDRAW_SETTINGS} from '../../../navigation/routeName/routeName';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';

const useHandleAdd = props => {
  const {setLoading, setWithdrawMethod, setWithdrawCurrency} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t:trans} = useTranslation();
  const {user: {token = '', user_id = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {colors} = useTheme();
  const handleAddMethodStat = async (records, status) => {
    if (Array.isArray(records)) {
      if (records.length === 0) {
        if (status.code === 201) {
          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const updatedSettingsList = await dispatch(
            getAllWithdrawSettingsLists({token, URL}),
          );
          navigation.navigate(WITHDRAW_SETTINGS,{
            setSelectedMethod :setWithdrawMethod,
            setSelectedCurrency:setWithdrawCurrency
          });
          handleToaster(
            trans('Withdraw settings added successfully'),
            'success',
            colors,
          );
          if (setWithdrawMethod) {
            updatedSettingsList.payload.response.records.length > 0
              ? setWithdrawMethod(
                  updatedSettingsList.payload.response.records[0],
                )
              : (setWithdrawMethod(null), setWithdrawCurrency(null));
          }
        }
      }
    } else {
      setLoading(false);
      handleToaster(trans(Object.values(records)[0]), 'warning', colors);
    }
  };
  return [handleAddMethodStat];
};

export default useHandleAdd;
