import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyColor} from '../../theme/colors';

const CustomMarker = ({marker}) => {
  return (
    <View style={styles.container}>
      <View>
        {marker?.status === 'NOT' ? (
          <Icon name="google-maps" size={40} color={MyColor.primary} />
        ) : marker?.status === 'ADRES' ? (
          <Icon name="home-map-marker" size={40} color={MyColor.screen} />
        ) : (
          <Icon
            name="map-marker-radius-outline"
            size={40}
            color={MyColor.error}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomMarker;
