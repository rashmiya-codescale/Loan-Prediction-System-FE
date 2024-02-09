/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, NativeBaseProvider} from 'native-base';
import {firebase_auth} from '../../firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {collection, getDocs, query, where} from 'firebase/firestore';
import CustomModal from '../../components/CustomModal';

const Profile = ({navigation}: any) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  async function logOutOnAction(): Promise<void> {
    try {
      await firebase_auth.signOut();
      navigation.navigate('SignInPage');
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    //getUserDetails();
    const dataObj = {
      name: 'kamal',
      age: 25,
      address: 'colombo',
    };
    setModalData(dataObj);
  }, []);

  // async function getUserDetails() {
  //   const userEmail = await AsyncStorage.getItem('userEmail');
  //   console.log(userEmail);
  //   const userCollectionRef = collection(firestore_db, 'SignInMembers');
  //   const userQuery = query(userCollectionRef, where('email', '==', userEmail));
  //   try {
  //     const data = await getDocs(userQuery);
  //     if (!data.empty) {
  //       const userDoc = data.docs[0];
  //       const userData = userDoc.data();
  //       setName(userData.name);
  //       setEmail(userData.email);
  //       console.log(userData);
  //     } else {
  //       console.log('User not found in Firestore.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // }
  async function modalonAction() {
    setModalVisible(true);
  }

  return (
    <NativeBaseProvider>
      <View style={styles.layout}>
        <Text style={styles.text}>Loan Approval Prediction</Text>

        {/* profile area */}
        <View
          style={{
            margin: 5,
            backgroundColor: '#2a2a2a',
            height: 500,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.profileArea}>
            {/* <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                isReadOnly={true}
                style={styles.inputStyle}
                size="md"
                value={name}
                placeholder=" Name"
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                isReadOnly={true}
                style={styles.inputStyle}
                size="md"
                value={email}
                placeholder=" example@abc.com"
                borderColor={'#4b5563'}
                borderRadius={10}
              />
            </FormControl> */}
            {/* moel area */}
            <Button
              mt="2"
              style={styles.logOutBtn}
              borderRadius={10}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.logOutBtnTxt}>Model one</Text>
            </Button>
            <Button
              mt="2"
              style={styles.logOutBtn}
              borderRadius={10}
              onPress={() => modalonAction()}>
              <Text style={styles.logOutBtnTxt}>Model two</Text>
            </Button>
            <Button
              mt="2"
              style={styles.logOutBtn}
              borderRadius={10}
              onPress={() => modalonAction()}>
              <Text style={styles.logOutBtnTxt}>Model three</Text>
            </Button>

            <CustomModal
              data={modalData}
              modalState={modalVisible}
              onClose={() => setModalVisible(false)}
            />
            {/* main */}
            <Button
              mt="2"
              style={styles.logOutBtn}
              borderRadius={10}
              onPress={() => logOutOnAction()}>
              <Text style={styles.logOutBtnTxt}>Log out</Text>
            </Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default Profile;

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
  profileArea: {
    backgroundColor: 'transparent',
    width: 350,
    flex: 0.5,
    top: 20,
    alignItems: 'center',
    color: 'white',
  },
  inputStyle: {
    color: 'white',
    backgroundColor: '#4b5563',
    textAlign: 'left',
  },
  logOutBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    top: 100,
  },
  logOutBtnTxt: {
    color: '#2E2D2D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
