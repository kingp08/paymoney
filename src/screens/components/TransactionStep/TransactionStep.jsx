import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {transactionStepStyle} from './transactionStep.style';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TransactionStep = ({
  currentPage,
  header,
  totalStep,
  presentStep,
  presentColor,
  defaultColor,
  description,
  style,
  gap,
  fixedHeight,
}) => {
  const {colors} = useTheme();
  const [step, setStep] = useState(false);
  const {t:trans} = useTranslation();
  useEffect(() => {
    let allSteps = [];
    let i = 1;
    for (i; i <= totalStep; i++) {
      allSteps.push(i);
    }
    setStep(allSteps);
  }, [totalStep]);
  const {
    container,
    stepCont,
    currentPage: currentPageStyle,
    header: headerStyle,
    description: descriptionStyle,
  } = transactionStepStyle(colors, totalStep);
  return (
    <View style={[container, style]}>
      {currentPage && (
        <Text style={currentPageStyle}>
          {trans('Step ')}: {currentPage}
        </Text>
      )}
      {header && <Text style={headerStyle}>{header}</Text>}
      <View style={stepCont}>
        {step &&
          step.map(index => (
            <View
              key={index}
              style={
                transactionStepStyle(
                  colors,
                  totalStep,
                  index,
                  presentColor,
                  defaultColor,
                  presentStep,
                  gap,
                  fixedHeight,
                ).step
              }
            />
          ))}
      </View>
      {description && <Text style={descriptionStyle}>{description}</Text>}
    </View>
  );
};

export default TransactionStep;
