/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';

const Home = ({navigation}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Button title="About Page" onPress={() => navigation.navigate('About')} />
      <Button title="Test Page" onPress={() => navigation.navigate('Test')} />
      <Button
        title="Animation Page"
        onPress={() => navigation.navigate('Animation')}
      />
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
