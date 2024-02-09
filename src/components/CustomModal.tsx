import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const CustomModal = (props: any) => {
  const [modalData, setModalData] = useState<any>('');
  useEffect(() => {
    setModalData(props.data);
    console.log('data : ', modalData);
  }, [modalData, props.data]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalState}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.onClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>tt</Text>
            <View style={styles.btnArea}>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.cancelButton]}
                onPress={() => props.onClose()}>
                <Text style={styles.cancelBtnTextStyle}>Hide Modal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.submitButton]}
                onPress={() => props.onClose()}>
                <Text style={styles.submitBtnTextStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#242534',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnArea: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    color: 'white',
    backgroundColor: 'gray',
  },
  submitButton: {
    color: 'black',
    backgroundColor: '#0ee10e',
  },
  cancelBtnTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitBtnTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
});
