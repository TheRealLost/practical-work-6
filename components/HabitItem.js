import React from 'react';
import { View, Text, Toucha bleOpacity, StyleSheet } from 'react-native';

export default function HabitItem({ habit, onToggle }) {
    return (
        <View style={styles.habitItem}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => onToggle(habit.id)}
            >
                <View style={[styles.checkboxInner, habit.completed && styles.checkboxChecked]} />
            </TouchableOpacity>
            <Text style={[styles.habitName, habit.completed && styles.habitCompleted]}>
                {habit.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    habitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    checkbox: {
        marginRight: 12,
    },
    checkboxInner: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
    },
    habitName: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    habitCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
});