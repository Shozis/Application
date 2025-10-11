import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getData, deleteDataId } from "./api/controllers/common-controller";
import { dataMain } from "./types/common.type";

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
        // УБРАЛ ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ - удаляем сразу
        deleteDataId(id)
            .then(() => {
                Alert.alert("Успешно", "Запись удалена");
                loadData(); // Перезагружаем данные
            })
            .catch((e) => {
                console.error(e);
                Alert.alert("Ошибка", "Не удалось удалить запись");
            });
    };

    const handleEdit = (item: dataMain) => {
        if (item.id) {
            navigation.navigate("CreateData", { id: item.id });
        } else {
            Alert.alert('Ошибка', 'ID записи не найден');
        }
    };

    const handleCreate = () => {
        const newItem: dataMain = {
            name: "",
            age: 0,
            id: undefined
        };
        navigation.navigate("CreateData", { id: newItem.id });
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
                    onPress={() => {
                        if (item.id) {
                            handleDelete(item.id); // Удаляем сразу без подтверждения
                        } else {
                            Alert.alert('Ошибка', 'ID записи не найден');
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Нет данных</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyComponent}
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
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    listContainer: {
        paddingBottom: 20,
        flexGrow: 1
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