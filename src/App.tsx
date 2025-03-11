import React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';

// הגדר תמיכה בכיוון RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>ברוכים הבאים למערכת ניהול צוות אירועים</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  }
});

export default App; 