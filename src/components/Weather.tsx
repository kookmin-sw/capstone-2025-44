import { useEffect, useState } from "react";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaSmog,
} from "react-icons/fa";

const weatherIconMap: { [key: string]: React.ElementType } = {
  Sunny: FaSun,
  Clear: FaSun,
  PartlyCloudy: FaCloud,
  Cloudy: FaCloud,
  Overcast: FaCloud,
  Rain: FaCloudRain,
  LightRain: FaCloudRain,
  ModerateRain: FaCloudRain,
  HeavyRain: FaCloudRain,
  Snow: FaSnowflake,
  LightSnow: FaSnowflake,
  Thunderstorm: FaBolt,
  Mist: FaSmog,
  Fog: FaSmog,
  Haze: FaSmog,
};

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return (
    <div className="w-full bg-amber-900/20 rounded-xl p-4 border border-amber-800/30 animate-pulse flex flex-col items-center justify-center" style={{ height: '180px' }}>
      <div className="h-6 bg-amber-800/20 rounded w-3/4 mb-3"></div>
      <div className="space-y-2 w-full">
        <div className="h-3 bg-amber-800/20 rounded w-full"></div>
        <div className="h-3 bg-amber-800/20 rounded w-5/6 mx-auto"></div>
      </div>
    </div>
  );

  const weatherText = weather.current.condition.text;
  const Icon = weatherIconMap[weatherText] || FaCloud;

  return (
    <div className="group relative w-full backdrop-blur-sm rounded-xl bg-gradient-to-br from-slate-900 to-amber-900 relative overflow-hidden border border-amber-800/30 hover:border-amber-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 flex flex-col items-center justify-center" style={{ height: '180px' }}>
      <div className={`absolute inset-0 opacity-60 ${
        weatherText.includes("Rain") ? "bg-blue-900/10" :
        weatherText.includes("Snow") ? "bg-blue-100/10" :
        "bg-gradient-to-br from-amber-900/30 to-amber-800/20"
      }`}></div>
      
      <div className="p-4 relative z-10 w-full text-center">
        <div className="p-2 bg-amber-800/20 rounded-full mx-auto mb-3 transition-all duration-300 group-hover:bg-amber-700/30 w-10 h-10 flex items-center justify-center">
          <Icon size={20} className="text-amber-200/90" />
        </div>
        
        <h2 className="text-lg font-semibold text-amber-100 mb-2">정릉3동 날씨</h2>
        
        <div className="space-y-1 text-sm mx-auto max-w-xs">
          <WeatherInfoItem label="상태" value={weatherText} />
          <WeatherInfoItem label="온도" value={`${weather.current.temp_c}°C`} />
          <WeatherInfoItem label="체감" value={`${weather.current.feelslike_c}°C`} />
        </div>
      </div>
    </div>
  );
};

const WeatherInfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-amber-100/80 opacity-80">{label}</span>
    <span className="text-amber-50 font-medium">{value}</span>
  </div>
);

export default Weather;