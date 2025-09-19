import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

function TextInputField({ setSubject }) {
  const [inputData, setInputData] = useState('');
  const handleInputChange = function (text) {
    setInputData(text);
  };
  return (
    <View style={styles.inputField}>
      <TextInput
        label="Focus on what?"
        value={inputData}
        onChangeText={handleInputChange}
      />
      <View style={styles.buttonView}>
        <Button mode="outlined" onPress={() => setSubject(inputData)}>
          FOCUS
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonView: {
    margin: 10,
    backgroundColor:'#dabfe7ff',
    borderRadius:5
  },
});

export { TextInputField };
