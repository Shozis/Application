import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Типы для навигации
type RootStackParamList = {
    MainPage: undefined;
    Journal: undefined;
    FirstCourse: undefined;
    CreateData: { id?: number };
};

const MainPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Journal')}
            >
                <Text style={styles.buttonText}>Journal</Text>
            </TouchableOpacity>
        </View>
    );
}

// Стили остаются такими же...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    button: {
        backgroundColor: '#1976d2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MainPage;