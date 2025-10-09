// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../pages/MainPage';
import Journal from '../pages/Journal';
import FirstCourse from '../pages/FirstCourse';
import CreateData from '../components/change-data/CreateData';

// Типы для навигации
export type RootStackParamList = {
  MainPage: undefined;
  Journal: undefined;
  FirstCourse: undefined;
  CreateData: { id?: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen 
          name="MainPage" 
          component={MainPage}
          options={{ title: 'Главная страница' }}
        />
        <Stack.Screen 
          name="Journal" 
          component={Journal}
          options={{ title: 'Журнал' }}
        />
        <Stack.Screen 
          name="FirstCourse" 
          component={FirstCourse}
          options={{ title: '1 курс' }}
        />
        <Stack.Screen 
          name="CreateData" 
          component={CreateData}
          options={{ title: 'Создание/Редактирование' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;