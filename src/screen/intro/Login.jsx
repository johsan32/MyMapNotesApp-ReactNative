import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Routes} from '../../utils/Routes';
import {MyColor} from '../../theme/colors';
import React, {useState} from 'react';
import {UserContext} from '../../context/AuthContext';
import LoadingModal from '../../components/loading';
import Toast from 'react-native-toast-message';


function LoginScreen() {
  const {googleLogin, authUser, loading, setLoading} = UserContext();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    await googleLogin();
    if (authUser) {
      setLoading(false);
      navigation.navigate('Drawer');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/images/intro.jpg')}
        style={styles.imgBack}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/travel.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Üye Girişi</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color={MyColor.button}
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Kullanıcı Adı veya Email adresinizi giriniz..."
              value={authUser?.email}
              placeholderTextColor={MyColor.secondary}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="lock"
              color={MyColor.button}
              style={styles.smallIcon}
            />
            <TextInput
              secureTextEntry={showPassword ? false : true}
              placeholderTextColor={MyColor.secondary}
              placeholder="Şifrenizi giriniz..."
              value='123456'
              style={styles.textInput}
            />
            <TouchableOpacity onPress={handleShowPassword}>
              <FontAwesome
                name={showPassword ? 'eye-slash' : 'eye'}
                color={showPassword ? MyColor.button : MyColor.error}
                style={styles.smallIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <TouchableOpacity>
              <Text style={{color: MyColor.secondary, fontWeight: '700'}}>
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.viewButton}>
            <View>
              <Text style={styles.textSign}>Giriş</Text>
            </View>
          </TouchableOpacity>
          <View style={{padding: 15}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: MyColor.secondary,
              }}>
              ----veya----
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.iconBottom}
                onPress={() => {
                  navigation.navigate(Routes.GUEST);
                }}>
                <FontAwesome
                  name="user-circle-o"
                  color="white"
                  style={styles.smallIcon2}
                />
                <Text style={styles.bottomText}>Misafir</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.iconBottom}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
                <Text style={styles.bottomText}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable style={styles.iconBottom} onPress={handleLogin}>
                <FontAwesome
                  name="google"
                  color={!loading ? 'white' : 'green'}
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
                <Text style={styles.bottomText}>
                  {!loading ? 'Google' : 'Bekleyiniz..'}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.iconBottom}
                onPress={() =>Toast.show({
                  type: 'info',
                  text1: 'Çok yakında...!',
                })}>
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
                <Text style={styles.bottomText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loading && <LoadingModal title={'Giriş Yapılıyor'} />}
      </ImageBackground>
    </SafeAreaView>
  );
}
export default LoginScreen;
