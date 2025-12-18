import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { createCourse, editCourseId, getCourseId } from "./api/controllers/course-controller";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";



type IdParams = {
    id?: string | number;
}


const CreatrCourse = () => {
    const navigate = useNavigation();
    const route = useRoute();

    const params = route.params as IdParams;
    const id = params?.id ? Number(params.id) : undefined;

    const [name, setName] = useState('');
    const [age, setAge] = useState('');


    console.log('ID from route:', id);
    console.log('Current state - name:', name, 'age:', age);


    useEffect(() => {
        if (id) {
            console.log('Fetching data for ID:', id);

            getCourseId(id)
                .then((res) => {
                    console.log('Response from API:', res);
                    console.log('Response data:', res.data);
                    setName(res.data.name || '')
                    setAge(res.data.age?.toString() || '')
                })
                .catch((e) => {
                    console.error('Error fetching data:', e);
                    console.error('Error details:', e.response);
                    Alert.alert('Ошибка', 'Не удалось загрузить данные');
                })
            }
    }, [id]);

    const checkReq = () => {
        if (!name.trim()) {
            Alert.alert('ошибка', 'введите имя');
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

        if (id && !isNaN(id)) {
            editCourseId(id, data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные обновлены',
                        [
                            {
                                text: 'ok',
                                onPress: () => navigate.goBack()
                            }
                        ]
                    );

                    // navigate(-1)
                })
                .catch((e) => {
                    console.error('Error updating:', e);
                    console.error('Error response:', e.response);
                    Alert.alert('Ошибка', 'Не удалось обновить данные');
                })
        } else {
            createCourse(data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные созданы',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigate.goBack()
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
    }

    return (
        <View>
            <Text>
                {id ? 'Редактировать запись' : 'Создать новую запись'}
            </Text>
            <Text>
                name:
            </Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Text>
                age:
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
            />

            <TouchableOpacity
                onPress={checkReq}>
                <Text>
                    {id ? 'Редактировать запись' : 'Создать запись'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigate.goBack()}
            >
                <Text>
                    Назад
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreatrCourse;