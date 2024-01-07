import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import { MyColor } from '../theme/colors';


export default function LoadingModal({visible, title}) {
  return (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: MyColor.white,
            borderRadius: 5,
            padding: 15,
          }}>
          <ActivityIndicator size={'large'} color={MyColor.screen} />
          <Text>{title}</Text>
        </View>
      </View>
    </Modal>
  );
}
