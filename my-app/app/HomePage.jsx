import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DetailsPage', {
      userId: '123',
      userName: 'John Doe'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Перейти на DetailsPage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomePage;