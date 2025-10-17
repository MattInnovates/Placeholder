# Image Placeholder Server

[![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Express.js](https://img.shields.io/badge/express.js-%234ea94b.svg?logo=express&logoColor=white)](https://expressjs.com/)

A Node.js server that generates custom placeholder images via URL parameters. Perfect for web development, mockups, and testing when you need placeholder images with specific dimensions and colors.

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Color Formats](#-color-formats)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Live Examples

| Example | URL | Preview |
|---------|-----|---------|
| **Basic** | `/placeholder?size=300x200` | ![Basic](http://localhost:3000/placeholder?size=300x200) |
| **Custom Colors** | `/placeholder?size=300x200&bg=4ecdc4&color=2c3e50` | ![Custom](http://localhost:3000/placeholder?size=300x200&bg=4ecdc4&color=2c3e50) |
| **Custom Text** | `/placeholder?size=300x200&text=Hello%20World&bg=e74c3c&color=white` | ![Text](http://localhost:3000/placeholder?size=300x200&text=Hello%20World&bg=e74c3c&color=white) |

## ✨ Features

- 🎨 **Custom Colors**: Set background and text colors using hex codes or named colors
- 📏 **Any Dimensions**: Generate images from 1x1 to 2000x2000 pixels
- 📝 **Custom Text**: Add your own text or use default dimension display
- 🖼️ **Multiple Formats**: Support for PNG and JPEG formats
- 🚀 **Fast Generation**: Uses Sharp for high-performance image processing
- 🌐 **CORS Enabled**: Ready for cross-origin requests
- 💾 **Caching**: Images are cached for optimal performance

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Generate your first placeholder:**
   Open your browser to: `http://localhost:3000/placeholder?size=400x300&bg=4ecdc4&text=Hello%20World`

## 📖 API Reference

### Basic Usage

```
GET /placeholder?size=WIDTHxHEIGHT
```

### URL Parameters

| Parameter | Description | Example | Default |
|-----------|-------------|---------|---------|
| `size` | Image dimensions (WIDTHxHEIGHT) | `400x300` | `300x200` |
| `bg` or `background` | Background color | `ff6b6b`, `#ff6b6b`, `red` | `#cccccc` |
| `color` or `text` | Text color | `ffffff`, `#ffffff`, `white` | Auto-contrast |
| `text` | Custom text to display | `Hello%20World` | Dimensions |
| `format` | Image format | `png`, `jpg`, `jpeg` | `png` |
| `border` | Show border | `true`, `false` | `true` |

### Example URLs

**Basic placeholder:**
```
/placeholder?size=300x200
```

**Custom colors:**
```
/placeholder?size=400x300&bg=ff6b6b&color=ffffff
```

**Custom text:**
```
/placeholder?size=500x300&text=Hello%20World&bg=4ecdc4
```

**JPEG format:**
```
/placeholder?size=800x600&format=jpg&bg=2c3e50&color=ecf0f1
```

**No border:**
```
/placeholder?size=200x200&bg=e74c3c&border=false
```

### Alternative URL Format

You can also use a shorter format similar to placeholder.com:

```
/WIDTHxHEIGHT?parameters
```

Example:
```
/400x300?bg=blue&text=Sample
```

## 🎨 Color Formats

The server supports multiple color formats:

### Hex Colors
- With hash: `#ff6b6b`
- Without hash: `ff6b6b`

### Named Colors
- `red`, `green`, `blue`
- `black`, `white`, `gray`, `grey`
- `yellow`, `orange`, `purple`, `pink`, `brown`

## 🔥 Examples

### Basic Examples

```html
<!-- Simple 300x200 placeholder -->
<img src="http://localhost:3000/placeholder?size=300x200" alt="Placeholder">

<!-- Custom blue background with white text -->
<img src="http://localhost:3000/placeholder?size=400x300&bg=3498db&color=white" alt="Blue Placeholder">

<!-- Custom text -->
<img src="http://localhost:3000/placeholder?size=500x200&text=Coming%20Soon&bg=e67e22" alt="Coming Soon">
```

### CSS Integration

```css
.hero-banner {
    background-image: url('http://localhost:3000/placeholder?size=1200x400&bg=2c3e50&text=Hero%20Banner&color=ecf0f1');
    background-size: cover;
}

.card-image {
    background: url('http://localhost:3000/placeholder?size=300x200&bg=95a5a6&text=Card%20Image');
}
```

### JavaScript Usage

```javascript
// Generate placeholder URL
function getPlaceholder(width, height, options = {}) {
    const params = new URLSearchParams({
        size: `${width}x${height}`,
        ...options
    });
    return `http://localhost:3000/placeholder?${params}`;
}

// Usage
const imageUrl = getPlaceholder(400, 300, {
    bg: 'e74c3c',
    text: 'Dynamic Image',
    format: 'jpg'
});
```

## Server Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)

### Limits

- Maximum dimensions: 2000x2000 pixels
- Minimum dimensions: 1x1 pixel
- Supported formats: PNG, JPEG

## 💻 Development

### Scripts

- `npm start`: Start the production server
- `npm run dev`: Start development server with auto-reload (requires nodemon)

### Project Structure

```
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🚀 Deployment

The server is ready for deployment to any Node.js hosting platform:

- **Heroku**: Works out of the box
- **Vercel**: Add `vercel.json` configuration
- **Railway**: Direct deployment support
- **DigitalOcean App Platform**: Ready to deploy

### Docker Support

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Health Check

The server provides a health check endpoint at the root path:

```
GET /
```

Returns server information and usage examples.

## Error Handling

The server handles various error conditions:

- Invalid dimensions (falls back to defaults)
- Invalid colors (falls back to defaults)
- Invalid formats (falls back to PNG)
- Server errors (returns 500 with error message)

## Performance

- Images are generated on-demand
- Response includes cache headers for browser caching
- SVG-to-image conversion using Sharp for optimal performance

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

---

**Built with ❤️ using Node.js, Express, and Sharp**