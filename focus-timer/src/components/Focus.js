import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInputField } from './TextInputField';
import { Timer } from './Timer';


export const Focus = () => {
  const insets = useSafeAreaInsets();
  const [subject, setSubject] = useState(null);

  return (
    <View
      style={[
        styles.viewStyle,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 10,
          paddingRight: insets.right,
        },
      ]}>
      <View style={styles.innerView}>
        {!subject ? (
          <>
            <TextInputField setSubject={setSubject} />
          </>
        ) : (
          <Timer subject={subject} setSubject={setSubject} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#75eb0e',
    color: 'black',
    flex: 1,
    justifyContent: 'top',
    width: '100%',
  },
  innerView: {
    width: '90%',
    alignSelf: 'center',
  },
});
