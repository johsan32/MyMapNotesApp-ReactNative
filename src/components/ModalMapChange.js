import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {MyColor} from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {windowHeight, windowWidth} from '../utils/Dimension';
const MapChange = ({modalVisible, setModalVisible, value, setValue}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Standard', value: 'standard'},
    {label: 'Hybrid', value: 'hybrid'},
    {label: 'Terrain', value: 'terrain'},
    {label: 'Sattelite', value: 'sattelite'},
  ]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Harita Görünümü!</Text>
            <View style={styles.dropdown}>
              <DropDownPicker
              onChangeValue={()=>setModalVisible(false)}
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                placeholder="Seçiminizi yapınız..."
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{width: '80%'}}
                dropDownContainerStyle={{borderWidth: 1.5, opacity: 0.9, borderColor:MyColor.primary}}
                style={{borderWidth: 1.5, opacity: 0.8, borderColor:MyColor.primary}}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name="close-box-outline"
                size={34}
                color={MyColor.primary}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="map-legend" size={34} color={MyColor.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MapChange;
