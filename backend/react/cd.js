import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ['oil', 'garlic', 'Shiro', 'fasfaf'] }),
      });

      if (!response.ok) {
        console.error('Error:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native App</Text>
      <TouchableOpacity onPress={handleSearch} style={{ marginTop: 20, padding: 10, backgroundColor: 'skyblue' }}>
        <Text>Search Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
