import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

const CustomAnimation = () => {
  return (
    <View style={{width: 70, height: 70}}>
      <LottieView
        source={require('../../assets/animations/location.json')}
        autoPlay
        loop
        style={{width:"100%", height: "100%",}}
      />
    </View>
  );
};

export default CustomAnimation;
