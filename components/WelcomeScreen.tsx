import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  PermissionsAndroid
} from 'react-native';
// import { RouteProp, NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'WelcomeScreen'>;

// type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'WelcomeScreen'>;

// type Props = {
//   route: WelcomeScreenRouteProp;
//   navigation: WelcomeScreenNavigationProp;
// };
// WelcomeScreen: React.FC<Props> = ({ navigation }) =>

const WelcomeScreen = () => {

    useEffect(() => {
        requestCameraAndLocationPermission();
      }, []);
    
      async function requestCameraAndLocationPermission() {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ]);
          if (
            granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Both permissions granted');
          } else {
            console.log('One or both permissions denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }

  const handleProceed = () => {
    // Navigate to next screen
    // navigation.navigate('NextScreen');
  };

  return (
    <ImageBackground source={require('../assets/images/WelcomeScreen_mobile.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/WelcomeScreen_mobile.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed To Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  logo: {
    width: width / 2,
    height: undefined,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#38B6FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop:100,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default WelcomeScreen;
