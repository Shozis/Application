import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getData, deleteDataId } from "../api/controllers/common-controller";
import { dataMain } from "../types/common.type";

// Определяем типы для навигации
type RootStackParamList = {
    CreateData: { id?: number };
};

const FirstCourse = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = useState<dataMain[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
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
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            "Подтверждение удаления",
            "Вы уверены, что хотите удалить эту запись?",
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: "destructive",
                    onPress: () => {
                        deleteDataId(id)
                            .then(() => {
                                Alert.alert("Успешно", "Запись удалена");
                                loadData();
                            })
                            .catch((e) => {
                                console.error(e);
                                Alert.alert("Ошибка", "Не удалось удалить запись");
                            });
                    }
                }
            ]
        );
    };

    const handleEdit = (item: dataMain) => {
        navigation.navigate("CreateData", { id: item.id });
    };

    const handleCreate = () => {
        navigation.navigate("CreateData");
    };

    const renderItem = ({ item }: { item: dataMain }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Text style={styles.text}>Имя: {item.name}</Text>
                <Text style={styles.text}>Возраст: {item.age}</Text>
                
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.buttonText}>Изменить</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(Number(item.id))}
                >
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreate}
            >
                <Text style={styles.createButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingBottom: 20
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemContent: {
        padding: 16,
        width: '100%'
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333'
    },
    button: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 8
    },
    editButton: {
        backgroundColor: '#17a2b8',
    },
    deleteButton: {
        backgroundColor: '#ffc107',
        borderWidth: 1,
        borderColor: '#ffc107'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    createButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    createButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default FirstCourse;