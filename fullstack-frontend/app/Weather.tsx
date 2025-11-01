import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WeatherDto } from "./types/weather.type";

const Weather = () => {

  const apiKey = 'VLPXDXGSELJA8XEY89AVRDMF5';
  const location = 'moscow';
  const unitGroup = 'metric';
  const contentType = 'json';
  const includeOptions = 'current,days';

  const [data, setData] = useState<[]>();


  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&include=${includeOptions}&contentType=${contentType}&key=${apiKey}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Weather Data:', data);
        // Теперь здесь будут доступны все данные:
        console.log('Current temp:', data.currentConditions.temp);
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
  }, []);

  return (
    <View>
      {data ?
        data.map((item:WeatherDto, index) => (
          <View key={index} style={{padding: 20}}>
            <Text>Дата: {item.datetime}</Text>
            <Text>Температура: {item.temp}°C</Text>
            <Text>Погода: {item.conditions}</Text>
          </View>
        ))
        :
        null
      }
      <TouchableOpacity>
        {/* <Text>
        {Data}
        </Text> */}
      </TouchableOpacity>
    </View>
  );
}

export default Weather;