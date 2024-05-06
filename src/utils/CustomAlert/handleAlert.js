import {View} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import WarningIcon from '../../assets/svg/warning-icon.svg';
import ErrorIcon from '../../assets/svg/error-icon.svg';
import CopyIcon from '../../assets/svg/copy.svg';
import SuccessIcon from '../../assets/svg/success-toast.svg';

import {customAlertStyle} from './AlertStyle';

export const handleToaster = (msg, type, colors, animated = true) => {
  const styles = customAlertStyle(colors, type);
  showMessage({
    message: msg,
    type: type,
    animated: animated,
    style: {...styles.flashMessage, ...styles.messageContainer},
    textStyle: styles.messageStyle,
    hideOnPress: type == 'internet-warning' ? false : true,
    floating: true,
    duration:
      type == 'internet-warning'
        ? false
        : type !== 'success' && type !== 'copied'
        ? 3000
        : 2000,

    icon: () => (
      <View>
        {type === 'warning' && (
          <View>
            <WarningIcon fill={colors.sunshade} style={{...styles.iconStyle}} />
          </View>
        )}
        {type === 'error' && (
          <View>
            <ErrorIcon fill={colors.ceriseRed} style={{...styles.iconStyle}} />
          </View>
        )}
        {type === 'success' && (
          <View>
            <SuccessIcon fill={colors.green} style={{...styles.iconStyle}} />
          </View>
        )}
        {type === 'qrScan' && (
          <View>
            <ErrorIcon fill={colors.white} style={{...styles.iconStyle}} />
          </View>
        )}
        {type === 'copied' && (
          <View>
            <CopyIcon
              fill={colors.lavenderGray}
              style={{...styles.iconStyle}}
            />
          </View>
        )}
      </View>
    ),
  });
};
