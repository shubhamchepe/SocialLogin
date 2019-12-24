import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../utils/ResponsiveFormula';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

class UserDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.0.2.2:3000/auth/linkedin',
      profileData: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    let InfoFromAsync = await AsyncStorage.getItem('AuthDetails');
    InfoFromAsync = JSON.parse(InfoFromAsync);
    if (InfoFromAsync !== null) {
      this.setState({
        profileData: InfoFromAsync,
      });
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem('AuthDetails');
      console.log('Logged Out');
      this.props.navigation.navigate('Loginscreen');
    } catch (e) {
      console.log(e);
    }
  };

  handleNavigationStateChange = navState => {
    if (navState.url === 'http://10.0.2.2:3000/' && !navState.loading) {
      fetch('http://10.0.2.2:3000')
        .then(response => response.json())
        .then(data => {
          this.setState({
            profileData: data,
          });

          const UserData = {
            displayName: this.state.profileData.displayName,
            email: this.state.profileData.emails[0].value,
            ImageUrl: this.state.profileData.photos[0].value,
          };

          this.setState({
            profileData: UserData,
          });
          try {
            AsyncStorage.setItem('AuthDetails', JSON.stringify(UserData));
          } catch (e) {
            console.log(e);
          }
        })
        .catch(err => {
          console.log('Fetch Error :-S', err);
        });
    }
  };

  render() {
    const injectedJs = `
    window.postMessage(window.location.href);
  `;

    return (
      <View style={{flex: 1}}>
        {this.state.profileData == null ? (
          <WebView
            source={{uri: this.state.url}}
            bounces={true}
            style={[
              {
                flex: 1,
              },
            ]}
            injectedJavaScript={injectedJs}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabledAndroid={true}
            javaScriptEnabled={true}
            onNavigationStateChange={this.handleNavigationStateChange}
            onMessage={event => {
              alert('MESSAGE >>>>' + event.nativeEvent.data);
            }}
            onLoadStart={() => {
              //console.log("LOAD START ");
            }}
            onLoadEnd={() => {
              //console.log('LOAD END');
            }}
            onError={err => {
              //console.log('ERROR ');
              //console.log(err);
            }}
          />
        ) : (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0093B5', '#17A4C5', '#2AB7D7']}
            style={styles.TopContainer}>
            <View
              style={{
                alignItems: 'center',
                marginTop: heightPercentageToDP('13%'),
              }}>
            <View style={styles.ProfileBox}>

                 
              <Image
                source={{uri: this.state.profileData.ImageUrl}}
                style={{
                  width: widthPercentageToDP('30%'),
                  height: heightPercentageToDP('16%'),
                  borderWidth: 2,
                  borderColor: '#fff',
                  borderRadius: 80,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontWeight: 'bold',
                  margin: 5,
                }}>
                {this.state.profileData.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  margin: 5,
                }}>
                email:{this.state.profileData.email}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  margin: 5,
                }}>
                Company: Some Company
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  margin: 5,
                }}>
                Designation: Some Designation
              </Text>
            </View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#F8F8F8', '#fff', '#fff']}
              style={styles.Logout}>
              <TouchableOpacity
                style={styles.Logout}
                onPress={() => this.logout()}>
                <Text style={{color: '#0093B5', fontSize: 16, fontWeight: 'bold'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

export default UserDetailsScreen;
const styles = StyleSheet.create({
  TopContainer: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomContainer: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logout: {
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 5,
  },
  ProfileBox:{
      width:widthPercentageToDP('80%'),
      height:heightPercentageToDP('40%'),
      borderRadius:10,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center'
  }
});
