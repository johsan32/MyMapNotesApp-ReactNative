import React, {useContext, useState, createContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

const MyContext = createContext();

const ContextProvider = ({children}) => {
  const [markers, setMarkers] = useState([]);
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectMarker, setSelectMarker] = useState(null);
  const [currentPosition, setCurrentPossition] = useState(null);
  const [filteredData, setFilteredData]=useState([])
  const getMarker = async () => {
    setVisible(true);
    firestore()
      .collection('Markers')
      .get()
      .then(querySnapshot => {
        const fetchMarkers = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchMarkers.push({
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            id: documentSnapshot.id,
            date: documentSnapshot.data().date,
            region: documentSnapshot.data().region,
            status: documentSnapshot.data().status,
          });
        });
        setMarkers(fetchMarkers);

        if (value && value !== 'TÜMÜ') {
          const filtered = fetchMarkers.filter(
            marker => marker.status.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredData(filtered);
        } 
        else {
          setFilteredData(fetchMarkers);
        }
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const addMarker = form => {
    setLoading(true);
    firestore()
      .collection('Markers')
      .add(form)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Not harita üzerinde eklendi!',
        });
        getMarker()
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateMarker = (item, updateForm) => {
    console.log('staaaaa', updateForm);
    firestore()
      .collection('Markers')
      .doc(item?.id)
      .update(updateForm)
      .then(() => {
        Toast.show({
          type: 'info',
          text1: 'Not düzenleme işlemi tamamlandı!',
        });
      })
      .catch(eror => {
        console.log('updateeee', eror);
      })
      .finally(() => {
        console.log('finally  update');
      });
  };

  const deleteMarker = item => {
    firestore()
      .collection('Markers')
      .doc(item?.id)
      .delete()
      .then(() => {
       getMarker()
        console.log('not silindi');
        Toast.show({
          type: 'error',
          text1: 'Kayıt harita üzerinden kaldırıldı!',
        });
      })
      .catch(error => {
        Alert.alert('Başarısız', 'Not Silme Başarısız.', error);
      });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setCurrentPossition(pos.coords);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  const contextValues = {
    markers,
    getMarker,
    addMarker,
    visible,
    loading,
    value,
    setValue,
    setSelectMarker,
    selectMarker,
    updateMarker,
    deleteMarker,
    getCurrentPosition,
    currentPosition,
    filteredData, 
    setFilteredData,
  };

  useEffect(() => {}, []);

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};

export const MarkerContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useContext must be used with a TaskContext');
  }
  return context;
};

export default ContextProvider;
