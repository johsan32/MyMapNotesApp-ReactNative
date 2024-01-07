import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {MyColor} from '../../theme/colors';
import MapChange from '../ModalMapChange';


export default function ModalButton() {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.bottomView}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="note" size={32} color={MyColor.primary} />
      </TouchableOpacity>
      <MapChange modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>   
  )
}


const styles = StyleSheet.create({});
