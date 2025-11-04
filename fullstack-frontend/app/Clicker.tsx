import { useState } from "react";
import { View, Text, Button } from "react-native";



const Clicker = () => {

    const [data, setData] = useState(0);

    const txt = "that text will done if you will click more times";

    const dotsCount = data > txt.length ? data - txt.length: 0;
    const breakTxt = txt.substring(0, data) + (".".repeat(dotsCount));


    return (
        <View>
            <Button title="click me" onPress={() => setData(data + 1)} />
            <Text>
                нажато: {data} раз
            </Text>
                        <View style={{
                    flexDirection: "row",
                }}>
                    {breakTxt.split(' ').map((word,index) => (
                        <Text 
                            key={index}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            {word}
                        </Text>
                        
                    ))}
                </View>

        </View>
    )
}

export default Clicker;