import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, NativeBaseProvider} from 'native-base';

const Dashboard = ({navigation}: any) => {
  const openSignIn = () => {
    navigation.navigate('SignInPage');
  };

  return (
    <NativeBaseProvider>
      <View style={styles.layout}>
        <Text
          style={styles.text}
          onPress={() => {
            openSignIn();
          }}>
          Loan Approval Prediction
        </Text>
        <Button
          mt="2"
          style={styles.openSignInPageBtn}
          borderRadius={10}
          onPress={() => openSignIn()}>
          <Text style={styles.openSignInPageBtnTxt}>Continue</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};
export default Dashboard;

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
  openSignInPageBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '80%',
    top: 50,
  },
  openSignInPageBtnTxt: {
    color: '#2E2D2D',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
