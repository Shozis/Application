import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createData, editDataId, getDataId } from "./api/controllers/common-controller";

// Типы для параметров навигации
type RouteParams = {
    id?: string | number;
};

const CreateData = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Получаем ID из параметров маршрута и преобразуем в число
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('ID from route:', id);
    console.log('Current state - name:', name, 'age:', age);

    useEffect(() => {
        if (id && !isNaN(id)) {
            console.log('Fetching data for ID:', id);

            getDataId(id)
                .then((res) => {
                    console.log('Response from API:', res);
                    console.log('Response data:', res.data);
                    setName(res.data.name || '');
                    setAge(res.data.age?.toString() || '');
                })
                .catch((e) => {
                    console.error('Error fetching data:', e);
                    console.error('Error details:', e.response);
                    Alert.alert('Ошибка', 'Не удалось загрузить данные');
                })
        }
    }, [id]);

    const processingRequest = () => {
        // Валидация
        if (!name.trim()) {
            Alert.alert('Ошибка', 'Введите имя');
            return;
        }

        if (!age || isNaN(Number(age)) || Number(age) <= 0) {
            Alert.alert('Ошибка', 'Введите корректный возраст');
            return;
        }

        const data = {
            name: name.trim(),
            age: Number(age)
        };

        console.log('Sending data:', data);


        // Проверяем, что id существует и является числом
        if (id && !isNaN(id)) {
            // Редактирование существующей записи
            editDataId(id, data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные обновлены',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.goBack()
                            }
                        ]
                    );
                })
                .catch((e) => {
                    console.error('Error updating:', e);
                    console.error('Error response:', e.response);
                    Alert.alert('Ошибка', 'Не удалось обновить данные');
                })
        } else {
            // Создание новой записи
            createData(data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные созданы',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.goBack()
                            }
                        ]
                    );
                })
                .catch((e) => {
                    console.error('Error creating:', e);
                    console.error('Error response:', e.response);
                    Alert.alert('Ошибка', 'Не удалось создать данные');
                })
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                {id ? 'Редактировать запись' : 'Создать новую запись'}
            </Text>

            <Text style={{ marginTop: 16, marginBottom: 8, fontWeight: '600' }}>
                Имя:
            </Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    backgroundColor: '#fff'
                }}
                placeholder="Введите имя"
            />

            <Text style={{ marginTop: 8, marginBottom: 8, fontWeight: '600' }}>
                Возраст:
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 20,
                    backgroundColor: '#fff'
                }}
                placeholder="Введите возраст"
            />

            <TouchableOpacity
                onPress={processingRequest}
                style={{
                    backgroundColor: loading ? '#ccc' : '#4CAF50',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    {loading ? 'Загрузка...' : (id ? 'Редактировать запись' : 'Создать запись')}
                </Text>
            </TouchableOpacity>

            {/* Кнопка назад */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 12
                }}
            >
                <Text style={{ color: '#333', fontWeight: 'bold' }}>
                    Назад
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateData;