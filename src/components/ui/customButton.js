
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { MyColor } from '../../theme/colors';
import { windowWidth } from '../../utils/Dimension';


const CustomButton = props => {
  const {title,disabled,loading,color=MyColor.success} = props;
  return (
    <TouchableOpacity {...props} style={[styles.container,{backgroundColor:disabled ? MyColor.secondary : color}]}>
    {
      loading?
      <ActivityIndicator size={"small"} color={MyColor.primary}/>
      :
      <Text style={{color: MyColor.white, fontSize: 20, textAlign: 'center',fontWeight:"500"}}>
      {title}
    </Text>
    }
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({});

export default CustomButton;
