import SendMoneyIcon from '../../assets/svg/sendMoney.svg';
import RequestMoneyIcon from '../../assets/svg/requestMoney.svg';
import MerchantPaymentIcon from '../../assets/svg/merchantPayment.svg';
import {
  CREATE_MONEY_REQUEST,
  CREATE_SEND_MONEY,
} from '../../navigation/routeName/routeName';
export const qrElements = trans => [
  {
    id: 0,
    icon: <SendMoneyIcon />,
    method: trans('Send Money'),
    goToScreen: CREATE_SEND_MONEY,
  },
  {
    id: 1,
    icon: <RequestMoneyIcon />,
    method: trans('Request Money'),
    goToScreen: CREATE_MONEY_REQUEST,
  },
  {
    id: 2,
    icon: <MerchantPaymentIcon />,
    method: trans('Merchant Payment'),
    goToScreen: CREATE_SEND_MONEY,
  },
];
