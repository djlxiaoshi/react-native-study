/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const Home = ({navigation}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Button title="SVG Test" onPress={() => navigation.navigate('About')} />
      <Button title="截屏" onPress={() => navigation.navigate('About')} />
      <Button title="SVG Test" onPress={() => navigation.navigate('About')} />
      <Button title="SVG Test" onPress={() => navigation.navigate('About')} />
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
