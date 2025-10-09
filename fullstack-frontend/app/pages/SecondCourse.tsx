import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getData } from "../api/controllers/course-controller";

// Типы для навигации
type RootStackParamList = {
    MainPage: undefined;
    Journal: undefined;
    FirstCourse: undefined;
    CreateData: { id?: number };
};

// Тип для данных
type ApiData = {
    id: number;
    message: string;
};

const MainPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = useState<ApiData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        setError(null);
        getData()
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((e) => {
                console.log(e);
                setError("Не удалось загрузить данные");
            })
            .finally(() => setLoading(false));
    };

    // ... остальной код такой же как выше
};
export default MainPage;