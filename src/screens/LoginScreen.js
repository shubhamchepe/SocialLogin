import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../utils/ResponsiveFormula';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    let InfoFromAsync = AsyncStorage.getItem('AuthDetails');
    if (InfoFromAsync !== null) {
      this.props.navigation.navigate('Userdetailsscreen');
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{
            width: widthPercentageToDP('100%'),
            height: heightPercentageToDP('100%'),
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() =>
                this.props.navigation.navigate('Userdetailsscreen')
              }>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                Login With Linkedin
              </Text>
              {/* <Icon size={20} color={'#fff'} name="linkedin"/> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    width: widthPercentageToDP('95%'),
    height: heightPercentageToDP('8%'),
    backgroundColor: '#0093b5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
