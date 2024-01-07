import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Edit, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {MyColor} from '../theme/colors';
import {Routes} from '../utils/Routes';
import {MarkerContext} from '../context/MyContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListCard({item}) {
  const {deleteMarker} = MarkerContext();
  const navigation = useNavigation();

  const handleDelete = item => {
    deleteMarker(item);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate(Routes.TRIPDETAIL, {item: item, id: item.id})
        }
        style={{flex: 4}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          {item?.status === 'NOT' ? (
            <Icon name="google-maps" size={40} color={MyColor.primary} />
          ) : item?.status === 'ADRES' ? (
            <Icon name="home-map-marker" size={40} color={MyColor.screen} />
          ) : (
            <Icon
              name="map-marker-radius-outline"
              size={40}
              color={MyColor.error}
            />
          )}
          <Text
            style={[
              styles.taskTitle,
              {
                color:
                  item?.status === 'SEYAHAT'
                    ? MyColor.error
                    : item?.status === 'ADRES'
                    ? MyColor.screen
                    : MyColor.primary,
              },
            ]}>
            {item?.title}
          </Text>
        </View>

        <Text style={styles.taskDescription}>{item?.description}</Text>
        <Text
          style={{
            marginVertical: 10,
            color: MyColor.screen,
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {item?.date}
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate(Routes.EDITLIST, {item: item, type: 'Update'})
          }>
          <Edit color={MyColor.screen} />
        </Pressable>
        <Pressable onPress={() => handleDelete(item)}>
          <Trash color={MyColor.error} size="28" />
        </Pressable>
        <TouchableOpacity
          style={[
            styles.statusContainer,
            {
              backgroundColor:
                item?.status === 'SEYAHAT'
                  ? MyColor.error
                  : item?.status === 'ADRES'
                  ? MyColor.screen
                  : MyColor.primary,
            },
          ]}>
          <Text style={styles.textStatus}>{item?.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
