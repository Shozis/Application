import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { dataD } from "./types/course.type";
import { getData } from "./api/controllers/course-controller";


type RootStackParamList = {
    CreateData: { id?: number };
};

const DesignCourse = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = useState<dataD[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
    setLoading(true);
    getData()
        .then((response) => {
            console.log(response);
            setData(response.data);
        })
        .catch((e) => {
            console.log(e);
            Alert.alert('Ошибка', 'Не удалось загрузить данные');
        })
        .finally(() => setLoading(false));
        })

    return (
        <View>

        </View>
    )
}

export default DesignCourse;