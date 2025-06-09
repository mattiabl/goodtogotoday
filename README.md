# GoodToGo.Today 🌤️

A minimalist web app that instantly tells you if it's a good day to go outside based on your local weather and air quality conditions. Get real-time weather data, air quality index, and a daily motivational quote—all in one simple, clean interface.

This project has been done for exploring the capabilities of chatGPT and Claude to develop simple apps.

## ✨ Features

- **Real-time Weather**: Displays current temperature and weather conditions for your exact location
- **Air Quality Index**: Shows AQI levels with easy-to-understand emoji indicators
- **Daily Quotes**: Rotating motivational quotes in English, German, and French
- **Progressive Web App**: Can be installed on mobile devices and works offline
- **Privacy-First**: Location data is only used for weather/AQI lookups and never stored
- **Multilingual**: Automatically detects browser language for quotes (EN/DE/FR)

## 🚀 Live Demo

Currently deployed with [vercel](vercel.com). Visit [GoodToGo.Today](https://goodtogotoday.vercel.app/) to try it out!

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **APIs**: OpenWeatherMap, IQAir
- **Deployment**: Vercel
- **PWA**: Service Worker for offline functionality
- **Monetization**: Google AdSense integration

## 🎨 Customization

### Adding More Languages

Edit `quotes/quotes.json` to add more language codes and translated quotes:

```json
{
  "EN": [...],
  "DE": [...],
  "FR": [...],
  "ES": [
    "Your Spanish quotes here..."
  ]
}
```

### Changing Weather Thresholds

Modify the weather and AQI logic in `script.js` to customize when the app considers conditions "good to go".

### Styling

Update the CSS in `index.html` to match your preferred design aesthetic.

## 🔒 Privacy & Security

- **No Data Storage**: Location data is only used for API calls and never stored
- **Environment Variables**: API keys are securely stored as environment variables
- **CORS Headers**: Proper security headers are configured
- **HTTPS Only**: All API calls use secure HTTPS connections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Air quality data provided by [IQAir](https://www.iqair.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Made with ❤️ for people who want to know if it's a good day to go outside**