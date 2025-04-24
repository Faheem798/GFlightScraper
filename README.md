# ✈️ GFlightScraper

![GitHub top language](https://img.shields.io/github/languages/top/Faheem798/GFlightScraper?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/Faheem798/GFlightScraper?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)

> 🧠 An automated flight scraping tool powered by Puppeteer to extract real-time data from Google Flights.

---

## 📦 Features

- 🔍 Customizable flight search (origin, destination, dates)
- 🧭 Headless browser automation using Puppeteer
- 💾 Outputs structured JSON data
- ✈️ Captures airline, duration, price, stops, and more
- 🔐 No API required – scrapes live data directly

---

## 📁 Project Structure

```
GFlightScraper/
├── scraper/         # Core Puppeteer scraping logic
├── fileHandler/     # JSON file handling
├── utils/           # Helper utilities
├── main.js          # Main script
├── package.json     # Project dependencies
└── README.md        # Documentation
```

---

## 🛠️ Installation

```bash
# 1. Clone this repository
git clone https://github.com/Faheem798/GFlightScraper.git

# 2. Move into the project folder
cd GFlightScraper

# 3. Install required packages
npm install
```

---

## 🚀 How to Use

1. ✍️ **Add your Google Flights links** in `utils/data.js` like this:

```js
module.exports = [
  "https://www.google.com/travel/flights/search?tfs=...&tfu=...",
  "https://www.google.com/travel/flights/search?tfs=...&tfu=...",
  // Add more links as needed
];
```

2. ▶️ **Run the script**:

```bash
node main.js
```

3. ✅ **Check your output**:

The scraped data will be saved in the `output/` folder as a `.json` file.

---

## 📄 Sample Output

```json
[
  {
    "airline": "Qatar Airways",
    "price": "$420",
    "departureTime": "02:45 AM",
    "arrivalTime": "10:25 AM",
    "duration": "7h 40m",
    "stops": "1 stop"
  }
]
```

---

## 🧪 Development Tips

- To see browser activity, launch Puppeteer in non-headless mode:

```js
puppeteer.launch({ headless: false });
```

- If selectors stop working, inspect the DOM and update the scraping logic accordingly.

---

## 🤝 Contributing

Contributions are welcome! 🙌

```bash
# Create a new feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add awesome feature"

# Push and create a pull request
git push origin feature/your-feature
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

Made with ❤️ by [Faheem](https://github.com/Faheem798)  
Got questions or suggestions? Open an [issue](https://github.com/Faheem798/GFlightScraper/issues)

---

> ⚠️ Disclaimer: Google Flights may change its layout or block automated access. Use this tool responsibly and for educational purposes only.
