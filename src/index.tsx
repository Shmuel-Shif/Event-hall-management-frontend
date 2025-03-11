import React from 'react';
import { AppRegistry } from 'react-native-web';
import App from './App';

AppRegistry.registerComponent('EventStaffApp', () => App);

AppRegistry.runApplication('EventStaffApp', {
  initialProps: {},
  rootTag: document.getElementById('root')
}); 