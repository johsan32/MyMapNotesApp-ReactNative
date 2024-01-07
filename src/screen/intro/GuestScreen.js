import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {MyColor} from '../../theme/colors';
import {Routes} from '../../utils/Routes';
import AbsoluteIcon from '../../components/ui/AbsoluteIcon';
import {windowHeight, windowWidth} from '../../utils/Dimension';
import MapChange from '../../components/ModalMapChange';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GuestScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef(null);
  const MAX_ZOOM_LEVEL = 20;
  const MIN_ZOOM_LEVEL = 3;
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 40.0041648,
    longitude: 32.9764438,
    latitudeDelta: 10.5,
    longitudeDelta: 11,
  });
  const getLatLongDelta = (zoomLevel, latitude) => {
    const latDelta = 0.0922 * Math.pow(2, 14 - zoomLevel);
    const longDelta = latDelta * Math.cos((latitude * Math.PI) / 180);
    return [longDelta, latDelta];
  };
  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;

    if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
      currentZoomLevel -= 1;
    } else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= MAX_ZOOM_LEVEL ||
      currentZoomLevel <= MIN_ZOOM_LEVEL
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[0],
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    mapRef?.current?.animateToRegion(zoomedInRegion, 100);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={MyColor.white} barStyle={'dark-content'} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType={value ? value : 'standard'}
          style={styles.map}
          initialRegion={selectedRegion}
          onRegionChangeComplete={region => {
            setSelectedRegion(region);
          }}>
          <Marker coordinate={selectedRegion} />
        </MapView>
        <MapChange
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          value={value}
          setValue={setValue}
        />
        <AbsoluteIcon
          name="map-check-outline"
          size={34}
          isDisabled={true}
          route={Routes.TRIPLIST}
          color={MyColor.icon}
          iconStyle={{top: 10, right: 10}}
          buttonStyle={{}}
        />
        <AbsoluteIcon
          name="map-marker-radius"
          size={34}
          isDisabled={true}
          route={Routes.ADDTRIP}
          color={MyColor.icon}
          iconStyle={{bottom: 20, right: 10}}
          buttonStyle={{}}
        />
        <View style={styles.zoomView}>
          <TouchableOpacity
            style={styles.zoom}
            onPress={() => handleZoom(true)}
            disabled={zoom === MAX_ZOOM_LEVEL}>
            <Icon
              name={'plus'}
              size={22}
              color={MyColor.white}
              style={{opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.zoom}
            onPress={() => handleZoom()}
            disabled={zoom === MIN_ZOOM_LEVEL}>
            <Icon
              name={'minus'}
              size={25}
              color={MyColor.white}
              style={{opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default GuestScreen;

const styles = StyleSheet.create({});
