import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Routes} from '../../utils/Routes';
import {windowHeight, windowWidth} from '../../utils/Dimension';
import {MyColor} from '../../theme/colors';

const slides = [
  {
    id: '1',
    image: require('../../assets/images/image1.png'),
    title: 'Seyahatlerini Planla',
    subtitle:
      'İyi planlanan bir seyahat, rota belirlemeye yardımcı olur ve zamandan kazandırır.',
  },
  {
    id: '2',
    image: require('../../assets/images/image2.png'),
    title: 'Seyahat Notları Ekle',
    subtitle:
      'Nereye gidersen git yapabileceklerini keşfet ve kendi kişisel seyahat rehberini oluştur.',
  },
  {
    id: '3',
    image: require('../../assets/images/image3.png'),
    title: 'Seyahat Etmek Yaşam Tarzın mı? ',
    subtitle:
      'Yeni kültürler tanıyınca mutlu isen, keşfetmeyi çok seviyorsan ve maceraperest isen tam sana göre...',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center', width: windowWidth}}>
      <Image
        source={item?.image}
        style={{height: '80%', width: windowWidth, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * windowWidth;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * windowWidth;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: windowHeight * 0.2,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: MyColor.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace(Routes.LOGIN)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: MyColor.black,
                  }}>
                  GİRİŞ
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: MyColor.warning,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => navigation.navigate(Routes.LOGIN)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: MyColor.warning,
                  }}>
                  ATLA
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: MyColor.black,
                  }}>
                  SONRAKİ
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: MyColor.screen}}>
      <StatusBar backgroundColor={MyColor.screen} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: windowHeight * 0.7}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default OnboardingScreen;
