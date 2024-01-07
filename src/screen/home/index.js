import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {MyColor} from '../../theme/colors';
import CustomMarker from '../../components/ui/customMarker';
import {Routes} from '../../utils/Routes';
import {MarkerContext} from '../../context/MyContext';
import AbsoluteIcon from '../../components/ui/AbsoluteIcon';
import {windowHeight, windowWidth} from '../../utils/Dimension';
import MapChange from '../../components/ModalMapChange';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const {getMarker, markers, getCurrentPosition} = MarkerContext();
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef(null);
  const MAX_ZOOM_LEVEL = 20;
  const MIN_ZOOM_LEVEL = 3;
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 41.0541648,
    longitude: 28.9764438,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
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

  useEffect(() => {
    getMarker();
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
          {markers?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.region}
              title={marker.title}
              description={marker.description}>
              <CustomMarker marker={marker} />
            </Marker>
          ))}
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
          route={Routes.TRIPLIST}
          color={MyColor.icon}
          iconStyle={{top: 15, right: 10}}
          buttonStyle={{}}
        />
        <AbsoluteIcon
          name="map-marker-radius"
          size={34}
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
export default HomeScreen;

const styles = StyleSheet.create({});
