import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Button, Image } from "react-native";
import { WeatherDto } from "./types/weather.type"
import { Colors } from "react-native/Libraries/NewAppScreen";

const Weather = () => {

  const apiKey = 'VLPXDXGSELJA8XEY89AVRDMF5';
  const unitGroup = 'metric';
  const contentType = 'json';
  const includeOptions = 'current,days';

  const [data, setData] = useState<[]>();
  const [location, setLocation] = useState('moscow');

  const getDayOfWeek = (date = new Date()) => {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
  };

  console.log(getDayOfWeek(new Date('2024-01-01')));

  const weatherIcons = (conditions: string) =>{
  switch (conditions) {
    case "Partially cloudy":
      return <Image
        source={require('../assets/images/PartiallyCloudy.png')}
        style={{ width: 50, height: 50 }}
      />;
      case "Rain":
        return <Image
        source={require('../assets/images/Rain.png')}
        style={{ width: 50, height: 50 }}
      />;
      case "Overcast":
        return <Image
        source={require('../assets/images/Overcast.png')}
        style={{ width: 50, height: 50 }}
      />;
      case "Rain, Partially cloudy":
        return <Image
        source={require('../assets/images/RainPartiallyCloudy.svg')}
        style={{ width: 50, height: 50 }}
      />;
      case "Rain, Overcast":
        return <Image
        source={require('../assets/images/RainOvercast.svg')}
        style={{ width: 50, height: 50 }}
      />;
      }
      
  }

  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&include=${includeOptions}&contentType=${contentType}&key=${apiKey}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Forecast days:', data.days);
        setData(data.days)
      })
      .catch(async errorResponse => {
        if (errorResponse.text) {
          const errorMessage = await errorResponse.text();
          console.error('Error message:', errorMessage);
        } else {
          console.error('Error occurred:', errorResponse);
        }
      });
  }, [location]);
  return (
    <View
      style={{
        display: "flex",
      }}
    >
      <View  
        style={{
          display: "flex",
          margin: 50,
          flexDirection: "row",
        }}
      >
        <Button title="moskow" onPress={() => setLocation("moscow")} />
        <Button title="podolsk" onPress={() => setLocation("podolsk")} />
        <Button title="minsk" onPress={() => setLocation("minsk")} />
      </View>
      <View style={{
        flexWrap:"wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        {data ?
          data.map((item: WeatherDto, index) => (

            <View key={index} style={{
              padding: 20,
            }}>
              <Text> {weatherIcons(item.conditions)} </Text>
              <Text style={{
                fontWeight: "bold"
              }}> {(getDayOfWeek(new Date(item.datetime)))} </Text>
              <Text> время {item.sunset} </Text>
              <Text style={{color: "blue",fontWeight: "bold", fontSize: 20 }}> {item.temp} °C </Text>
            </View>
          ))
          :
          <ActivityIndicator size="large" color="#0000ff" />
        }
      </View>
    </View>
  );
}



export default Weather;