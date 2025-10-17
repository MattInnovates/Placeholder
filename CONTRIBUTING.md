# Contributing to Image Placeholder Server

Thank you for your interest in contributing to the Image Placeholder Server! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment details (Node.js version, OS)
- Any relevant error messages

### Suggesting Features

We welcome feature suggestions! Please:
- Check if the feature has already been requested
- Open an issue with a detailed description
- Explain the use case and why it would be valuable

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/MattInnovates/image-placeholder-server.git
   cd image-placeholder-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Test your changes**
   - Manually test the placeholder generation
   - Ensure all existing functionality works
   - Test edge cases (invalid dimensions, colors, etc.)

### Pull Request Guidelines

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Keep functions focused and modular

3. **Test thoroughly**
   - Test all parameter combinations
   - Verify image generation works correctly
   - Check error handling

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Follow existing error handling patterns
- Keep lines under 100 characters when possible

### Testing

Currently, the project relies on manual testing. When making changes:

1. Test basic functionality: `http://localhost:3000/placeholder?size=300x200`
2. Test with custom colors: `?size=400x300&bg=ff6b6b&color=ffffff`
3. Test with custom text: `?size=500x300&text=Hello%20World`
4. Test edge cases: invalid sizes, colors, formats
5. Test both PNG and JPEG output formats

### Areas for Contribution

We welcome contributions in these areas:

- **New Features**: Additional image formats, text styling options, image effects
- **Performance**: Caching improvements, optimization
- **Testing**: Unit tests, integration tests, automated testing
- **Documentation**: API examples, tutorials, code comments
- **Bug Fixes**: Any issues you discover
- **Security**: Input validation, security improvements

### Questions?

If you have questions about contributing:
- Open an issue for discussion
- Check existing issues and pull requests
- Review the README for usage examples

Thank you for contributing! 🎉