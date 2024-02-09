/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, NativeBaseProvider} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {getLoanDataByEmailService} from '../../services/LoanService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharacterList = ({navigation}: any) => {
  interface Character {
    loanType: string;
    amount: number;
    status: string;
  }
  const [posts, setPosts] = useState<Character[]>([]);
  function openProfile(): any {
    navigation.navigate('Profile');
  }

  const [refreshState, setRefreshState] = useState(false);
  const refreshAction = () => {
    setRefreshState(false);
    fetchData();
    setRefreshState(false);
  };
  useEffect(() => {
    // fetch('https://thronesapi.com/api/v2/Characters')
    //   .then(response => response.json())
    //   .then(json => setPosts(json));
    fetchData();
  }, []);
  const fetchData = async () => {
    //const userEmail = 'dslahiru99@gmail.com'; // Replace with the user's email
    const userEmail: any = await AsyncStorage.getItem('userEmail');
    const response = await getLoanDataByEmailService(userEmail);
    console.log('User loan data:', userEmail);
    setPosts(response.data);
  };
  return (
    <NativeBaseProvider>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={refreshAction}
              refreshing={refreshState}
            />
          }>
          <View style={styles.img}>
            <Button
              mt="2"
              style={styles.addNewLoanBtn}
              borderRadius={10}
              onPress={() => navigation.navigate('NewLoan')}>
              <Text style={styles.addNewLoanBtnTxt}>+ New Loan</Text>
            </Button>
            <View style={{flexGrow: 5}} />
            <TouchableOpacity onPress={() => openProfile()}>
              <Image source={require('../../assets/setting.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            {posts.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemText1}>{item.loanType + '  '}</Text>
                {/* <Text style={styles.spaceText}>...</Text> */}
                <Text style={styles.itemText2}>{'Rs. ' + item.amount}</Text>
                <Text style={styles.itemText3}>{item.status}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default CharacterList;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  img: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#2a2a2a',
    padding: 5,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#C0C6CD',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  itemText1: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText2: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText3: {
    color: 'green',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spaceText: {
    marginHorizontal: 15,
  },
  addNewLoanBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '30%',
  },
  addNewLoanBtnTxt: {
    color: '#2E2D2D',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
