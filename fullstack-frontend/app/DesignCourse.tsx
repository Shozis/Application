import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import { dataD } from "./types/course.type";
import { createCourse, getCourse, getCourseId } from "./api/controllers/course-controller";


type RootStackParamList = {
    CreateData: { id?: number };
};

const DesignCourse = () => {
    // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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

    const qwer = () => {
        const data = {
            name: "n",
            age: 4
        }

        createCourse(data)
    }

    return (
        <View>
            <Button title="click" onPress={qwer}/>
        </View>
    )
}

export default DesignCourse;