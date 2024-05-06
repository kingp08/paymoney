export const nameGenerate = (item, trans) => {
  const {
    end_user_first_name,
    end_user_last_name,
    transaction_type,
    payment_method_name,
    curr_code,
    company_name,
    merchant_name,
  } = item || {};
  switch (transaction_type) {
    case 'Deposit':
      return payment_method_name === 'Mts'
        ? generateViaText('Deposit', company_name, trans)
        : generateViaText('Deposit', payment_method_name, trans);
    case 'Payment_Received':
      return payment_method_name === 'Mts'
        ? generateViaText('Payment', company_name, trans)
        : generateViaText('Payment', payment_method_name, trans);
    case 'Withdrawal':
      return payment_method_name === 'Mts'
        ? generateViaText('Withdraw', company_name, trans)
        : generateViaText('Withdraw', payment_method_name, trans);
    case 'Payment':
      return trans(payment_method_name);
    case 'Exchange_To':
      return `${trans('Exchange')} ${trans('To')} ${trans(curr_code)}`;
    case 'Exchange_From':
      return `${trans('Exchange')} ${trans('From')} ${trans(curr_code)}`;
    case 'Payment_Sent':
      return trans(merchant_name);
    default:
      return end_user_first_name
        ? trans(end_user_first_name) + ' ' + trans(end_user_last_name)
        : transaction_type == "Transferred" ? trans('unregistered') : curr_code;
  }
};
export const sheetNameGenerate = (item, trans, user) => {
  const {
    end_user_first_name,
    end_user_last_name,
    transaction_type,
    payment_method_name,
    curr_code,
    company_name,
    merchant_name,
  } = item || {};
  switch (transaction_type) {
    case 'Deposit':
      return trans(curr_code);
    case 'Withdrawal':
    case 'Payment_Received':
      return payment_method_name === 'Mts'
        ? trans(company_name)
        : trans(payment_method_name);
    case 'Payment':
      return trans(payment_method_name);
    case 'Exchange_To':
      return trans(curr_code);
    case 'Exchange_From':
      return trans(curr_code);
    case 'Payment_Sent':
      return trans(merchant_name);
    case 'Investment':
      return trans(user?.email);
    default:
      return end_user_first_name
        ? trans(end_user_first_name) + ' ' + trans(end_user_last_name)
        : curr_code;
  }
};

export const profileGenerate = (item, colors) => {
  const {transaction_image,user_photo} =
    item || {};
   return transaction_image ? transaction_image : user_photo;
};

export const svgBgGenerate = (item, colors) => {
  const {transaction_type, payment_method_name} = item || {};
  switch (transaction_type) {
    case 'Withdrawal':
    case 'Payment_Sent':
    case 'Payment_Received':
    case 'Deposit':
      return payment_method_name === 'Stripe'
        ? colors.white
        : payment_method_name === 'Paypal'
        ? colors.white
        : payment_method_name === 'Mts'
        ? colors.white
        : colors.borderSeptenary;
    default:
      return colors.borderSeptenary;
  }
};

export const transaction_type_generate = (item, trans) => {
  const {transaction_type} = item || {};
  switch (transaction_type) {
    case 'Request_Received':
      return trans('Request Received');
    case 'Request_Sent':
      return trans('Request Sent');
    case 'Withdrawal':
      return trans('Withdraw');
    default:
      return transaction_type?.includes('_')
        ? trans(transaction_type?.split('_')[0]) +
            ' ' +
            trans(transaction_type?.split('_')[1])
        : trans(transaction_type);
  }
};
export const transaction_type_name = (item, trans) => {
  const {transaction_type} = item || {};
  switch (transaction_type) {
    case 'Transferred':
      return trans('Transferred To');
    case 'Payment_Received':
      return trans('Payment Method');
    case 'Deposit':
      return trans('Deposited To');
    case 'Withdrawal':
      return trans('Withdrawal With');
    case 'Received':
      return trans('Received From');
    case 'Request_Received':
      return trans('Requested From');
    case 'Request_Sent':
      return trans('Requested To');
    case 'Exchange_To':
      return trans('To Wallet');
    case 'Exchange_From':
      return trans('From Wallet');
    case 'Payment_Sent':
      return trans('Merchant');
    case 'Investment':
      return trans('Invested By');
    default:
      return trans(
        transaction_type?.includes('_')
          ? transaction_type?.split('_')[0] +
              ' ' +
              transaction_type?.split('_')[1]
          : transaction_type,
      );
  }
};
export const transaction_amount_type_name = (item, trans) => {
  const {transaction_type} = item || {};
  switch (transaction_type) {
    case 'Transferred':
      return trans('Transferred Amount');
    case 'Payment_Received':
      return trans('Payment Amount');
    case 'Deposit':
      return trans('Deposited Amount');
    case 'Withdrawal':
      return trans('Withdrawal Amount');
    case 'Received':
      return trans('Received Amount');
    case 'Request_Received':
      return trans('Requested Amount');
    case 'Request_Sent':
      return trans('Requested Amount');
    case 'Exchange_To':
      return trans('Exchange Amount');
    case 'Exchange_From':
      return trans('Exchange Amount');
    case 'Payment_Sent':
      return trans('Payment Amount');
    default:
      return trans(
        transaction_type?.includes('_')
          ? transaction_type?.split('_')[0] + ' ' + 'Amount'
          : transaction_type?.concat(' ', 'Amount'),
      );
  }
};
export const generateStatus = status => {
  switch (status) {
    case 'Blocked':
      return 'Cancelled';
    case 'Refund':
      return 'Refunded';
    default:
      return status;
  }
};
export const generateSignedAmount = (item, mainTrans = false) => {
  const {display_subtotal, display_total} = item || {};
  const generateAmount = amount => {
    const finalAmount = `${
      Number(amount?.split(' ')[0])
        ? `-${amount?.split(' ')[0]}`
        : amount?.split(' ')[0]
    } ${
      Number(amount?.split(' ')[1])
        ? `-${amount?.split(' ')[1]}`
        : amount?.split(' ')[1]
    }`;
    return finalAmount;
  };
  const result = mainTrans
    ? display_total?.includes('-')
      ? generateAmount(display_subtotal)
      : display_subtotal
    : display_total?.includes('-')
    ? `${display_total?.split('-')[0]}${display_total?.split('-')[1]}`
    : display_subtotal;
  return result;
};
const generateViaText = (type, method, trans) => {
  return `${trans(type)} ${trans('Via')} ${trans(method)}`;
};
