/* ========================================
   LOGICVAULT — Typing Game Logic
   Handles the typing speed challenge
   ======================================== */

class TypingGame {
  constructor() {
    this.quote = null;
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.errors = 0;
    this.correctChars = 0;
    this.totalTyped = 0;
    this.isComplete = false;
    this.keyAccuracy = {}; // Track accuracy per key
    
    this.elements = {
      quoteBox: null,
      input: null,
      liveStats: null,
      completionModal: null
    };
    
    this.timerInterval = null;
  }
  
  /**
   * Initialize the typing game with a quote
   * @param {Object} quote - Quote object from data.js
   */
  init(quote) {
    this.quote = quote;
    this.reset();
    this.setupElements();
    this.renderQuote();
    this.bindEvents();
  }
  
  /**
   * Reset game state
   */
  reset() {
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.errors = 0;
    this.correctChars = 0;
    this.totalTyped = 0;
    this.isComplete = false;
    this.keyAccuracy = {};
    clearInterval(this.timerInterval);
  }
  
  /**
   * Setup DOM element references
   */
  setupElements() {
    this.elements.quoteBox = document.querySelector('.quote-box');
    this.elements.input = document.querySelector('.typing-input');
    this.elements.liveStats = document.querySelector('.live-stats');
    this.elements.completionModal = document.querySelector('.completion-modal');
  }
  
  /**
   * Render the quote as individual character spans
   */
  renderQuote() {
    if (!this.elements.quoteBox) return;
    
    const textHtml = this.quote.text.split('').map((char, index) => {
      return `<span class="quote-box__char" data-index="${index}">${this.escapeChar(char)}</span>`;
    }).join('');
    
    const authorHtml = `<div class="quote-box__author">— ${this.quote.author}</div>`;
    
    this.elements.quoteBox.innerHTML = `
      <div class="quote-box__text">${textHtml}</div>
      ${authorHtml}
      <div class="quote-box__placeholder">Click to start typing...</div>
    `;
    
    // Set first character as current
    const firstChar = this.elements.quoteBox.querySelector('[data-index="0"]');
    if (firstChar) {
      firstChar.classList.add('quote-box__char--current');
    }
  }
  
  /**
   * Escape special characters for HTML display
   */
  escapeChar(char) {
    const escaped = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escaped[char] || char;
  }
  
  /**
   * Bind event listeners
   */
  bindEvents() {
    // Click on quote box to focus
    this.elements.quoteBox.addEventListener('click', () => {
      if (!this.isComplete) {
        this.elements.input.focus();
      }
    });
    
    // Handle input
    this.elements.input.addEventListener('input', (e) => this.handleInput(e));
    
    // Prevent paste
    this.elements.input.addEventListener('paste', (e) => e.preventDefault());
  }
  
  /**
   * Handle keyboard input
   */
  handleInput(e) {
    if (this.isComplete) return;
    
    // Start timer on first keystroke
    if (!this.startTime) {
      this.startTime = Date.now();
      this.startTimer();
      this.elements.quoteBox.querySelector('.quote-box__placeholder').classList.add('hidden');
    }
    
    const inputValue = e.target.value;
    const lastChar = inputValue.slice(-1);
    
    // Track key accuracy
    if (lastChar) {
      const expectedChar = this.quote.text[this.currentIndex];
      
      if (!this.keyAccuracy[lastChar.toLowerCase()]) {
        this.keyAccuracy[lastChar.toLowerCase()] = { correct: 0, wrong: 0 };
      }
      
      if (lastChar === expectedChar) {
        this.keyAccuracy[lastChar.toLowerCase()].correct++;
      } else {
        this.keyAccuracy[lastChar.toLowerCase()].wrong++;
      }
    }
    
    // Check each character up to current position
    for (let i = 0; i < inputValue.length && this.currentIndex < this.quote.text.length; i++) {
      const typedChar = inputValue[i];
      const expectedChar = this.quote.text[this.currentIndex];
      
      this.totalTyped++;
      
      if (typedChar === expectedChar) {
        this.markCharacterCorrect(this.currentIndex);
        this.correctChars++;
        this.currentIndex++;
      } else {
        this.markCharacterWrong(this.currentIndex);
        this.errors++;
        this.currentIndex++;
      }
    }
    
    // Clear input but keep processing
    e.target.value = '';
    
    // Update live stats
    this.updateLiveStats();
    
    // Check for completion
    if (this.currentIndex >= this.quote.text.length) {
      this.completeGame();
    }
  }
  
  /**
   * Mark character as correct
   */
  markCharacterCorrect(index) {
    const charEl = this.elements.quoteBox.querySelector(`[data-index="${index}"]`);
    if (charEl) {
      charEl.classList.remove('quote-box__char--current');
      charEl.classList.add('quote-box__char--correct');
      charEl.style.animation = 'char-correct 0.3s ease';
    }
    
    // Set next character as current
    const nextChar = this.elements.quoteBox.querySelector(`[data-index="${index + 1}"]`);
    if (nextChar) {
      nextChar.classList.add('quote-box__char--current');
    }
  }
  
  /**
   * Mark character as wrong
   */
  markCharacterWrong(index) {
    const charEl = this.elements.quoteBox.querySelector(`[data-index="${index}"]`);
    if (charEl) {
      charEl.classList.remove('quote-box__char--current');
      charEl.classList.add('quote-box__char--wrong');
    }
    
    // Set next character as current
    const nextChar = this.elements.quoteBox.querySelector(`[data-index="${index + 1}"]`);
    if (nextChar) {
      nextChar.classList.add('quote-box__char--current');
    }
  }
  
  /**
   * Start the timer
   */
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.updateLiveStats();
    }, 500);
  }
  
  /**
   * Update live statistics display
   */
  updateLiveStats() {
    if (!this.elements.liveStats || !this.startTime) return;
    
    const elapsed = (Date.now() - this.startTime) / 1000;
    const wpm = this.calculateWPM(elapsed);
    const accuracy = this.calculateAccuracy();
    const progress = (this.currentIndex / this.quote.text.length) * 100;
    
    this.elements.liveStats.innerHTML = `
      <div class="live-stat">
        <div class="live-stat__value">${wpm}</div>
        <div class="live-stat__label">WPM</div>
      </div>
      <div class="live-stat">
        <div class="live-stat__value">${accuracy}%</div>
        <div class="live-stat__label">Accuracy</div>
      </div>
      <div class="live-stat">
        <div class="live-stat__value">${elapsed.toFixed(1)}s</div>
        <div class="live-stat__label">Time</div>
      </div>
      <div class="live-stat">
        <div class="progress-ring">
          <div class="progress-ring__fill" style="width: ${progress}%"></div>
        </div>
        <div class="live-stat__label">Progress</div>
      </div>
    `;
  }
  
  /**
   * Calculate WPM
   */
  calculateWPM(elapsed) {
    if (elapsed <= 0) return 0;
    const words = this.correctChars / 5;
    const minutes = elapsed / 60;
    return Math.round(words / minutes);
  }
  
  /**
   * Calculate accuracy
   */
  calculateAccuracy() {
    if (this.totalTyped === 0) return 100;
    return Math.round((this.correctChars / this.totalTyped) * 100);
  }
  
  /**
   * Complete the game
   */
  completeGame() {
    this.isComplete = true;
    this.endTime = Date.now();
    clearInterval(this.timerInterval);
    
    const elapsed = (this.endTime - this.startTime) / 1000;
    const wpm = this.calculateWPM(elapsed);
    const accuracy = this.calculateAccuracy();
    
    // Show completion modal
    this.showCompletion(wpm, accuracy, elapsed);
    
    // Trigger confetti
    confettiBurst(this.elements.completionModal);
    
    // Update stats
    const result = updateTypingGame(wpm, accuracy, this.quote.id);
    
    // Store results for later use
    this.results = {
      wpm,
      accuracy,
      time: elapsed,
      xpEarned: result.xpEarned,
      streak: result.streak,
      keyAccuracy: this.keyAccuracy
    };
  }
  
  /**
   * Show completion modal with results
   */
  showCompletion(wpm, accuracy, elapsed) {
    if (!this.elements.completionModal) return;
    
    const label = getPerformanceLabel(wpm);
    
    this.elements.completionModal.innerHTML = `
      <div class="completion-modal__title">⌨️ Today's Result</div>
      <div class="completion-modal__wpm">${wpm}</div>
      <div class="completion-modal__label">${label}</div>
      
      <div class="completion-modal__stats">
        <div>
          <div class="stat-box__value">${accuracy}%</div>
          <div class="stat-box__label">Accuracy</div>
        </div>
        <div>
          <div class="stat-box__value">${elapsed.toFixed(1)}s</div>
          <div class="stat-box__label">Time</div>
        </div>
        <div>
          <div class="stat-box__value">${this.quote.text.length}</div>
          <div class="stat-box__label">Characters</div>
        </div>
      </div>
      
      <div class="badge badge--xp mb-3">
        ⚡ +${this.results.xpEarned} XP · 🔥 Day ${this.results.streak}
      </div>
      
      <div class="completion-modal__actions">
        <button class="btn btn--secondary" onclick="shareTypingResult(${wpm}, ${accuracy}, ${this.results.streak})">
          📤 Share Result
        </button>
        <button class="btn btn--ghost" onclick="window.location.reload()">
          🔁 Try Again
        </button>
        <a href="logic.html" class="btn btn--primary">
          🧩 Try Logic Puzzle →
        </a>
      </div>
    `;
    
    this.elements.completionModal.classList.remove('hidden');
    this.elements.quoteBox.classList.add('hidden');
    this.elements.liveStats.classList.add('hidden');
  }
  
  /**
   * Render keyboard heatmap showing key accuracy
   */
  renderKeyboardHeatmap(container) {
    if (!container || !this.results.keyAccuracy) return;
    
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    
    container.innerHTML = `
      <h3 class="text-center mb-2">Keyboard Heatmap</h3>
      <p class="text-muted text-center mb-3" style="font-size: 0.9rem;">
        Green = accurate · Red = errors · Gray = not used
      </p>
      <div class="keyboard">
        ${rows.map(row => `
          <div class="keyboard-row">
            ${row.map(key => {
              const stats = this.results.keyAccuracy[key];
              let className = 'keyboard-key';
              
              if (stats) {
                const total = stats.correct + stats.wrong;
                const accuracy = (stats.correct / total) * 100;
                
                if (accuracy >= 90) {
                  className += ' keyboard-key--correct';
                } else if (accuracy < 70) {
                  className += ' keyboard-key--wrong';
                }
              }
              
              return `<div class="${className}">${key.toUpperCase()}</div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }
}

/**
 * Share typing result to clipboard
 */
function shareTypingResult(wpm, accuracy, streak) {
  const text = `⌨️ I typed at ${wpm} WPM with ${accuracy}% accuracy on LogicVault today! 🔥 Day ${streak} streak. Can you beat me? logicvault.tech`;
  shareResult(text);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TypingGame, shareTypingResult };
}
