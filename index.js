import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('EventStaffApp', () => App);

if (module.hot) {
  module.hot.accept();
}

AppRegistry.runApplication('EventStaffApp', {
  initialProps: {},
  rootTag: document.getElementById('root')
}); 