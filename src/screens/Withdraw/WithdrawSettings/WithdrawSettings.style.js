import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const withdrawSettingsStyle = (...args) => {
  const [colors, modalVisible] = args;
  return StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
      opacity: !modalVisible ? 1 : 0.7,
    },
    container: {
      marginVertical: rs(20),
    },
    addoptionBtnContainer: {
      alignItems: 'center',
      paddingBottom: rs(30),
    },
    addOptionBtnStyle: {
      width: width - rs(80),
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: rs(40),
      backgroundColor: colors.bgQuaternary,
      borderRadius: 20,
      padding: rs(20),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: 'black',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
};
