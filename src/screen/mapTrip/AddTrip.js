import {StyleSheet, View, SafeAreaView, Text, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {MyColor} from '../../theme/colors';
import React, {useState} from 'react';
import AbsoluteIcon from '../../components/ui/AbsoluteIcon';
import AddMarker from '../../components/ModalAddMarker';
import {MarkerContext} from '../../context/MyContext';
import CustomAnimation from '../../components/ui/customAnimation';

const AddTrip = () => {
  const {selectMarker, setSelectMarker, currentPosition} = MarkerContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = e => {
    const location = e?.nativeEvent.coordinate;
    setSelectMarker(location);
  };

  console.log(selectMarker);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          zoomControlEnabled={false}
          scrollDuringRotateOrZoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.7922,
            longitudeDelta: 0.7421,
          }}
          onPress={handleMarkerPress}>
          {selectMarker && (
            <Marker
              onPress={() =>
                setModalVisible(!modalVisible) && setSelectMarker('')
              }
              coordinate={selectMarker}
              style={styles.marker}
              description="Detay"
              title="Seçilen Konum">
              <View style={{width: 60, height: 60}}>
                <Image
                  source={require('../../assets/images/pin.png')}
                  style={{width: 50, height: 50}}
                />
              </View>
            </Marker>
          )}
          <Marker
            title="Konumunuz"
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
              latitudeDelta: 0.4922,
              longitudeDelta: 0.4421,
            }}>
            <CustomAnimation />
          </Marker>
        </MapView>
        <AbsoluteIcon
          name="map-marker-check"
          size={34}
          isDisabled={selectMarker ? false : true}
          onPress={() => setModalVisible(!modalVisible)}
          color={MyColor.icon}
          iconStyle={{bottom: 20, right: 10}}
          buttonStyle={{
            backgroundColor: selectMarker ? MyColor.success : MyColor.screen,
          }}
        />
        <AddMarker
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {selectMarker && (
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>
              {selectMarker?.latitude.toFixed(6)}
              {' ~ '}
              {selectMarker?.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default AddTrip;

const styles = StyleSheet.create({});
