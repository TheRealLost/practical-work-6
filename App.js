import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitList from './components/HabitList';
import AddHabit from './components/AddHabit';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HabitList">
                <Stack.Screen
                    name="HabitList"
                    component={HabitList}
                    options={{ title: 'Мои привычки' }}
                />
                <Stack.Screen
                    name="AddHabit"
                    component={AddHabit}
                    options={{ title: 'Добавить привычку' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}