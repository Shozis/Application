import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsPage = ({ route }) => {
    // Безопасное извлечение параметров
    const params = route?.params || {};
    const { userId, userName, itemId } = params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Детальная страница</Text>

            {userId ? (
                <Text>User ID: {userId}</Text>
            ) : (
                <Text>User ID не передан</Text>
            )}

            {userName ? (
                <Text>User Name: {userName}</Text>
            ) : (
                <Text>User Name не передан</Text>
            )}

            {itemId ? (
                <Text>Item ID: {itemId}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default DetailsPage;