# XML Expression Extractor - Web Application

A web-based tool for extracting calculation expressions from XML files and converting them to JSON format. The application specifically removes "cItemData." references from expressions.

![XML Expression Extractor Screenshot](screenshot.png)

## Features

- **Browser-Based**: No server-side processing, works entirely in your browser
- **Extract Expressions**: Parses XML to find calculation expressions
- **Remove Prefixes**: Automatically removes "cItemData." references
- **Format Options**: Choose to include empty expressions and pretty-print JSON
- **Copy & Download**: Easily copy results to clipboard or download as a JSON file
- **Sample Data**: Includes sample XML to demonstrate functionality

## Usage

1. Paste your XML content in the "Input XML" textarea
2. Select desired options:
   - **Include empty expressions**: Include expressions with empty quotes ("")
   - **Pretty-print JSON**: Format the output JSON with indentation
3. Click "Convert to JSON" button
4. View the result in the "Output JSON" textarea
5. Copy to clipboard or download the JSON file

## Deployment

This is a static web application that can be deployed on any static hosting service.

### Option 1: Local Deployment

Simply open the `index.html` file in your web browser.

### Option 2: Web Server Deployment

Upload the following files to your web server:
- `index.html`
- `script.js`

### Option 3: GitHub Pages

1. Create a new repository on GitHub
2. Upload the files to your repository
3. Go to Settings > Pages
4. Select the branch you want to deploy from (e.g., main)
5. Your site will be available at `https://[username].github.io/[repository-name]`

### Option 4: Netlify/Vercel/Cloudflare Pages

1. Connect your GitHub/GitLab/Bitbucket repository to your Netlify/Vercel/Cloudflare Pages account
2. Configure the build settings (not needed for this static site)
3. Deploy

## Development

Want to improve the tool? Here are some ideas:
- Add more conversion options
- Implement error handling for malformed XML
- Add validation for the input XML
- Create themes or dark mode

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Created using:
- HTML5, CSS3, and JavaScript
- Bootstrap 5 for styling 