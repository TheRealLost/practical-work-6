import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitItem from './HabitItem';

const STORAGE_KEY = '@habits';

export default function HabitList({ navigation }) {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHabits = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setHabits(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Ошибка загрузки привычек:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveHabits = async (newHabits) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
            setHabits(newHabits);
        } catch (error) {
            console.error('Ошибка сохранения привычек:', error);
        }
    };

    const toggleHabit = (id) => {
        const updatedHabits = habits.map(habit =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
        );
        saveHabits(updatedHabits);
    };

    useFocusEffect(
        useCallback(() => {
            loadHabits();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {habits.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>Нет привычек</Text>
                    <Text style={styles.emptySubtext}>Нажмите кнопку ниже, чтобы добавить</Text>
                </View>
            ) : (
                <FlatList
                    data={habits}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HabitItem habit={item} onToggle={toggleHabit} />
                    )}
                />
            )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddHabit', { onAdd: loadHabits })}
            >
                <Text style={styles.addButtonText}>+ Добавить привычку</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#bbb',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});