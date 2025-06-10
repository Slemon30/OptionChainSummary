# **Option Chain Scraper and Visualizer**
### 📖 Overview
This project is a web application that scrapes Option Chain data from Groww using BeautifulSoup, a Python library for web scraping. The data is processed and visualized on a user-friendly interface, with additional calculated metrics to enhance data interpretation.

The application is deployed on **Netlify**, making it accessible online.(Link provided below)

### 🚀 Technology Stack
**Frontend:** React + Vite

**Backend:** Flask

**Web Scraping:** BeautifulSoup (Python)

**Hosting:** Netlify (Frontend), Render(Backend)

### 🎯 Features
**Data Scraping:**

- Scrapes real-time Option Chain data from the Groww platform.
- Fetches Call and Put options data with relevant metrics.

**Data Visualization:**

- Displays scraped data in an intuitive tabular format.
- Highlights key information like Open Interest, Price, and more.

**Calculations:**

- Maximum OI at which Strike Price
- Put Call Ratio (based on OI)
- Sum of All Call OI and Put OI
- Sum of Call OI and Put OI for each Strike Price
- Difference between Call OI and Put OI for each Strike Price

### 🌐 Live Demo:
https://optionchainsummarizer.netlify.app/

*Note:(Response on the webiste might take upto 1 minute)*
