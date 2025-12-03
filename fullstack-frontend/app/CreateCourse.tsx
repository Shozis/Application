import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { getCourseId } from "./api/controllers/course-controller";
import { Alert } from "react-native";
import { editDataId } from "./api/controllers/common-controller";


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


    useEffect(() => {
        if (id)
            getCourseId(id)
                .then((res) => {
                    setName(res.data.name || '')
                    setAge(res.data.age?.toString() || '')
                })
                .catch((e) => {
                    console.error('Error fetching data:', e);
                    console.error('Error details:', e.response);
                    Alert.alert('Ошибка', 'Не удалось загрузить данные');
                })
    }, [id]);

    const checkReq= () => {
        if (!name.trim()){
            Alert.alert('ошибка', 'введите имя');
            return;
        }
        if(!age || isNaN(Number(age)) || 0 >= Number(age)) {
        Alert.alert('Ошибка', 'Введите корректный возраст');
        return;
        }

        const data = {
            name: name.trim(),
            age: Number(age)
        };

        console.log('Sending data:', data);

        if (id && !isNaN(id)) { 
            editCourse
        }
    }
}

export default CreatrCourse;



