import { View, TouchableOpacity } from "react-native"

const Cells = () => {

    const arr = [];

    for (let i = 1; i <= 63 ; i++) {
        arr[i] = i
    }
    return <View style={{
        width: 400,
        display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
    }}>
        {arr.map((arr, item) => (
            <View
            style={{
        justifyContent: "flex-end",
        width:20,
        padding: 20,
        borderWidth: 1, 
        backgroundColor: item % 2 !== 0 ? "black" : "white",
        color: item % 2 !== 0 ? "white" : "black",
    }}

            >
                {arr}
            </View>
        ))}
    </View>
}

export default Cells;