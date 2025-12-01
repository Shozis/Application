import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, View, Text, TouchableOpacity } from "react-native";
import { dataD } from "./types/course.type";
import { createCourse, getCourse, getCourseId } from "./api/controllers/course-controller";
import { navigate } from "expo-router/build/global-state/routing";


type RootStackParamList = {
    CreateCourse: { id?: number };
};

const DesignCourse = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = useState<dataD[]>([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDesign();
    }, []);


    const loadDesign = () => {
        getCourse()
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
    }

    const handleEdit = (item: dataD) => {
        if (item.id) {
            navigation.navigate("CreateData", { id: item.id });
        } else {
            console.log("ошибка, ID не найдены")
        }
    }

    const renderItem = ({ item }: { item: dataD }) => (
        <View>
            <View>
                <Text>имя: {item.name}</Text>
                <Text>Возраст: {item.age}</Text>

                <TouchableOpacity
                    onPress={() => handleEdit(item)}
                >
                    <Text>Изменить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )



    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random.toString()}
            />
        </View>
    )
}

export default DesignCourse;