import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import ListCard from '../../components/listCard';
import {MarkerContext} from '../../context/MyContext';
import {MyColor} from '../../theme/colors';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../../utils/Dimension';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/Routes';

const TripList = () => {
  const {markers, getMarker, visible, filteredData} = MarkerContext();
  const navigation = useNavigation();

  useEffect(() => {
    getMarker();
  }, []);

  return (
    <View style={styles.container}>
      {markers?.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: windowWidth, height: windowHeight / 2}}>
            <LottieView
              source={require('../../assets/animations/listpage.json')}
              autoPlay
              loop
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white'}}>
              Herhangi bir kayıt oluşturulmadı...{'  '}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.ADDTRIP)}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: MyColor.warning,
                }}>
                Kayıt Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={visible} onRefresh={getMarker} />
          }
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ListCard item={item} />}
        />
      )}
    </View>
  );
};

export default TripList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColor.screen,
  },
});
