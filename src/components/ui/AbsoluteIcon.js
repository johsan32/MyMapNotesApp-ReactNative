import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyColor} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
export default function AbsoluteIcon(props) {
  const navigation = useNavigation();
  const {
    name,
    size = 25,
    color = MyColor.icon,
    route,
    iconStyle,
    buttonStyle,
    onPress,
    isDisabled =false,
  } = props;

  return (
    <View style={[styles.iconView, iconStyle]}>
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.button, buttonStyle]}
        onPress={onPress ? onPress : () => navigation.navigate(route)}>
        <Icon name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
