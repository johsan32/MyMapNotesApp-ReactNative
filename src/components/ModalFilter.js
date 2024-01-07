import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {MyColor} from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {windowHeight, windowWidth} from '../utils/Dimension';
import {MarkerContext} from '../context/MyContext';

const ModalFilter = ({modalVisible, setModalVisible}) => {
  const {value, setValue} = MarkerContext();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Tümü', value: 'TÜMÜ'},
    {label: 'Adres', value: 'ADRES'},
    {label: 'Not', value: 'NOT'},
    {label: 'Seyahat', value: 'SEYAHAT'},
  ]);

  const handleValueChange = val => {
    setValue(val);
    setModalVisible(false);
  };
  console.log(value);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filtrele</Text>
            <View style={styles.dropdown}>
              <DropDownPicker
                onChangeValue={handleValueChange}
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                dropDownDirection="top"
                placeholder="Seçiniz..."
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{width: '50%'}}
                dropDownContainerStyle={{
                  borderWidth: 1.5,
                  opacity: 1,
                  borderColor: MyColor.screen,
                }}
                style={{
                  borderWidth: 1.5,
                  width: '100%',
                  opacity: 0.8,
                  borderColor: MyColor.screen,
                }}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name="close-circle-outline"
                size={34}
                color={MyColor.error}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="filter-menu-outline" size={34} color={MyColor.screen} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModalFilter;
