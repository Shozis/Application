import { View, TouchableOpacity } from "react-native"

const Cells = () => {

const fieldsCells = () => {
    let cells = [];

    for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
            cells.push(['white', 'grey', 'white', 'grey', 'white', 'grey', 'white', 'grey']);
        } else {
            cells.push(['grey', 'white', 'grey', 'white', 'grey', 'white', 'grey', 'white']);
        }
    }

    return cells;
};

    return <View style={{
            width: 561,
            height: 561.5,
            borderRadius: 0.5,
            margin: 0,
            marginHorizontal: 'auto',
            position: 'relative',
            backgroundColor: '#fff',
            flexDirection: 'column'
        }}
    >
        {fieldsCells().map((row, rowIndex) => (
            <View
                key={`row-${rowIndex}`}
                style={{
                    display: "flex",
                    flexDirection: 'row'
                }}
            >
                {row.map((col, colIndex) => (
                    <View
                        key={`cell-${rowIndex}-${colIndex}`}
                        style={{
                            width: 70,
                            height: 70,
                            backgroundColor: col === 'grey' ? '#808080' : '#fff',
                            borderRadius: '0.5px solid #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                ))}
            </View>
        ))}
    </View>
}

export default Cells;