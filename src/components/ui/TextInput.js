//import liraries
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {MyColor} from '../../theme/colors';

const CustomTextInput = ({value, placeHolder, onChangeText, inputStyle}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          styles.textHead
        }>
        {placeHolder}
      </Text>
      <TextInput
        multiline={true}
        value={value}
        numberOfLines={3}
        placeHolder={placeHolder}
        style={[styles.textInput, inputStyle]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomTextInput;
