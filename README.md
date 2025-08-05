# T&C Shield - Chrome Extension 🛡️

A modern Chrome Extension with glassmorphism UI that automatically analyzes Terms & Conditions and Privacy Policy pages to detect risky clauses and protect users from unfair agreements.

## ✨ Features

### 🎨 Modern Glassmorphism UI

- **Beautiful Design**: Semi-transparent glassmorphism interface with blur effects
- **Rounded Corners**: Modern 16px border radius design
- **Subtle Shadows**: Professional depth with layered box shadows
- **Inter Typography**: Clean, readable Inter font family
- **320px Optimal Width**: Perfect popup size with scrollable content
- **Smooth Animations**: Hover effects and micro-interactions

### 🔍 Smart Risk Analysis

- **Automatic Detection**: Scans webpages for T&C and Privacy Policy content
- **Comprehensive Database**: 200+ risky phrases across multiple categories
- **AI Integration**: Optional Hugging Face models for enhanced analysis
- **Risk Scoring**: 0-100 risk assessment with detailed breakdown
- **Real-time Updates**: Instant analysis without page reload

### 🎯 Visual Risk Indicators

- **Severity Dots**: Color-coded glowing dots (🔴 High, 🟡 Medium, 🔵 Low)
- **Category Icons**: Contextual emojis for different risk types:
  - 🔒 Data Collection & Privacy
  - 👁️ Tracking & Monitoring
  - 📤 Data Sharing
  - 🍪 Cookies & Tracking
  - ⚖️ Legal & Liability
  - 💳 Payment & Financial
  - 📄 Content Rights
- **Hover Tooltips**: Detailed category and severity information
- **Interactive Elements**: Smooth hover effects and scaling animations

## 🚀 Local Installation Guide

### Prerequisites

- Google Chrome browser
- Basic computer knowledge

### Step-by-Step Installation

1. **Download the Extension**

   ```bash
   # If you have git:
   git clone <repository-url>

   # OR download as ZIP and extract to:
   # C:\Users\<username>\Desktop\T&C-ChromeExtension
   ```

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner
   - This allows loading unpacked extensions

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to your extension folder
   - Select the `T&C-ChromeExtension` folder
   - Click "Select Folder"

5. **Verify Installation**
   - T&C Shield icon should appear in your Chrome toolbar
   - If not visible, click the puzzle piece icon (🧩) and pin T&C Shield

### Testing Your Installation

1. **Open Test Page**
   - Navigate to the `test-page.html` file in your extension folder
   - OR visit any Terms & Conditions page online

2. **Use the Extension**
   - Click the T&C Shield icon in your toolbar
   - See the beautiful glassmorphism popup with risk analysis
   - Hover over risk items to see detailed tooltips

## 🏗️ Technical Implementation

### Architecture Overview

```
T&C-ChromeExtension/
├── manifest.json           # Extension configuration (Manifest V3)
├── popup.html             # Modern glassmorphism popup UI
├── popup.css              # Glassmorphism styling with Inter font
├── popup.js               # Risk analysis logic + UI management
├── content.js             # Page content extraction
├── huggingface-analyze.js # AI analysis integration
├── options.html/css/js    # Settings page for API keys
├── icons/                 # Extension icons (16px, 48px, 128px)
├── test-page.html         # Sample T&C page for testing
└── README.md              # This documentation
```

### Key Components

#### 1. Content Script (`content.js`)

```javascript
// Runs on every webpage
// Extracts page text and metadata
// Stores analysis data in Chrome storage
// Triggers automatic analysis on T&C pages
```

#### 2. Popup Interface (`popup.js` + `popup.html` + `popup.css`)

```javascript
// Modern glassmorphism UI with:
// - Semi-transparent backgrounds with backdrop-filter blur
// - Gradient severity dots with glow effects
// - Category-based risk icons with hover tooltips
// - Smooth animations and micro-interactions
// - Scrollable risk list with custom scrollbars
```

#### 3. Risk Analysis Engine (`popup.js`)

```javascript
// Comprehensive keyword database with 200+ phrases
// Categorizes risks into: Data, Tracking, Legal, Financial, Content
// Calculates risk scores with severity weighting
// Provides detailed explanations in plain English
```

#### 4. AI Integration (`huggingface-analyze.js`)

```javascript
// Optional Hugging Face API integration
// Uses legal-bert-tos and legal_tldr models
// Secure API key storage in Chrome storage
// Enhanced analysis for complex legal language
```

#### 5. Settings Page (`options.html/css/js`)

```javascript
// Secure API key management
// Feature toggles for AI analysis
// User preferences and configuration
```

### Risk Detection Algorithm

1. **Text Extraction**: Content script extracts all visible text from webpages
2. **Keyword Matching**: Searches for 200+ predefined risky phrases
3. **Categorization**: Each finding is categorized (Data, Legal, Financial, etc.)
4. **Severity Scoring**: High (10 pts), Medium (5 pts), Low (2 pts) weighting
5. **AI Enhancement**: Optional Hugging Face analysis for complex terms
6. **Visual Rendering**: Results displayed with appropriate icons and colors

### UI Design System

#### Glassmorphism Implementation

```css
.glass-container {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
```

#### Severity Indicators

```css
.severity-dot.high {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
}
```

## 🔐 Security Features

### API Key Management

- **Chrome Storage**: API keys stored securely in Chrome's storage
- **No Hardcoding**: Never commits keys to source code
- **Optional Integration**: Works fully without any API keys
- **Settings Page**: Secure key input through options page

### Privacy Protection

- **Local Processing**: All analysis happens on your device
- **No Data Collection**: Extension doesn't send user data anywhere
- **Optional AI**: AI features require your own API keys
- **Transparent Code**: Fully open source and auditable

## 🧪 Testing & Development

### Manual Testing Checklist

- ✅ Extension loads without errors
- ✅ Glassmorphism UI displays correctly
- ✅ Risk analysis detects problematic phrases
- ✅ Severity dots show correct colors
- ✅ Category icons display appropriately
- ✅ Hover tooltips provide detailed information
- ✅ Scrolling works for long risk lists
- ✅ Settings page accessible and functional

### Adding Custom Risk Keywords

Edit the `riskyKeywords` object in `popup.js`:

```javascript
const riskyKeywords = {
  high: [
    {
      phrase: "your custom risky phrase",
      description: "explanation of why this is risky",
    },
  ],
};
```

### Customizing the UI

- **Colors**: Modify CSS color variables
- **Typography**: Change font family in popup.css
- **Layout**: Adjust spacing and sizing
- **Icons**: Replace category emojis with custom icons
- **Animations**: Modify transition durations and effects

## 🎯 Browser Compatibility

- **Chrome**: Full support (primary target)
- **Chromium-based**: Works with Edge, Brave, Opera
- **Firefox**: Would require Manifest V2 conversion
- **Safari**: Would require Safari extension conversion

## 🔧 Troubleshooting

### Common Issues

**Extension not loading:**

- Ensure Developer mode is enabled
- Check for JavaScript errors in Console
- Verify all required files are present

**No risks detected:**

- Confirm you're on a Terms & Conditions page
- Check if page text is accessible to content script
- Try the refresh button in popup

**UI not displaying correctly:**

- Clear Chrome cache and reload extension
- Check if Inter font is loading properly
- Verify CSS files are not corrupted

**AI features not working:**

- Confirm API keys are entered in settings
- Check browser console for API errors
- Verify internet connection for API calls

## 📈 Performance Optimization

- **Lazy Loading**: AI analysis runs asynchronously
- **Efficient Matching**: Optimized keyword search algorithms
- **Memory Management**: Cleans up resources after analysis
- **Minimal Footprint**: Lightweight extension with fast load times

## 🔮 Future Enhancements

- [ ] Machine learning model for custom risk detection
- [ ] Multi-language support for international T&C documents
- [ ] Export analysis reports as PDF/JSON
- [ ] Browser-wide T&C database with crowdsourced ratings
- [ ] Integration with legal databases and updates
- [ ] Automated notifications for T&C changes

---

**Built with ❤️ for digital privacy and user protection**

_Disclaimer: This tool provides general guidance and should not be considered legal advice. Always consult qualified legal professionals for important agreements._
