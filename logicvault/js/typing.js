/* ========================================
   LOGICVAULT — TYPING GAME LOGIC
   Handles the typing speed challenge
   ======================================== */

class TypingGame {
  constructor() {
    this.quote = null;
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.correctChars = 0;
    this.totalTyped = 0;
    this.isComplete = false;
    this.keyStats = {}; // Track accuracy per key
    this.errors = [];
    
    this.init();
  }
  
  init() {
    // Get quote from URL param or use today's
    const urlParams = new URLSearchParams(window.location.search);
    const quoteId = urlParams.get('quote');
    
    if (quoteId) {
      this.quote = getQuoteById(quoteId);
    } else {
      this.quote = getTodayQuote();
    }
    
    if (!this.quote) {
      showToast('Error loading quote', 'error');
      return;
    }
    
    this.setupUI();
    this.bindEvents();
  }
  
  setupUI() {
    // Update header info
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    const difficultyEl = document.getElementById('difficulty-badge');
    if (difficultyEl) {
      difficultyEl.textContent = this.quote.difficulty.toUpperCase();
      difficultyEl.className = `difficulty-badge difficulty-${this.quote.difficulty}`;
    }
    
    const bestWpmEl = document.getElementById('best-wpm');
    if (bestWpmEl) {
      const stats = getStats();
      bestWpmEl.textContent = stats.typing.bestWPM > 0 ? `${stats.typing.bestWPM} WPM` : '—';
    }
    
    // Render quote text
    this.renderQuote();
  }
  
  renderQuote() {
    const quoteTextEl = document.getElementById('quote-text');
    if (!quoteTextEl) return;
    
    let html = '';
    const text = this.quote.text;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const displayChar = char === ' ' ? '·' : char;
      html += `<span class="quote-char" data-index="${i}">${displayChar}</span>`;
    }
    
    quoteTextEl.innerHTML = html;
    
    // Set first character as current
    const firstChar = quoteTextEl.querySelector('[data-index="0"]');
    if (firstChar) {
      firstChar.classList.add('current');
    }
    
    // Add author
    const authorEl = document.getElementById('quote-author');
    if (authorEl) {
      authorEl.textContent = `— ${this.quote.author}`;
    }
  }
  
  bindEvents() {
    const quoteBox = document.getElementById('quote-box');
    const hiddenInput = document.getElementById('hidden-input');
    
    if (!quoteBox || !hiddenInput) return;
    
    // Focus input on quote box click
    quoteBox.addEventListener('click', () => {
      if (!this.isComplete) {
        hiddenInput.focus();
      }
    });
    
    // Keep focus on hidden input
    document.addEventListener('keydown', (e) => {
      if (!this.isComplete && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        hiddenInput.focus();
      }
    });
    
    // Handle typing
    hiddenInput.addEventListener('input', (e) => {
      if (this.isComplete) return;
      
      const input = e.target.value;
      const lastChar = input.slice(-1);
      
      if (lastChar) {
        this.handleKeypress(lastChar);
      }
      
      // Clear input to prevent buildup
      e.target.value = '';
    });
    
    // Handle backspace
    hiddenInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !this.isComplete) {
        this.handleBackspace();
      }
    });
    
    // Prevent losing focus
    hiddenInput.addEventListener('blur', () => {
      if (!this.isComplete) {
        setTimeout(() => hiddenInput.focus(), 10);
      }
    });
  }
  
  handleKeypress(char) {
    // Start timer on first keystroke
    if (!this.startTime) {
      this.startTime = Date.now();
      this.startLiveUpdates();
    }
    
    this.totalTyped++;
    
    const expectedChar = this.quote.text[this.currentIndex];
    const charEl = document.querySelector(`[data-index="${this.currentIndex}"]`);
    
    // Track key stats
    const lowerChar = char.toLowerCase();
    if (!this.keyStats[lowerChar]) {
      this.keyStats[lowerChar] = { correct: 0, total: 0 };
    }
    this.keyStats[lowerChar].total++;
    
    if (char === expectedChar) {
      // Correct character
      this.correctChars++;
      this.keyStats[lowerChar].correct++;
      
      if (charEl) {
        charEl.classList.remove('wrong');
        charEl.classList.add('correct');
        charEl.classList.remove('current');
      }
      
      this.currentIndex++;
      
      // Set next character as current
      const nextCharEl = document.querySelector(`[data-index="${this.currentIndex}"]`);
      if (nextCharEl) {
        nextCharEl.classList.add('current');
      }
      
      // Check completion
      if (this.currentIndex >= this.quote.text.length) {
        this.complete();
      }
    } else {
      // Wrong character
      if (charEl) {
        charEl.classList.add('wrong');
      }
      
      this.errors.push({
        index: this.currentIndex,
        expected: expectedChar,
        typed: char
      });
    }
    
    // Update live stats immediately
    this.updateLiveStats();
  }
  
  handleBackspace() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      
      const charEl = document.querySelector(`[data-index="${this.currentIndex}"]`);
      if (charEl) {
        charEl.classList.remove('correct', 'wrong');
        charEl.classList.add('current');
      }
      
      const nextCharEl = document.querySelector(`[data-index="${this.currentIndex + 1}"]`);
      if (nextCharEl) {
        nextCharEl.classList.remove('current');
      }
      
      this.correctChars--;
      this.updateLiveStats();
    }
  }
  
  startLiveUpdates() {
    // Update stats every 500ms
    this.updateInterval = setInterval(() => {
      this.updateLiveStats();
    }, 500);
  }
  
  updateLiveStats() {
    if (!this.startTime) return;
    
    const elapsed = (Date.now() - this.startTime) / 1000;
    const wpm = calculateWPM(this.correctChars, elapsed);
    const accuracy = calculateAccuracy(this.correctChars, this.totalTyped);
    const progress = (this.currentIndex / this.quote.text.length) * 100;
    
    const wpmEl = document.getElementById('live-wpm');
    const accuracyEl = document.getElementById('live-accuracy');
    const timeEl = document.getElementById('live-time');
    const progressFill = document.getElementById('progress-fill');
    
    if (wpmEl) wpmEl.textContent = wpm;
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
    if (timeEl) timeEl.textContent = formatTime(elapsed);
    if (progressFill) progressFill.style.width = `${progress}%`;
  }
  
  complete() {
    this.isComplete = true;
    this.endTime = Date.now();
    
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    const elapsed = (this.endTime - this.startTime) / 1000;
    const wpm = calculateWPM(this.correctChars, elapsed);
    const accuracy = calculateAccuracy(this.correctChars, this.totalTyped);
    
    // Update stats
    const result = updateTypingGame(wpm, accuracy, this.quote.id, this.keyStats);
    
    // Show completion screen
    this.showCompletionScreen(wpm, accuracy, elapsed, result);
  }
  
  showCompletionScreen(wpm, accuracy, elapsed, statsResult) {
    const quoteBox = document.getElementById('quote-box');
    const liveStats = document.getElementById('live-stats');
    
    if (!quoteBox) return;
    
    // Hide live stats
    if (liveStats) {
      liveStats.classList.add('hidden');
    }
    
    // Create completion HTML
    const performanceLabel = getPerformanceLabel(wpm);
    
    quoteBox.innerHTML = `
      <div class="confetti-container"></div>
      <div class="completion-screen result-card">
        <h2 class="result-title">⌨️ Today's Result</h2>
        
        <div class="result-wpm">${wpm}</div>
        <div class="result-label">${performanceLabel}</div>
        
        <div class="result-details">
          <div class="result-detail">
            <div class="result-detail-value">${accuracy}%</div>
            <div class="result-detail-label">Accuracy</div>
          </div>
          <div class="result-detail">
            <div class="result-detail-value">${formatTime(elapsed)}</div>
            <div class="result-detail-label">Time</div>
          </div>
          <div class="result-detail">
            <div class="result-detail-value">${this.quote.text.length}</div>
            <div class="result-detail-label">Characters</div>
          </div>
        </div>
        
        <div class="result-xp">
          ⚡ XP earned: +${statsResult.xpEarned}
        </div>
        
        <div class="mb-3">
          ${renderStreakBadge(statsResult.streak)}
        </div>
        
        <div class="result-actions">
          <button class="btn btn-secondary btn-small" onclick="shareTypingResult(${wpm}, ${accuracy}, ${statsResult.streak})">
            📤 Share
          </button>
          <a href="typing.html" class="btn btn-primary btn-small">
            🔁 Try Again
          </a>
          <a href="logic.html" class="btn btn-logic btn-small">
            🧩 Try Logic Puzzle →
          </a>
        </div>
      </div>
    `;
    
    // Trigger confetti
    setTimeout(() => {
      confettiBurst(quoteBox);
    }, 100);
    
    // Show keyboard heatmap
    this.showKeyboardHeatmap();
  }
  
  showKeyboardHeatmap() {
    const container = document.getElementById('keyboard-container');
    if (!container) return;
    
    container.innerHTML = `
      <h3 class="keyboard-title">Keyboard Heatmap</h3>
      ${generateKeyboardHeatmap(this.keyStats)}
    `;
  }
}

// Share function for global access
function shareTypingResult(wpm, accuracy, streak) {
  const text = `⌨️ I typed at ${wpm} WPM with ${accuracy}% accuracy on LogicVault today! 🔥 Day ${streak} streak. Can you beat me? logicvault.tech`;
  shareResult(text);
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on typing page
  if (document.getElementById('quote-box')) {
    window.typingGame = new TypingGame();
  }
});
