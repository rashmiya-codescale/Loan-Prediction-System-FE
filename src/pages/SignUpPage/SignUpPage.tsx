import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  FormControl,
  Input,
  Link,
  NativeBaseProvider,
} from 'native-base';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {firebase_auth, firestore_db} from '../../firebaseConfig';
import {addDoc, collection} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpPage = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  function openSignInModel(): any {
    navigation.navigate('SignInPage');
  }

  async function signUpOnAction(): Promise<void> {
    setLoading(true);
    try {
      if (password === confirmPassword) {
        //create new user authentication
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        //store user data on firestore database
        const userCollectionRef = collection(firestore_db, 'SignInMembers');
        await addDoc(userCollectionRef, {
          name: name,
          email: email,
        });

        await AsyncStorage.setItem('userEmail', email);

        console.log(response);
        navigation.navigate('CharacterList');
        clearFields();
      } else {
        Alert.alert('check your password');
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert('sign in faild : ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function clearFields() {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <NativeBaseProvider>
      <View style={styles.layout}>
        <Text style={styles.text}>My App</Text>

        {/* sign up model area */}
        <View style={styles.modalView}>
          <View style={styles.signUpInputArea}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                value={name}
                placeholder=" Jhone cammilus"
                onChangeText={e => {
                  setName(e);
                }}
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                value={email}
                placeholder=" example@abc.com"
                onChangeText={e => {
                  setEmail(e);
                }}
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                value={password}
                type="password"
                placeholder=" password"
                onChangeText={e => {
                  setPassword(e);
                }}
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                style={styles.inputStyle}
                size="md"
                type="password"
                value={confirmPassword}
                placeholder=" Confirm password"
                onChangeText={e => {
                  setConfirmPassword(e);
                }}
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl>

            {loading ? (
              <ActivityIndicator size={'large'} color={'#0000ff'} />
            ) : (
              <>
                <Button
                  mt="2"
                  style={styles.signUpBtn}
                  borderRadius={10}
                  onPress={() => signUpOnAction()}>
                  <Text style={styles.signUpBtnTxt}>Sign up</Text>
                </Button>
              </>
            )}
            <View style={styles.signUpTxtArea}>
              <Text style={styles.signUpTxt}>Have an account.</Text>
              <Link
                _text={{
                  fontSize: '16',
                  color: '#F9C86A',
                  top: 150,
                }}
                onPress={() => openSignInModel()}>
                Sign in
              </Link>
            </View>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignUpPage;

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
  signUpInputArea: {
    backgroundColor: 'transparent',
    width: 350,
    flex: 0.5,
    top: 20,
    alignItems: 'center',
    color: 'white',
  },
  signUpBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    marginTop: 30,
  },
  signUpBtnTxt: {
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
    top: 150,
  },
  inputStyle: {
    color: 'white',
    backgroundColor: '#4b5563',
    textAlign: 'left',
  },
});
