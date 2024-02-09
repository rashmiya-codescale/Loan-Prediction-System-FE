import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Center, CheckIcon, Input, Modal, ScrollView, Select} from 'native-base';
import {Button, FormControl, NativeBaseProvider} from 'native-base';
import {saveLoanService} from '../../services/LoanService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewLoan = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [education, setEducation] = useState('');
  const [propertyDetails, setPropertyDetails] = useState('');
  const [income, setIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [loanType, setLoanType] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Fail');

  const checkPriseOnAction = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    console.log(userEmail);
    setLoading(false);

    //to check ML part............

    // const dataObj = {
    //   nic: nic,
    //   gender: gender,
    //   maritalStatus: maritalStatus,
    //   education: education,
    //   propertyDetails: propertyDetails,
    //   income: income,
    //   employmentStatus: employmentStatus,
    //   loanType: loanType,
    //   loanPurpose: loanPurpose,
    // };
    //

    //if response true ,the data should be save
    //setStatus(response.status)
    //if(response){setShowModal(true);}

    //temp data store.below steps should be include into above condition,
    const dataObj = {
      user_email: userEmail,
      loanType: loanType,
      loanPurpose: loanPurpose,
      amount: amount,
      status: status,
    };
    if (dataObj) {
      const response = await saveLoanService(dataObj);
      console.log('User loan data:', response.data);
      if (response) {
        setStatus('Approved');
        setShowModal(true);
        navigation.navigate('CharacterList');
      }
    }

    //console.log(dataObj);
  };
  const sellModal = () => {
    return (
      <Center>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Confirm your sale!</Modal.Header>
            <Modal.Body>
              Congratulations! Your loan application has been approved.
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Done
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.signUpInputArea}>
          <Text style={styles.title}>Add New Loan</Text>
          {/* NIC */}
          <FormControl style={styles.fields}>
            <FormControl.Label>NIC</FormControl.Label>
            <Input
              size="md"
              value={nic}
              placeholder="123456789V"
              onChangeText={e => {
                setNic(e);
              }}
            />
          </FormControl>

          {/* gender */}
          <FormControl style={styles.fields}>
            <FormControl.Label>Gender</FormControl.Label>
            <Select
              selectedValue={gender}
              minWidth="200"
              accessibilityLabel="Choose Gender"
              placeholder="Choose Gender"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setGender(itemValue)}>
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
            </Select>
          </FormControl>

          {/* married status */}
          <FormControl style={styles.fields}>
            <FormControl.Label>Marital Status</FormControl.Label>
            <Select
              selectedValue={maritalStatus}
              minWidth="200"
              accessibilityLabel="Choose Marital Status"
              placeholder="Choose Marital Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setMaritalStatus(itemValue)}>
              <Select.Item label="Married" value="married" />
              <Select.Item label="Single" value="single" />
              <Select.Item label="Divorced" value="divorced" />
              <Select.Item label="Widowed" value="widowed" />
            </Select>
          </FormControl>

          {/*Education*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Education</FormControl.Label>
            <Select
              selectedValue={education}
              minWidth="200"
              accessibilityLabel="Choose Education"
              placeholder="Choose Education"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setEducation(itemValue)}>
              <Select.Item label="High School" value="high School" />
              <Select.Item
                label="Bachelor's Degree"
                value="bachelor's Degree"
              />
              <Select.Item label="Master's Degree" value="master's Degree" />
              <Select.Item label="Doctorate" value="doctorate" />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>

          {/*Property Details*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Property Details</FormControl.Label>
            <Select
              selectedValue={propertyDetails}
              minWidth="200"
              accessibilityLabel="Choose Property Details"
              placeholder="Choose Property Details"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setPropertyDetails(itemValue)}>
              <Select.Item label="Owned" value="owned" />
              <Select.Item label="Rented" value="rented" />
              <Select.Item label="Mortgage" value="mortgage" />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>

          {/*Income*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Income</FormControl.Label>
            <Input
              size="md"
              value={income}
              placeholder="50 000"
              onChangeText={e => {
                setIncome(e);
              }}
            />
          </FormControl>

          {/*Employment Status*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Employment Status</FormControl.Label>
            <Select
              selectedValue={employmentStatus}
              minWidth="200"
              accessibilityLabel="Choose Employment Status"
              placeholder="Choose Employment Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setEmploymentStatus(itemValue)}>
              <Select.Item label="Employed" value="employed" />
              <Select.Item label="Self-Employed" value="self-Employed" />
              <Select.Item label="Unemployed" value="unemployed" />
              <Select.Item label="Retired" value="retired" />
            </Select>
          </FormControl>

          {/*Loan Type*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Loan Type</FormControl.Label>
            <Select
              selectedValue={loanType}
              minWidth="200"
              accessibilityLabel="Choose Loan Type"
              placeholder="Choose Loan Type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setLoanType(itemValue)}>
              <Select.Item label="Personal Loan" value="personal Loan" />
              <Select.Item label="Mortgage Loan" value="mortgage Loan" />
              <Select.Item label="Auto Loan" value="auto Loan" />
              <Select.Item label="Education Loan" value="education Loan" />
              <Select.Item label="Business Loan" value="business Loan" />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>

          {/*Purpose of Loan*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Purpose of Loan</FormControl.Label>
            <Select
              selectedValue={loanPurpose}
              minWidth="200"
              accessibilityLabel="Choose Purpose of Loan"
              placeholder="Choose Purpose of Loan"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setLoanPurpose(itemValue)}>
              <Select.Item label="Education" value="education" />
              <Select.Item label="Home Improvement" value="home Improvement" />
              <Select.Item
                label="Debt Consolidation"
                value="debt consolidation"
              />
              <Select.Item label="Medical Expenses" value="medical Expenses" />
              <Select.Item label="Wedding" value="wedding" />
              <Select.Item label="Vacation" value="vacation" />

              <Select.Item
                label="Business Investment"
                value="business investment"
              />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>

          {/*Amount*/}
          <FormControl style={styles.fields}>
            <FormControl.Label>Amount</FormControl.Label>
            <Input
              size="md"
              value={amount}
              placeholder="50 000"
              onChangeText={e => {
                setAmount(e);
              }}
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
                onPress={() => checkPriseOnAction()}>
                <Text style={styles.signUpBtnTxt}>Check Loan</Text>
              </Button>
            </>
          )}
        </View>
        {sellModal()}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default NewLoan;
const styles = StyleSheet.create({
  title: {
    color: 'black',
    textAlign: 'left',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signUpInputArea: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    top: 20,
    padding: 20,
    alignItems: 'center',
    color: 'white',
  },
  signUpBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
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
  fields: {
    marginBottom: 15,
  },
});
