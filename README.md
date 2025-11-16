<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
</div>

<h1 align="center">📚 Flashcard Learning Web App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status">
</p>

<p align="center">
  <strong>A modern, responsive flashcard learning application with intelligent spaced repetition system</strong>
</p>

<p align="center">
  Built with pure HTML, CSS, and JavaScript - no backend required!
</p>

---

## 🎯 Features Overview

### 🎨 **Beautiful & Intuitive Interface**
- **Modern Design**: Clean, minimalist interface with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Layout**: Perfectly optimized for desktop, tablet, and mobile
- **3D Card Flips**: Engaging flip animations for better learning experience

### 🧠 **Smart Learning System**
- **Spaced Repetition**: SM-2 algorithm optimizes review timing
- **Performance Tracking**: Monitor accuracy, streaks, and progress
- **Intelligent Scheduling**: Cards appear when you're most likely to remember them
- **Quality Ratings**: Rate cards as Again, Hard, Good, or Easy

### 📊 **Comprehensive Analytics**
- **Statistics Dashboard**: Visual representation of learning progress
- **Study Streaks**: Track consecutive days of learning
- **Accuracy Metrics**: Monitor success rates across all decks
- **Activity Timeline**: Recent study sessions and achievements

### 🛠️ **Powerful Management Tools**
- **Deck Organization**: Create, edit, and delete flashcard decks
- **Card Management**: Add unlimited cards with front/back content
- **Search & Filter**: Quickly find specific decks or cards
- **Import/Export**: Backup and restore your learning data

---

## 🖼️ Screenshots

### 📱 Mobile Experience
```
┌─────────────────────┐
│ 📚 Flashcard Learner │  ← Clean header with navigation
├─────────────────────┤
│ ┌─────────────────┐ │
│ │   Study Deck    │ │  ← Deck cards with stats
│ │   15 cards      │ │
│ │   3 due today   │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │  JavaScript     │ │
│ │   42 cards      │ │
│ │   8 due today   │ │
│ └─────────────────┘ │
├─────────────────────┤
│ ➕ Create Deck      │  ← Action buttons
└─────────────────────┘
```

### 💻 Desktop Study Session
```
┌─────────────────────────────────────────────────────────────┐
│ 📚 Flashcard Learner    🔍 📊 📥 📥 🌙                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  ← Back to Decks    Progress: 3/10          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              What is JavaScript?                     │   │
│  │                                                     │   │
│  │              (Click to flip)                         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│     🔴 Again  🟡 Hard  🔵 Good  🟢 Easy                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 📊 Statistics Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 Learning Statistics                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📖 Total Cards    ✅ Studied Today    ⚡ Current Streak    │
│       127               23                 5 days          │
│                                                             │
│  🎯 Accuracy        📈 Recent Activity                     │
│     87.5%          • Studied "JavaScript" - Today          │
│                     • Studied "HTML Basics" - Yesterday    │
│                     • Created new deck "CSS" - 2 days ago  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 📋 Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No installation required - runs entirely in browser

### 🎮 Getting Started
1. **Clone or Download** this repository
2. **Open `index.html`** in your web browser
3. **Start Learning** with the included sample deck
4. **Create Your Own** decks and cards

### 📱 First Steps
```
1. Open the app → See sample deck
2. Click "Study Deck" → Start learning
3. Click card to flip → See answer
4. Rate your recall → Schedule next review
5. Create new deck → Add your own content
```

## 📁 Project Structure

```
FlashCard-Learning-App/
├── 📄 index.html          # Main HTML structure & UI
├── 🎨 styles.css          # Custom CSS & animations
├── ⚡ app.js             # Core JavaScript logic
├── 📖 README.md          # Documentation (this file)
└── 📜 LICENSE            # MIT License
```

---

## 🎮 How to Use

### 🏁 Getting Started
```bash
# Clone the repository
git clone https://github.com/yourusername/FlashCard-Learning-App.git

# Navigate to the project
cd FlashCard-Learning-App

# Open in browser (no build process needed!)
open index.html
```

### 📚 Creating Your First Deck
1. **Click** "Create Deck" button
2. **Enter** deck name and description
3. **Save** to create your deck
4. **Add cards** to start building your knowledge base

### 🃏 Adding Flashcards
1. **Select** a deck to study
2. **Click** "Add Card" button
3. **Enter** front (question) and back (answer)
4. **Save** to add the card to your deck

### 🎯 Study Session Flow
```
👆 Click Deck → 📖 Start Study → 🔄 Flip Card → 🎯 Rate Recall → ⏭️ Next Card
```

### 🧠 Spaced Repetition System

The app implements the **SM-2 algorithm** with intelligent scheduling:

| Rating | Button | Interval Change | When to Use |
|--------|--------|----------------|-------------|
| 🔴 **Again** | Reset | Review tomorrow | Complete blackout |
| 🟡 **Hard** | +20% | Slightly longer | Remembered with difficulty |
| 🔵 **Good** | Normal | Standard progression | Remembered correctly |
| 🟢 **Easy** | +50% | Much longer | Too easy, knew instantly |

---

## 🏗️ Technical Architecture

### 🧩 Core Components

#### 🃏 Card Class
```javascript
class Card {
    constructor(front, back, id = null)
    updateReview(quality)  // SM-2 algorithm
    isDue()               // Check review status
    getAccuracy()         // Success rate calculation
}
```

#### 📦 Deck Class
```javascript
class Deck {
    constructor(name, description, id)
    addCard(front, back)  // Card management
    getDueCards()         // Review scheduling
    getStats()           // Analytics
}
```

#### 🎮 FlashcardApp Class
Main application controller:
- 🎨 UI state management
- 💾 Local storage operations
- 🎯 Event handling
- 📊 Statistics tracking
- 📥📤 Import/Export functionality

### 🧠 Spaced Repetition Algorithm

**SM-2 Implementation Features:**
- ⚡ Dynamic ease factor adjustment
- 📈 Intelligent interval calculation
- 📅 Automatic review scheduling
- 📊 Performance tracking per card

**Algorithm Flow:**
```
Card Review → Quality Rating → Update Ease Factor → Calculate Interval → Schedule Next Review
```

### 💾 Data Persistence

**Local Storage Features:**
- 🔄 Automatic saving after changes
- 📋 JSON format for portability
- 🎯 Sample deck for new users
- 🔒 No backend required

### 📱 Responsive Design

**Mobile-First Approach:**
- 📱 Touch-optimized interactions
- 🎨 TailwindCSS utility classes
- 📐 Flexible grid layouts
- 🌙 Dark mode support

---

## 🌟 Advanced Features

### 🔍 Search & Filter
- **Real-time search** across deck names and descriptions
- **Instant filtering** as you type
- **Case-insensitive** matching

### 📥📤 Import/Export
- **JSON format** for maximum compatibility
- **Complete data preservation** including SRS progress
- **Backup and restore** functionality
- **Cross-device sync** capability

### 📊 Analytics Dashboard
- **Visual statistics** with colorful indicators
- **Progress tracking** over time
- **Study streaks** motivation system
- **Activity timeline** for recent sessions

---

## 🎨 Customization Guide

### 🎨 Theming
```css
/* Custom colors in styles.css */
:root {
    --primary-color: #3b82f6;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
}
```

### ⚙️ SRS Parameters
```javascript
// Adjust in app.js - Card class
this.easeFactor = 2.5;  // Initial difficulty
this.interval = 1;      // Starting interval
```

### 🎯 Adding Features
- Extend `Card` class for new properties
- Add new views to `index.html`
- Implement handlers in `FlashcardApp` class

## Technical Implementation

### Core Classes

#### Card Class
```javascript
class Card {
    constructor(front, back, id = null)
    updateReview(quality)  // SM-2 algorithm implementation
    isDue()               // Check if card needs review
    getAccuracy()         // Calculate success rate
}
```

#### Deck Class
```javascript
class Deck {
    constructor(name, description = '', id = null)
    addCard(front, back)  // Add new card to deck
    getDueCards()         // Get cards ready for review
    getStats()           // Calculate deck statistics
}
```

#### FlashcardApp Class
Main application controller handling:
- UI state management
- Local storage operations
- Event handling
- Statistics tracking
- Import/export functionality

### Spaced Repetition Algorithm
Implements the SM-2 algorithm with:
- Ease factor adjustment based on performance
- Dynamic interval calculation
- Automatic scheduling of next reviews
- Performance tracking for each card

### Data Persistence
- Uses browser's localStorage
- Automatic saving after any changes
- JSON format for easy import/export
- Sample deck creation for first-time users

### Responsive Design
- TailwindCSS for utility-first styling
- Mobile-optimized touch interactions
- Flexible grid layouts
- Dark mode support with system preference detection

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| 🌐 Chrome | 60+ | ✅ Fully Supported |
| 🦊 Firefox | 55+ | ✅ Fully Supported |
| 🧭 Safari | 12+ | ✅ Fully Supported |
| 📱 Edge | 79+ | ✅ Fully Supported |

---

## 🛠️ Development

### 🏠 Local Development
```bash
# No build process required!
# Simply open the file in your browser:

# Method 1: Direct file open
open index.html

# Method 2: Live server (recommended for development)
npx serve .
# Then visit http://localhost:3000
```

### 🎨 Customization Options

#### 🎨 Visual Customization
```css
/* Edit styles.css for custom themes */
.deck-card {
    /* Custom card styling */
}

.flashcard {
    /* Custom flashcard appearance */
}
```

#### ⚙️ Algorithm Tuning
```javascript
// Edit app.js - Card class constructor
this.easeFactor = 2.5;  // Adjust initial difficulty
this.interval = 1;      // Modify starting interval
```

#### 🔧 Feature Extensions
- **New Card Types**: Extend `Card` class
- **Additional Views**: Add sections to `index.html`
- **Enhanced Analytics**: Expand `getStats()` methods
- **Custom Animations**: Modify CSS keyframes

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Issues
- Use the GitHub Issues tab
- Include browser and OS information
- Provide steps to reproduce
- Add screenshots if applicable

### 💡 Feature Requests
- Describe the feature clearly
- Explain the use case
- Suggest implementation approach
- Consider mobile compatibility

### 🔧 Pull Requests
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📋 License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Liability and warranty disclaimed

---

## 🙏 Acknowledgments

- **SM-2 Algorithm**: Originally developed by Dr. Piotr Wozniak
- **TailwindCSS**: For providing excellent utility classes
- **MDN Web Docs**: For comprehensive web development references
- **Open Source Community**: For inspiration and best practices

---

## 👨‍💻 Author & Credits

**Created with ❤️ by [Ramkrishna](https://github.com/ramkrishna-dev)**

<div align="center">

### 📧 Contact Information
- **GitHub**: [ramkrishna-dev](https://github.com/ramkrishna-dev)
- **Email**: [ramkrishnaspace@gmail.com](mailto:ramkrishnaspace@gmail.com)

### 🌟 About the Developer
Passionate about creating educational tools that make learning more effective and enjoyable. Specializing in modern web technologies and user experience design.

---

<div align="center">

### 🎉 Happy Learning! 🎉

Made with ❤️ by [Ramkrishna](https://github.com/ramkrishna-dev) for learners everywhere

[⬆️ Back to Top](#-flashcard-learning-web-app)

</div>

---

## 📞 Support & Contact

### 💬 Get Help
- 📋 Check this README first
- 🔍 Search existing issues
- 💬 Create new issue if needed
- 📧 Contact: [your-email@example.com]

### 🌟 Show Your Support
- ⭐ Star this repository
- 🔄 Share with others
- 🐛 Report issues
- 💡 Suggest improvements

---

<div align="center">

### 🎉 Happy Learning! 🎉

Made with ❤️ for learners everywhere

[⬆️ Back to Top](#-flashcard-learning-web-app)

</div>