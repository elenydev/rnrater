import React from 'react';
import { View } from '../../components/Themed';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loader = (): JSX.Element => {
  return (
    <View style={styles.activityIndicatorBox}>
      <ActivityIndicator size="large" color='#0000ff"' />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  activityIndicatorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
