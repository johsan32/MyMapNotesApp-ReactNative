import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomTextInput from '../../components/ui/TextInput';
import CustomButton from '../../components/ui/customButton';
import { windowWidth} from '../../utils/Dimension';
import {MyColor} from '../../theme/colors';
import {MarkerContext} from '../../context/MyContext';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/Routes';

export default function EditList({route}) {
  const {getMarker, loading, updateMarker} = MarkerContext();
  const {item} = route?.params;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Not', value: 'NOT'},
    {label: 'Adres', value: 'ADRES'},
    {label: 'Seyahat', value: 'SEYAHAT'},
  ]);
  const [value, setValue] = useState(item?.status);
  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);
  const navigation = useNavigation();

  const handleUpdate = item => {
    const updateForm = {
      title: title,
      description: description,
      region: item?.region,
      date: item?.date,
      status: value,
    };
    updateMarker(item, updateForm);
    getMarker();
    navigation.navigate(Routes.TRIPLIST);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 2}}>
        <CustomTextInput
          placeHolder={'Başlık'}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <CustomTextInput
          inputStyle={{height: 80}}
          placeHolder={'Açıklama'}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <DropDownPicker
          listMode="SCROLLVIEW"
          open={open}
          value={value}
          items={items}
          placeholder="Seçiminizi yapınız..."
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{
            width: '95%',
            alignSelf: 'center',
            marginHorizontal: 10,
          }}
          dropDownContainerStyle={{
            borderWidth: 1.5,
            opacity: 0.9,
            borderColor: MyColor.primary,
          }}
          style={{
            borderWidth: 1.5,
            opacity: 0.8,
            borderColor: MyColor.primary,
          }}
        />
      </View>
      <View style={styles.btnView}>
        <CustomButton
          title={'Çık'}
          color={MyColor.error}
          onPress={() => navigation.navigate(Routes.TRIPLIST)}
        />
        <CustomButton
          title={'Kaydet'}
          loading={loading}
          color={MyColor.success}
          onPress={() => handleUpdate(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
