/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  FormControl,
  Input,
  Link,
  NativeBaseProvider,
} from 'native-base';
import {firebase_auth} from '../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPage = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  function openSignUpModel(): any {
    navigation.navigate('SignUpPage');
  }

  async function signInOnAction(): Promise<void> {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      await AsyncStorage.setItem('userEmail', email);
      navigation.navigate('CharacterList');
      clearFields;
    } catch (error: any) {
      console.log(error);
      Alert.alert('sign in faild : ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  function clearFields() {
    setEmail('');
    setPassword('');
  }

  return (
    <NativeBaseProvider>
      <View style={styles.layout}>
        <Text style={styles.text}>My App</Text>

        {/* sign in model area */}
        <View style={styles.modalView}>
          <View style={styles.signInInputArea}>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                value={email}
                placeholder=" example@abc.com"
                borderColor={'#4b5563'}
                borderRadius={10}
                onChangeText={e => {
                  setEmail(e);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                type="password"
                value={password}
                placeholder=" password"
                borderColor={'#4b5563'}
                borderRadius={10}
                onChangeText={e => {
                  setPassword(e);
                }}
              />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'white',
                }}
                alignSelf="flex-end"
                mt="1">
                Forgot Password?
              </Link>
            </FormControl>

            {loading ? (
              <ActivityIndicator size={'large'} color={'#0000ff'} />
            ) : (
              <>
                <Button
                  mt="2"
                  style={styles.signInBtn}
                  borderRadius={10}
                  onPress={() => signInOnAction()}>
                  <Text style={styles.signInBtnTxt}>Sign in</Text>
                </Button>
              </>
            )}

            <View style={styles.signUpTxtArea}>
              <Text style={styles.signUpTxt}>Don't have an account.</Text>
              <Link
                _text={{
                  fontSize: '16',
                  color: '#F9C86A',
                  top: 200,
                }}
                onPress={() => openSignUpModel()}>
                Sign up
              </Link>
            </View>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  layout: {
    backgroundColor: '#2a2a2a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 5,
    backgroundColor: '#2a2a2a',
    height: 500,
    width: '100%',
    alignItems: 'center',
  },
  signInInputArea: {
    backgroundColor: 'transparent',
    width: 350,
    flex: 0.5,
    top: 20,
    alignItems: 'center',
    color: 'white',
  },
  signInBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    top: 150,
  },
  signInBtnTxt: {
    color: '#2E2D2D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpTxtArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: '6%',
  },
  signUpTxt: {
    color: 'white',
    fontSize: 16,
    top: 200,
  },
  inputStyle: {
    color: 'white',
    backgroundColor: '#4b5563',
    textAlign: 'left',
  },
});
