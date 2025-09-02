# NEWFLIXS - News Streaming Platform

A modern React-based news streaming application that aggregates live streams from mainstream international news sources.

## Features

- **Live Streaming**: Watch live news streams from 8 mainstream international news sources
- **Article Scraping**: Automatic fetching and display of latest articles from RSS feeds
- **Modern UI**: Glassmorphism design with smooth animations and responsive layout
- **Search Functionality**: Filter news sources by name
- **Auto-Refresh**: Manual refresh button for latest articles

## News Sources

1. **CNN** (USA)
2. **BBC News** (UK)
3. **Sky News** (UK)
4. **Fox News** (USA)
5. **MSNBC** (USA)
6. **Bloomberg** (USA)
7. **Reuters** (International)
8. **Associated Press** (International)

## Technologies Used

- React 19
- CSS3 with Glassmorphism effects
- RSS Feed integration
- CORS proxy for API calls
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HanadAbdulqadir/Live-news-.git
cd Live-news-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── App.js          # Main React component
├── App.css         # Styling with modern glassmorphism design
├── index.js        # React application entry point
public/
├── index.html      # HTML template
```

## Features in Detail

### Live Streaming
- Embedded live streams from YouTube and Rumble
- Responsive iframes that adjust to screen size
- Error handling for unavailable streams

### Article Integration
- RSS feed parsing for latest articles
- Automatic article fetching on page load
- Manual refresh capability
- Clean article display with titles, descriptions, and dates

### User Interface
- Modern glassmorphism design
- Smooth animations and transitions
- Responsive grid layout
- Mobile-friendly design
- Custom scrollbars and loading states

## Deployment

The app can be deployed to various platforms:

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Run: `npm run deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Acknowledgments

- News organizations for providing live streams and RSS feeds
- React team for the excellent framework
- CSS Tricks for glassmorphism design inspiration
