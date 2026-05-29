import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@habits';

export default function AddHabit({ navigation, route }) {
    const [habitName, setHabitName] = useState('');
    const [loading, setLoading] = useState(false);

    const addHabit = async () => {
        const trimmedName = habitName.trim();

        if (!trimmedName) {
            Alert.alert('Ошибка', 'Введите название привычки');
            return;
        }

        setLoading(true);

        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            const habits = stored ? JSON.parse(stored) : [];

            const newHabit = {
                id: Date.now().toString(),
                name: trimmedName,
                completed: false,
            };

            const updatedHabits = [...habits, newHabit];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHabits));

            Alert.alert('Успех', 'Привычка добавлена', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Ошибка добавления привычки:', error);
            Alert.alert('Ошибка', 'Не удалось добавить привычку');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Название привычки</Text>
            <TextInput
                style={styles.input}
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Например: Пить воду"
                placeholderTextColor="#999"
                maxLength={50}
                editable={!loading}
            />
            <TouchableOpacity
                style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                onPress={addHabit}
                disabled={loading}
            >
                <Text style={styles.saveButtonText}>
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#34C759',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#a5d6a7',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});