const express = require('express');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Helper function to parse color and convert to RGB
function parseColor(color, defaultColor = '#cccccc') {
  if (!color) return defaultColor;
  
  // Handle hex colors without #
  if (/^[0-9A-Fa-f]{6}$/.test(color)) {
    return '#' + color;
  }
  
  // Handle hex colors with #
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color;
  }
  
  // Handle named colors (basic set)
  const namedColors = {
    'red': '#ff0000',
    'green': '#00ff00',
    'blue': '#0000ff',
    'black': '#000000',
    'white': '#ffffff',
    'gray': '#808080',
    'grey': '#808080',
    'yellow': '#ffff00',
    'orange': '#ffa500',
    'purple': '#800080',
    'pink': '#ffc0cb',
    'brown': '#a52a2a'
  };
  
  return namedColors[color.toLowerCase()] || defaultColor;
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 204, g: 204, b: 204 };
}

// Helper function to get contrasting text color
function getContrastColor(backgroundColor) {
  const rgb = hexToRgb(backgroundColor);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

// Helper function to create SVG text
function createSvgText(text, width, height, textColor) {
  const fontSize = Math.min(width / 8, height / 4, 48);
  return `<text x="50%" y="50%" 
           font-family="Arial, sans-serif" 
           font-size="${fontSize}" 
           fill="${textColor}" 
           text-anchor="middle" 
           dominant-baseline="middle">${text}</text>`;
}

// Main placeholder route
app.get('/placeholder', async (req, res) => {
  try {
    // Parse dimensions
    const dimensions = req.query.size || '300x200';
    const [widthStr, heightStr] = dimensions.split('x');
    const width = Math.min(Math.max(parseInt(widthStr) || 300, 1), 2000);
    const height = Math.min(Math.max(parseInt(heightStr) || 200, 1), 2000);
    
    // Parse colors
    const backgroundColor = parseColor(req.query.bg || req.query.background, '#cccccc');
    const textColor = parseColor(req.query.color || req.query.text, getContrastColor(backgroundColor));
    
    // Parse text
    const text = req.query.text || `${width}×${height}`;
    
    // Parse format
    const format = (req.query.format || 'png').toLowerCase();
    const validFormats = ['png', 'jpg', 'jpeg'];
    const imageFormat = validFormats.includes(format) ? format : 'png';
    
    // Convert background color to RGB for Sharp
    const bgRgb = hexToRgb(backgroundColor);
    
    // Create SVG
    const border = req.query.border !== 'false' ? 
      `<rect x="1" y="1" width="${width-2}" height="${height-2}" fill="none" stroke="${textColor}" stroke-width="2"/>` : '';
    
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
        ${border}
        ${createSvgText(text, width, height, textColor)}
      </svg>
    `;
    
    // Convert SVG to image using Sharp
    let image = sharp(Buffer.from(svg));
    
    if (imageFormat === 'jpg' || imageFormat === 'jpeg') {
      image = image.jpeg({ quality: 80 });
    } else {
      image = image.png();
    }
    
    const buffer = await image.toBuffer();
    
    // Set response headers
    res.setHeader('Content-Type', `image/${imageFormat === 'jpg' ? 'jpeg' : imageFormat}`);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Send image
    res.send(buffer);
    
  } catch (error) {
    console.error('Error generating placeholder:', error);
    res.status(500).json({ error: 'Failed to generate placeholder image' });
  }
});

// Alternative route format (like placeholder.com)
app.get('/:dimensions', (req, res) => {
  // Redirect to main placeholder route with dimensions
  const dimensions = req.params.dimensions;
  const queryString = new URLSearchParams(req.query).toString();
  const redirectUrl = `/placeholder?size=${dimensions}${queryString ? '&' + queryString : ''}`;
  res.redirect(redirectUrl);
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Image Placeholder Server',
    version: '1.0.0',
    usage: {
      basic: '/placeholder?size=300x200',
      withColors: '/placeholder?size=400x300&bg=ff6b6b&color=ffffff',
      withText: '/placeholder?size=500x300&text=Hello%20World&bg=4ecdc4',
      shortFormat: '/300x200?bg=red&text=Sample'
    },
    parameters: {
      size: 'Dimensions in WIDTHxHEIGHT format (max 2000x2000)',
      bg: 'Background color (hex without #, hex with #, or named color)',
      color: 'Text color (hex without #, hex with #, or named color)',
      text: 'Custom text to display (URL encoded)',
      format: 'Image format: png, jpg, jpeg (default: png)',
      border: 'Show border: true/false (default: true)'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Image Placeholder Server running on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/placeholder?size=400x300&bg=4ecdc4&text=Hello%20World`);
});