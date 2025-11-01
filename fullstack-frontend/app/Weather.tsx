import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { WeatherDto } from "./types/weather.type"

const Weather = () => {

  const apiKey = 'VLPXDXGSELJA8XEY89AVRDMF5';
  const unitGroup = 'metric';
  const contentType = 'json';
  const includeOptions = 'current,days';

  const [data, setData] = useState<[]>();
  const [location, setLocation] = useState('moscow');

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
    <View>
       <TouchableOpacity 
          onPress={() => setLocation("moscow")}/>
          <TouchableOpacity 
          onPress={() => setLocation("podolsk")}/>
          <TouchableOpacity 
          onPress={() => setLocation("minsk")}/>
      {data ?
        data.map((item: WeatherDto, index) => (
          
          <View key={index} style={{ padding: 20 }}>
            <Text> погода {item.conditions} </Text>
            <Text> погода {item.datetime} </Text>
            <Text> погода {item.sunset} </Text>
            <Text> погода {item.temp} </Text>
          </View>
        ))
        :
        <ActivityIndicator size="large" color="#0000ff" />
      }

    </View>
  );
}



export default Weather;