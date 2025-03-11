import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ברוך הבא!</Text>
      
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">משימות להיום</Text>
            <Text variant="displaySmall">5</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">המשמרת הבאה</Text>
            <Text variant="bodyLarge">16:00 - 23:00</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
}); 