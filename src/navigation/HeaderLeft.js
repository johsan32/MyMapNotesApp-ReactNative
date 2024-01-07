import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {MyColor} from '../theme/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function HeaderLeft({}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-ios" size={34} color={MyColor.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
