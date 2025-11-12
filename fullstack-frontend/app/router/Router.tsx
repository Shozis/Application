// App.tsx
import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../pages/MainPage';
import Journal from '../Journal';
import FirstCourse from '../FirstCourse';
import CreateData from '../CreateData';
import Weather from '../Weather';
import Clicker from '../Clicker';
import Checkers from '../Сheckers';

// Типы для навигации
export type RootStackParamList = {
  MainPage: undefined;
  Journal: undefined;
  FirstCourse: undefined;
  CreateData: { id?: number };
  Weather: undefined;
  Clicker: undefined;
  Checkers: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{ title: 'Главная страница' }} />
      <Stack.Screen
        name="Journal"
        component={Journal}
        options={{ title: 'Журнал' }} />
      <Stack.Screen
        name="FirstCourse"
        component={FirstCourse}
        options={{ title: '1 курс' }} />
      <Stack.Screen
        name="CreateData"
        component={CreateData}
        options={{ title: 'Создание/Редактирование' }} />
      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{ title: 'погода' }} />
      <Stack.Screen
        name="Clicker"
        component={Clicker}
        options={{ title: 'кликер' }} />
      <Stack.Screen
        name="Checkers"
        component={Checkers}
        options={{ title: 'шашки' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;