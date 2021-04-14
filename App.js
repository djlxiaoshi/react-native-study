/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import TestPage from './pages/Test';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="red"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{title: 'home test'}}
          />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Test" component={TestPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
