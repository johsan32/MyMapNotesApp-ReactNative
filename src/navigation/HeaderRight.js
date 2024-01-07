import {StyleSheet, View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyColor} from '../theme/colors';
import {MarkerContext} from '../context/MyContext';
import ModalFilter from '../components/ModalFilter';

export default function HeaderRight({}) {
  const {markers, value, setValue, filteredData, getMarker} = MarkerContext();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
getMarker()
  }, [value]);
  return (
    <>
      {markers?.length !== 0 ? (
        <View style={styles.container}>
          <ModalFilter
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            value={value}
            setValue={setValue}
          />
          <Text style={styles.text}>{filteredData?.length}</Text>
        </View>
      ) : (
        <Image
          source={require('../assets/images/triplogo.png')}
          style={{width: 40, height: 40}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
