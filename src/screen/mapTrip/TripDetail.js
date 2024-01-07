import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../../components/ui/customButton';
import {MyColor} from '../../theme/colors';
import {Routes} from '../../utils/Routes';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {windowHeight, windowWidth} from '../../utils/Dimension';
import {MarkerContext} from '../../context/MyContext';

export default function TripDetail({route}) {
  const {deleteMarker, getMarker} = MarkerContext();
  const navigation = useNavigation();
  const {item} = route?.params;

  const handleDelete = item => {
    deleteMarker(item);

    navigation.navigate(Routes.TRIPLIST);
  };
  useEffect(() => {
    getMarker();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.headText}>Koordinat</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text style={styles.infoText}>
              {item.region?.latitude.toFixed(5)}
              {'...'}
              {' ~ '}
              {item.region?.longitude.toFixed(5)}
              {'...'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.headText}>Lokasyon</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text style={styles.infoText}>{item.title}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 80,
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.headText}>Açıklama</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text style={styles.infoText}>{item?.description}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.headText}>Kategori</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text style={styles.infoText}>{item?.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.mapView}>
        <View style={styles.containerMap}>
          <MapView
            zoomControlEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: item?.region.latitude,
              longitude: item?.region?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              title="Seçili Lokasyon"
              coordinate={{
                latitude: item?.region.latitude,
                longitude: item?.region?.longitude,
                latitudeDelta: 0.4922,
                longitudeDelta: 0.4421,
              }}>
              <View style={{width: 60, height: 60}}>
                <Image
                  source={require('../../assets/images/pin.png')}
                  style={{width: 50, height: 50}}
                />
              </View>
            </Marker>
          </MapView>
        </View>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          title={'Düzenle'}
          color={MyColor.warning}
          onPress={() => navigation.navigate(Routes.EDITLIST, {item: item})}
        />
        <CustomButton
          title={'Sil'}
          color={MyColor.error}
          onPress={() => handleDelete(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
