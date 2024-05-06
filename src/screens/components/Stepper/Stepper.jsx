import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {stepperStyle} from './stepper.style';

const Stepper = ({
  totalStep,
  presentStep,
  presentColor,
  defaultColor,
  style,
  gap,
  layout = 0,
  fixedHeight,
}) => {
  const {colors} = useTheme();
  const [step, setStep] = useState(false);
  useEffect(() => {
    let allSteps = [];
    let i = 1;
    for (i; i <= totalStep; i++) {
      allSteps.push(i);
    }
    setStep(allSteps);
  }, [totalStep]);
  const {stepCont} = stepperStyle(colors, totalStep);
  return (
    <View style={style}>
      <View style={stepCont}>
        {step &&
          step.map(index => (
            <View
              key={index}
              style={
                stepperStyle(
                  colors,
                  totalStep,
                  index,
                  presentColor,
                  defaultColor,
                  presentStep,
                  gap,
                  layout,
                  fixedHeight,
                ).step
              }
            />
          ))}
      </View>
    </View>
  );
};

export default Stepper;
