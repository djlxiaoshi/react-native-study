/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Home = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Animation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
