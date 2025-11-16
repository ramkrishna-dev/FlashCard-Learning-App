// Flashcard Learning App - Main JavaScript File

class Card {
    constructor(front, back, id = null) {
        this.id = id || this.generateId();
        this.front = front;
        this.back = back;
        this.createdAt = new Date().toISOString();
        this.lastReviewed = null;
        this.reviewCount = 0;
        this.successCount = 0;
        
        // Spaced Repetition System (SRS) properties
        this.easeFactor = 2.5; // Initial ease factor
        this.interval = 1; // Days until next review
        this.repetitions = 0; // Number of successful repetitions
        this.nextReview = new Date().toISOString(); // Next review date
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    updateReview(quality) {
        // Quality: 0=Again, 1=Hard, 2=Good, 3=Easy
        this.lastReviewed = new Date().toISOString();
        this.reviewCount++;
        
        if (quality >= 2) {
            this.successCount++;
        }

        // SM-2 Algorithm for spaced repetition
        let easeFactor = this.easeFactor;
        let interval = this.interval;
        let repetitions = this.repetitions;

        if (quality >= 3) {
            // Easy response
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * easeFactor);
            }
            repetitions++;
        } else if (quality === 2) {
            // Good response
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 4;
            } else {
                interval = Math.round(interval * easeFactor);
            }
            repetitions++;
        } else if (quality === 1) {
            // Hard response
            interval = Math.max(1, Math.round(interval * 1.2));
            repetitions++;
        } else {
            // Again response
            interval = 1;
            repetitions = 0;
        }

        // Update ease factor
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        easeFactor = Math.max(1.3, easeFactor);

        this.easeFactor = easeFactor;
        this.interval = interval;
        this.repetitions = repetitions;
        
        // Calculate next review date
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + interval);
        this.nextReview = nextReviewDate.toISOString();
    }

    isDue() {
        return new Date(this.nextReview) <= new Date();
    }

    getAccuracy() {
        return this.reviewCount > 0 ? (this.successCount / this.reviewCount) * 100 : 0;
    }
}

class Deck {
    constructor(name, description = '', id = null) {
        this.id = id || this.generateId();
        this.name = name;
        this.description = description;
        this.cards = [];
        this.createdAt = new Date().toISOString();
        this.lastStudied = null;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addCard(front, back) {
        const card = new Card(front, back);
        this.cards.push(card);
        return card;
    }

    removeCard(cardId) {
        this.cards = this.cards.filter(card => card.id !== cardId);
    }

    getCard(cardId) {
        return this.cards.find(card => card.id === cardId);
    }

    getDueCards() {
        return this.cards.filter(card => card.isDue());
    }

    getCardCount() {
        return this.cards.length;
    }

    getDueCount() {
        return this.getDueCards().length;
    }

    getNewCount() {
        return this.cards.filter(card => card.reviewCount === 0).length;
    }

    getLearningCount() {
        return this.cards.filter(card => card.reviewCount > 0 && card.repetitions < 3).length;
    }

    getReviewCount() {
        return this.cards.filter(card => card.repetitions >= 3).length;
    }

    updateLastStudied() {
        this.lastStudied = new Date().toISOString();
    }

    getStats() {
        const totalCards = this.cards.length;
        const dueCards = this.getDueCount();
        const newCards = this.getNewCount();
        const learningCards = this.getLearningCount();
        const reviewCards = this.getReviewCount();
        
        let totalAccuracy = 0;
        let totalReviews = 0;
        
        this.cards.forEach(card => {
            if (card.reviewCount > 0) {
                totalAccuracy += card.getAccuracy();
                totalReviews++;
            }
        });
        
        const averageAccuracy = totalReviews > 0 ? totalAccuracy / totalReviews : 0;
        
        return {
            totalCards,
            dueCards,
            newCards,
            learningCards,
            reviewCards,
            averageAccuracy
        };
    }
}

class FlashcardApp {
    constructor() {
        this.decks = [];
        this.currentDeck = null;
        this.currentCardIndex = 0;
        this.currentCards = [];
        this.isFlipped = false;
        this.stats = {
            totalStudied: 0,
            todayStudied: 0,
            currentStreak: 0,
            lastStudyDate: null,
            studyHistory: []
        };
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupDarkMode();
        this.renderDecks();
        this.updateStats();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('createDeckBtn').addEventListener('click', () => this.showDeckModal());
        document.getElementById('backToDecksBtn').addEventListener('click', () => this.showDeckList());
        document.getElementById('backFromStatsBtn').addEventListener('click', () => this.showDeckList());
        document.getElementById('statsBtn').addEventListener('click', () => this.showStats());
        
        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.toggleSearch());
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchDecks(e.target.value));
        
        // Dark mode
        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleDarkMode());
        
        // Import/Export
        document.getElementById('importBtn').addEventListener('click', () => this.showImportModal());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        
        // Deck modal
        document.getElementById('deckForm').addEventListener('submit', (e) => this.handleDeckSubmit(e));
        document.getElementById('cancelDeckBtn').addEventListener('click', () => this.hideDeckModal());
        
        // Card modal
        document.getElementById('cardForm').addEventListener('submit', (e) => this.handleCardSubmit(e));
        document.getElementById('cancelCardBtn').addEventListener('click', () => this.hideCardModal());
        document.getElementById('addCardBtn').addEventListener('click', () => this.showCardModal());
        
        // Flashcard
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
        
        // Review buttons
        document.getElementById('againBtn').addEventListener('click', () => this.reviewCard(0));
        document.getElementById('hardBtn').addEventListener('click', () => this.reviewCard(1));
        document.getElementById('goodBtn').addEventListener('click', () => this.reviewCard(2));
        document.getElementById('easyBtn').addEventListener('click', () => this.reviewCard(3));
        
        // Import modal
        document.getElementById('confirmImportBtn').addEventListener('click', () => this.importData());
        document.getElementById('cancelImportBtn').addEventListener('click', () => this.hideImportModal());
    }

    setupDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode);
    }

    toggleSearch() {
        const searchBar = document.getElementById('searchBar');
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            document.getElementById('searchInput').focus();
        }
    }

    searchDecks(query) {
        const filteredDecks = query.trim() === '' 
            ? this.decks 
            : this.decks.filter(deck => 
                deck.name.toLowerCase().includes(query.toLowerCase()) ||
                deck.description.toLowerCase().includes(query.toLowerCase())
            );
        this.renderDecks(filteredDecks);
    }

    showDeckList() {
        document.getElementById('deckListView').classList.remove('hidden');
        document.getElementById('cardStudyView').classList.add('hidden');
        document.getElementById('statsView').classList.add('hidden');
        document.getElementById('searchBar').classList.add('hidden');
        this.renderDecks();
    }

    showStats() {
        document.getElementById('deckListView').classList.add('hidden');
        document.getElementById('cardStudyView').classList.add('hidden');
        document.getElementById('statsView').classList.remove('hidden');
        this.renderStats();
    }

    showDeckModal(deck = null) {
        const modal = document.getElementById('deckModal');
        const title = document.getElementById('deckModalTitle');
        const nameInput = document.getElementById('deckNameInput');
        const descInput = document.getElementById('deckDescInput');
        
        if (deck) {
            title.textContent = 'Edit Deck';
            nameInput.value = deck.name;
            descInput.value = deck.description;
            modal.dataset.deckId = deck.id;
        } else {
            title.textContent = 'Create New Deck';
            nameInput.value = '';
            descInput.value = '';
            delete modal.dataset.deckId;
        }
        
        modal.classList.remove('hidden');
    }

    hideDeckModal() {
        document.getElementById('deckModal').classList.add('hidden');
    }

    handleDeckSubmit(e) {
        e.preventDefault();
        const modal = document.getElementById('deckModal');
        const nameInput = document.getElementById('deckNameInput');
        const descInput = document.getElementById('deckDescInput');
        
        if (modal.dataset.deckId) {
            // Edit existing deck
            const deck = this.decks.find(d => d.id === modal.dataset.deckId);
            if (deck) {
                deck.name = nameInput.value;
                deck.description = descInput.value;
            }
        } else {
            // Create new deck
            const deck = new Deck(nameInput.value, descInput.value);
            this.decks.push(deck);
        }
        
        this.saveToStorage();
        this.renderDecks();
        this.hideDeckModal();
    }

    showCardModal() {
        document.getElementById('cardModal').classList.remove('hidden');
    }

    hideCardModal() {
        document.getElementById('cardModal').classList.add('hidden');
        document.getElementById('cardForm').reset();
    }

    handleCardSubmit(e) {
        e.preventDefault();
        const frontInput = document.getElementById('cardFrontInput');
        const backInput = document.getElementById('cardBackInput');
        
        if (this.currentDeck) {
            this.currentDeck.addCard(frontInput.value, backInput.value);
            this.saveToStorage();
            this.startStudySession(this.currentDeck);
        }
        
        this.hideCardModal();
    }

    startStudySession(deck) {
        this.currentDeck = deck;
        this.currentCards = deck.getDueCards();
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        if (this.currentCards.length === 0) {
            this.currentCards = deck.cards.slice(0, 10); // Show up to 10 cards if none are due
        }
        
        if (this.currentCards.length === 0) {
            alert('No cards to study in this deck!');
            return;
        }
        
        document.getElementById('deckListView').classList.add('hidden');
        document.getElementById('cardStudyView').classList.remove('hidden');
        
        this.renderCurrentCard();
        this.updateProgress();
    }

    renderCurrentCard() {
        if (this.currentCardIndex >= this.currentCards.length) {
            this.showStudyComplete();
            return;
        }
        
        const card = this.currentCards[this.currentCardIndex];
        const cardText = document.getElementById('cardText');
        const cardControls = document.getElementById('cardControls');
        const flashcard = document.getElementById('flashcard');
        
        cardText.textContent = card.front;
        cardControls.classList.add('hidden');
        flashcard.classList.remove('flipped');
        this.isFlipped = false;
    }

    flipCard() {
        const card = this.currentCards[this.currentCardIndex];
        const cardText = document.getElementById('cardText');
        const cardControls = document.getElementById('cardControls');
        const flashcard = document.getElementById('flashcard');
        
        if (!this.isFlipped) {
            cardText.textContent = card.back;
            cardControls.classList.remove('hidden');
            flashcard.classList.add('flipped');
            this.isFlipped = true;
        } else {
            cardText.textContent = card.front;
            cardControls.classList.add('hidden');
            flashcard.classList.remove('flipped');
            this.isFlipped = false;
        }
    }

    reviewCard(quality) {
        const card = this.currentCards[this.currentCardIndex];
        card.updateReview(quality);
        
        this.stats.totalStudied++;
        this.stats.todayStudied++;
        this.updateStudyStreak();
        
        this.currentCardIndex++;
        this.saveToStorage();
        this.updateProgress();
        this.renderCurrentCard();
    }

    updateProgress() {
        const progressText = document.getElementById('progressText');
        const current = this.currentCardIndex + 1;
        const total = this.currentCards.length;
        progressText.textContent = `${current} / ${total}`;
    }

    showStudyComplete() {
        document.getElementById('flashcardContainer').classList.add('hidden');
        document.getElementById('cardControls').classList.add('hidden');
        document.getElementById('studyComplete').classList.remove('hidden');
        
        if (this.currentDeck) {
            this.currentDeck.updateLastStudied();
        }
        
        this.updateStats();
        this.saveToStorage();
    }

    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.stats.lastStudyDate ? new Date(this.stats.lastStudyDate).toDateString() : null;
        
        if (lastStudy !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastStudy === yesterday.toDateString()) {
                this.stats.currentStreak++;
            } else {
                this.stats.currentStreak = 1;
            }
            
            this.stats.lastStudyDate = new Date().toISOString();
        }
    }

    renderDecks(decks = this.decks) {
        const container = document.getElementById('decksContainer');
        const emptyState = document.getElementById('emptyState');
        
        if (decks.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        container.innerHTML = decks.map(deck => {
            const stats = deck.getStats();
            return `
                <div class="deck-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg cursor-pointer" onclick="app.startStudySession(app.decks.find(d => d.id === '${deck.id}'))">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${deck.name}</h3>
                        <div class="flex space-x-2">
                            <button onclick="event.stopPropagation(); app.showDeckModal(app.decks.find(d => d.id === '${deck.id}'))" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button onclick="event.stopPropagation(); app.deleteDeck('${deck.id}')" class="text-red-400 hover:text-red-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${deck.description || 'No description'}</p>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-500 dark:text-gray-400">Total Cards:</span>
                            <span class="font-medium text-gray-900 dark:text-white ml-1">${stats.totalCards}</span>
                        </div>
                        <div>
                            <span class="text-gray-500 dark:text-gray-400">Due:</span>
                            <span class="font-medium text-blue-600 dark:text-blue-400 ml-1">${stats.dueCards}</span>
                        </div>
                        <div>
                            <span class="text-gray-500 dark:text-gray-400">New:</span>
                            <span class="font-medium text-green-600 dark:text-green-400 ml-1">${stats.newCards}</span>
                        </div>
                        <div>
                            <span class="text-gray-500 dark:text-gray-400">Learning:</span>
                            <span class="font-medium text-yellow-600 dark:text-yellow-400 ml-1">${stats.learningCards}</span>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                Accuracy: ${stats.averageAccuracy.toFixed(1)}%
                            </span>
                            <button class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                                Study Now →
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteDeck(deckId) {
        if (confirm('Are you sure you want to delete this deck? This action cannot be undone.')) {
            this.decks = this.decks.filter(deck => deck.id !== deckId);
            this.saveToStorage();
            this.renderDecks();
        }
    }

    renderStats() {
        // Calculate global stats
        let totalCards = 0;
        let totalAccuracy = 0;
        let totalReviews = 0;
        
        this.decks.forEach(deck => {
            totalCards += deck.cards.length;
            deck.cards.forEach(card => {
                if (card.reviewCount > 0) {
                    totalAccuracy += card.getAccuracy();
                    totalReviews++;
                }
            });
        });
        
        const averageAccuracy = totalReviews > 0 ? totalAccuracy / totalReviews : 0;
        
        document.getElementById('totalCardsStat').textContent = totalCards;
        document.getElementById('studiedTodayStat').textContent = this.stats.todayStudied;
        document.getElementById('streakStat').textContent = this.stats.currentStreak;
        document.getElementById('accuracyStat').textContent = `${averageAccuracy.toFixed(1)}%`;
        
        // Render recent activity
        const recentActivity = document.getElementById('recentActivity');
        const activities = this.getRecentActivity();
        
        if (activities.length === 0) {
            recentActivity.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No recent activity</p>';
        } else {
            recentActivity.innerHTML = activities.map(activity => `
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <span class="text-sm text-gray-600 dark:text-gray-300">${activity.description}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">${activity.time}</span>
                </div>
            `).join('');
        }
    }

    getRecentActivity() {
        const activities = [];
        const today = new Date();
        
        // Add study sessions
        this.decks.forEach(deck => {
            if (deck.lastStudied) {
                const studyDate = new Date(deck.lastStudied);
                const daysDiff = Math.floor((today - studyDate) / (1000 * 60 * 60 * 24));
                
                let timeText;
                if (daysDiff === 0) {
                    timeText = 'Today';
                } else if (daysDiff === 1) {
                    timeText = 'Yesterday';
                } else {
                    timeText = `${daysDiff} days ago`;
                }
                
                activities.push({
                    description: `Studied "${deck.name}"`,
                    time: timeText
                });
            }
        });
        
        return activities.sort((a, b) => {
            const timeOrder = { 'Today': 0, 'Yesterday': 1 };
            const aOrder = timeOrder[a.time] !== undefined ? timeOrder[a.time] : 999;
            const bOrder = timeOrder[b.time] !== undefined ? timeOrder[b.time] : 999;
            return aOrder - bOrder;
        }).slice(0, 10);
    }

    updateStats() {
        // Reset today's count if it's a new day
        const today = new Date().toDateString();
        const lastStudy = this.stats.lastStudyDate ? new Date(this.stats.lastStudyDate).toDateString() : null;
        
        if (lastStudy !== today) {
            this.stats.todayStudied = 0;
        }
        
        this.renderStats();
    }

    showImportModal() {
        document.getElementById('importModal').classList.remove('hidden');
    }

    hideImportModal() {
        document.getElementById('importModal').classList.add('hidden');
        document.getElementById('importFileInput').value = '';
    }

    importData() {
        const fileInput = document.getElementById('importFileInput');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Please select a file to import.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.decks && Array.isArray(data.decks)) {
                    data.decks.forEach(deckData => {
                        const deck = new Deck(deckData.name, deckData.description, deckData.id);
                        
                        if (deckData.cards && Array.isArray(deckData.cards)) {
                            deckData.cards.forEach(cardData => {
                                const card = new Card(cardData.front, cardData.back, cardData.id);
                                Object.assign(card, cardData);
                                deck.cards.push(card);
                            });
                        }
                        
                        this.decks.push(deck);
                    });
                    
                    this.saveToStorage();
                    this.renderDecks();
                    this.hideImportModal();
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid file format. Please select a valid export file.');
                }
            } catch (error) {
                alert('Error importing file: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }

    exportData() {
        const data = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            decks: this.decks.map(deck => ({
                id: deck.id,
                name: deck.name,
                description: deck.description,
                createdAt: deck.createdAt,
                lastStudied: deck.lastStudied,
                cards: deck.cards.map(card => ({
                    id: card.id,
                    front: card.front,
                    back: card.back,
                    createdAt: card.createdAt,
                    lastReviewed: card.lastReviewed,
                    reviewCount: card.reviewCount,
                    successCount: card.successCount,
                    easeFactor: card.easeFactor,
                    interval: card.interval,
                    repetitions: card.repetitions,
                    nextReview: card.nextReview
                }))
            }))
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flashcards-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    saveToStorage() {
        const data = {
            decks: this.decks,
            stats: this.stats
        };
        localStorage.setItem('flashcardApp', JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('flashcardApp');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                
                if (data.decks) {
                    this.decks = data.decks.map(deckData => {
                        const deck = new Deck(deckData.name, deckData.description, deckData.id);
                        deck.createdAt = deckData.createdAt;
                        deck.lastStudied = deckData.lastStudied;
                        
                        if (deckData.cards) {
                            deck.cards = deckData.cards.map(cardData => {
                                const card = new Card(cardData.front, cardData.back, cardData.id);
                                Object.assign(card, cardData);
                                return card;
                            });
                        }
                        
                        return deck;
                    });
                }
                
                if (data.stats) {
                    this.stats = data.stats;
                }
            } catch (error) {
                console.error('Error loading data from storage:', error);
            }
        }
        
        // Create sample deck if no decks exist
        if (this.decks.length === 0) {
            this.createSampleDeck();
        }
    }

    createSampleDeck() {
        const sampleDeck = new Deck('Sample Deck', 'A sample deck to get you started');
        
        const sampleCards = [
            { front: 'What is JavaScript?', back: 'A high-level, interpreted programming language primarily used for web development.' },
            { front: 'What is HTML?', back: 'HyperText Markup Language - the standard markup language for creating web pages.' },
            { front: 'What is CSS?', back: 'Cascading Style Sheets - used to describe the presentation of HTML documents.' },
            { front: 'What is React?', back: 'A JavaScript library for building user interfaces, particularly web applications.' },
            { front: 'What is the DOM?', back: 'Document Object Model - a programming interface for HTML documents.' }
        ];
        
        sampleCards.forEach(cardData => {
            sampleDeck.addCard(cardData.front, cardData.back);
        });
        
        this.decks.push(sampleDeck);
        this.saveToStorage();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FlashcardApp();
});

/*
 * Flashcard Learning App
 * Created by Ramkrishna (https://github.com/ramkrishna-dev)
 * Contact: ramkrishnaspace@gmail.com
 * 
 * A modern, responsive flashcard learning application with spaced repetition system.
 * Built with HTML, CSS, and JavaScript - no backend required.
 */