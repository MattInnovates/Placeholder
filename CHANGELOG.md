# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-17

### Added
- Initial release of Image Placeholder Server
- Custom image generation with configurable dimensions (1x1 to 2000x2000)
- Support for custom background and text colors (hex and named colors)
- Custom text overlay functionality
- Multiple output formats (PNG, JPEG)
- Optional border rendering
- CORS support for cross-origin requests
- Automatic text color contrast calculation
- Comprehensive API documentation
- Health check endpoint
- Caching headers for optimal performance
- Alternative URL format support (/:dimensions)

### Technical Features
- Express.js server framework
- Sharp library for high-performance image processing
- SVG-based image generation
- Input validation and sanitization
- Error handling and fallbacks
- MIT license