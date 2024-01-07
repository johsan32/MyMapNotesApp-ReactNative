import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {MyColor} from '../theme/colors';
import CustomTextInput from './ui/TextInput';
import CustomButton from './ui/customButton';
import {MarkerContext} from '../context/MyContext';
import {windowHeight, windowWidth} from '../utils/Dimension';
import DropDownPicker from 'react-native-dropdown-picker';
import {Routes} from '../utils/Routes';
import {useNavigation} from '@react-navigation/native';

const AddMarker = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();
  const {addMarker, loading, selectMarker} = MarkerContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Adres', value: 'ADRES'},
    {label: 'Not', value: 'NOT'},
    {label: 'Seyahat', value: 'SEYAHAT'},
  ]);
  const handeSaveNote = () => {
    const form = {
      title: title,
      description: description,
      region: selectMarker,
      status: value,
      date: new Date().toLocaleDateString(),
    };
    addMarker(form);
   
    setModalVisible(false);
     navigation.navigate(Routes.HOME);
    setTitle('');
    setDescription('');
    setValue(null);

  };

  useEffect(() => {}, []);
  return (
    <View style={styles.modalContainer}>
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
            <Text style={styles.modalText}>Lokasyona Ekle</Text>
            <Text style={styles.bottomText}>
              {selectMarker?.latitude.toFixed(6)}
              {' ~ '}
              {selectMarker?.longitude.toFixed(6)}
            </Text>
            <View style={styles.container}>
              <View style={{flex: 2}}>
                <CustomTextInput
                  placeHolder={'Başlık'}
                  value={title}
                  onChangeText={text => setTitle(text)}
                />
                <CustomTextInput
                  placeHolder={'Açıklama'}
                  value={description}
                  inputStyle={{height: 90}}
                  onChangeText={text => setDescription(text)}
                />
                <DropDownPicker
                  onChangeValue={() => setOpen(false)}
                  listMode="SCROLLVIEW"
                  open={open}
                  value={value}
                  items={items}
                  placeholder="Seçiminizi yapınız..."
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={{
                    marginTop: 20,
                    width: '95%',
                    alignSelf: 'center',
                    marginHorizontal: 10,
                  }}
                  dropDownContainerStyle={{
                    borderWidth: 1.5,
                    opacity: 0.9,
                    borderColor: MyColor.screen,
                  }}
                  style={{
                    borderWidth: 1.5,
                    opacity: 0.8,
                    borderColor: MyColor.screen,
                  }}
                />
              </View>
              <View style={styles.btnView}>
                <CustomButton
                  title={'İptal'}
                  color={MyColor.error}
                  onPress={() => setModalVisible(false)}
                />
                <CustomButton
                  loading={loading}
                  color={MyColor.success}
                  disabled={!title || !description}
                  title={'Kaydet'}
                  onPress={handeSaveNote}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddMarker;
