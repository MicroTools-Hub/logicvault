/* ========================================
   LOGICVAULT — Logic Puzzle Game
   Handles the logic puzzle challenge
   ======================================== */

class LogicPuzzle {
  constructor() {
    this.puzzle = null;
    this.hintsRevealed = [];
    this.isSolved = false;
    this.isSubmitted = false;
    this.userAnswer = '';
    
    this.elements = {
      puzzleCard: null,
      hintButtons: null,
      hintsContainer: null,
      answerInput: null,
      submitBtn: null,
      revealSection: null,
      completionModal: null
    };
  }
  
  /**
   * Initialize the puzzle game
   * @param {Object} puzzle - Puzzle object from data.js
   */
  init(puzzle) {
    this.puzzle = puzzle;
    this.setupElements();
    this.renderPuzzle();
    this.bindEvents();
  }
  
  /**
   * Setup DOM element references
   */
  setupElements() {
    this.elements.puzzleCard = document.querySelector('.puzzle-card');
    this.elements.hintButtons = document.querySelector('.hint-buttons');
    this.elements.hintsContainer = document.querySelector('.hints-container');
    this.elements.answerInput = document.querySelector('.answer-input');
    this.elements.submitBtn = document.querySelector('.submit-answer-btn');
    this.elements.revealSection = document.querySelector('.reveal-section');
    this.elements.completionModal = document.querySelector('.completion-modal');
  }
  
  /**
   * Render the puzzle
   */
  renderPuzzle() {
    if (!this.elements.puzzleCard) return;
    
    const categoryIcon = getCategoryIcon(this.puzzle.category);
    
    this.elements.puzzleCard.innerHTML = `
      <div class="puzzle-card__category">${categoryIcon}</div>
      <div class="puzzle-card__question">${escapeHtml(this.puzzle.question)}</div>
    `;
    
    // Render hint buttons
    this.renderHintButtons();
    
    // Render answer input based on puzzle type
    this.renderAnswerInput();
  }
  
  /**
   * Render hint buttons
   */
  renderHintButtons() {
    if (!this.elements.hintButtons) return;
    
    this.elements.hintButtons.innerHTML = `
      <button class="hint-btn hint-btn--available" data-hint="1">
        💡 Hint 1
      </button>
      <button class="hint-btn hint-btn--locked" data-hint="2" disabled>
        💡 Hint 2
      </button>
      <button class="hint-btn hint-btn--locked" data-hint="3" disabled>
        💡 Hint 3
      </button>
    `;
  }
  
  /**
   * Render answer input based on puzzle type
   */
  renderAnswerInput() {
    const container = document.querySelector('.answer-container');
    if (!container) return;
    
    const isAutoGrade = ['math', 'sequence'].includes(this.puzzle.category);
    const placeholder = isAutoGrade 
      ? 'Enter your answer...' 
      : 'Type your answer here...';
    
    container.innerHTML = `
      <textarea 
        class="answer-input ${isAutoGrade ? 'answer-input--short' : ''}" 
        placeholder="${placeholder}"
        rows="${isAutoGrade ? 2 : 4}"
      ></textarea>
      <button class="btn btn--primary submit-answer-btn" style="width: 100%;">
        ${isAutoGrade ? 'Check Answer' : 'Submit Answer'}
      </button>
    `;
    
    this.elements.answerInput = container.querySelector('.answer-input');
    this.elements.submitBtn = container.querySelector('.submit-answer-btn');
  }
  
  /**
   * Bind event listeners
   */
  bindEvents() {
    // Hint buttons
    if (this.elements.hintButtons) {
      this.elements.hintButtons.addEventListener('click', (e) => {
        const btn = e.target.closest('.hint-btn');
        if (btn && !btn.disabled) {
          const hintNum = parseInt(btn.dataset.hint);
          this.revealHint(hintNum);
        }
      });
    }
    
    // Submit button
    if (this.elements.submitBtn) {
      this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
    }
    
    // Enter key to submit
    if (this.elements.answerInput) {
      this.elements.answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
          this.submitAnswer();
        }
      });
    }
  }
  
  /**
   * Reveal a hint
   */
  revealHint(hintNum) {
    if (!this.puzzle || this.hintsRevealed.includes(hintNum)) return;
    
    const hintText = this.puzzle[`hint${hintNum}`];
    if (!hintText) return;
    
    // Add to revealed hints
    this.hintsRevealed.push(hintNum);
    
    // Show hint text
    if (this.elements.hintsContainer) {
      const hintEl = document.createElement('div');
      hintEl.className = 'hint-text';
      hintEl.innerHTML = `<strong>Hint ${hintNum}:</strong> ${escapeHtml(hintText)}`;
      this.elements.hintsContainer.appendChild(hintEl);
    }
    
    // Update button states
    const currentBtn = this.elements.hintButtons.querySelector(`[data-hint="${hintNum}"]`);
    if (currentBtn) {
      currentBtn.classList.add('hint-btn--used');
      currentBtn.textContent = `✓ Hint ${hintNum}`;
    }
    
    // Unlock next hint
    const nextBtn = this.elements.hintButtons.querySelector(`[data-hint="${hintNum + 1}"]`);
    if (nextBtn) {
      nextBtn.classList.remove('hint-btn--locked');
      nextBtn.classList.add('hint-btn--available');
      nextBtn.disabled = false;
    }
    
    // Track hint usage for stats (only first time viewing)
    if (hintNum === 1 && !this.elements.hintsContainer.dataset.hintUsed) {
      this.elements.hintsContainer.dataset.hintUsed = '1';
    }
  }
  
  /**
   * Submit the answer
   */
  submitAnswer() {
    if (!this.elements.answerInput || this.isSubmitted) return;
    
    this.userAnswer = this.elements.answerInput.value.trim();
    if (!this.userAnswer) {
      showToast('Please enter an answer', 'error');
      return;
    }
    
    this.isSubmitted = true;
    
    // Check if auto-gradeable
    const isAutoGrade = ['math', 'sequence'].includes(this.puzzle.category);
    
    if (isAutoGrade) {
      this.checkAutoGrade();
    } else {
      this.showRevealSection();
    }
  }
  
  /**
   * Check answer for auto-gradeable puzzles
   */
  checkAutoGrade() {
    const normalizedUser = this.userAnswer.toLowerCase().trim();
    const normalizedAnswer = this.puzzle.answer.toLowerCase().trim();
    
    // Extract just the answer part (before any explanation in parentheses)
    const correctAnswer = normalizedAnswer.split('(')[0].trim();
    
    const isCorrect = normalizedUser === correctAnswer || 
                      normalizedUser.includes(correctAnswer);
    
    if (isCorrect) {
      this.handleCorrectAnswer(true);
    } else {
      this.handleWrongAnswer();
    }
  }
  
  /**
   * Handle correct answer
   */
  handleCorrectAnswer(autoGrade = false) {
    this.isSolved = true;
    
    // Show confetti
    if (this.elements.completionModal) {
      confettiBurst(this.elements.completionModal);
    }
    
    showToast('Correct! 🎉', 'success');
    
    // Show reveal section with success message
    this.showRevealSection(true);
  }
  
  /**
   * Handle wrong answer
   */
  handleWrongAnswer() {
    // Shake animation
    if (this.elements.answerInput) {
      this.elements.answerInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => {
        this.elements.answerInput.style.animation = '';
      }, 500);
    }
    
    showToast('Not quite. Want to see the answer?', 'info');
    
    // Show reveal section anyway
    this.showRevealSection(false);
  }
  
  /**
   * Show the reveal section with the answer
   */
  showRevealSection(wasCorrect = null) {
    if (!this.elements.revealSection) return;
    
    let statusHtml = '';
    if (wasCorrect === true) {
      statusHtml = '<div class="badge badge--typing mb-2">✓ Correct!</div>';
    } else if (wasCorrect === false) {
      statusHtml = '<div class="badge badge--wrong mb-2">✗ Not quite</div>';
    }
    
    this.elements.revealSection.innerHTML = `
      ${statusHtml}
      <h3 class="mb-2">The Answer</h3>
      <div class="reveal-section__answer">${escapeHtml(this.puzzle.answer)}</div>
      
      <div class="mt-3">
        <p class="text-muted mb-2">Did you get it?</p>
        <div class="flex gap-2">
          <button class="btn btn--primary" onclick="logicGame.complete(true)">
            ✓ Yes, I got it
          </button>
          <button class="btn btn--ghost" onclick="logicGame.complete(false)">
            ✗ Not quite
          </button>
        </div>
      </div>
    `;
    
    this.elements.revealSection.classList.remove('hidden');
    
    // Scroll to reveal section
    this.elements.revealSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  /**
   * Complete the puzzle and update stats
   */
  complete(selfReportedCorrect) {
    const hintsUsed = this.hintsRevealed.length;
    
    // Update stats
    const result = updateLogicGame(this.puzzle.id, hintsUsed, selfReportedCorrect);
    
    // Show completion modal
    this.showCompletion(result);
  }
  
  /**
   * Show completion modal
   */
  showCompletion(result) {
    if (!this.elements.completionModal) return;
    
    const hidePuzzle = document.querySelector('.puzzle-card');
    const hideHints = document.querySelector('.hints-container');
    const hideAnswer = document.querySelector('.answer-container');
    const hideReveal = document.querySelector('.reveal-section');
    
    if (hidePuzzle) hidePuzzle.classList.add('hidden');
    if (hideHints) hideHints.classList.add('hidden');
    if (hideAnswer) hideAnswer.classList.add('hidden');
    if (hideReveal) hideReveal.classList.add('hidden');
    
    // Trigger confetti if solved
    if (result.solved) {
      confettiBurst(this.elements.completionModal);
    }
    
    const statusEmoji = result.solved ? '🎉' : '💪';
    const statusText = result.solved ? 'Solved!' : 'Nice try!';
    
    this.elements.completionModal.innerHTML = `
      <div class="completion-modal__title">${statusEmoji} ${statusText}</div>
      
      ${result.solved ? `
        <div class="badge badge--xp mb-3">
          ⚡ +${result.xpEarned} XP · 🔥 Day ${result.streak}
        </div>
      ` : `
        <p class="text-muted mb-3">Not today, but you'll get the next one!</p>
        <div class="badge badge--xp mb-3">
          ⚡ +${result.xpEarned} XP for trying
        </div>
      `}
      
      <div class="completion-modal__actions">
        <button class="btn btn--secondary" onclick="shareLogicResult(${this.hintsRevealed.length}, ${result.streak}, ${result.solved})">
          📤 Share
        </button>
        <a href="typing.html" class="btn btn--ghost">
          ⌨️ Try Typing Challenge
        </a>
        <a href="archive.html" class="btn btn--primary">
          📚 Browse Past Puzzles
        </a>
      </div>
    `;
    
    this.elements.completionModal.classList.remove('hidden');
  }
}

/**
 * Share logic puzzle result to clipboard
 */
function shareLogicResult(hintsUsed, streak, solved) {
  let text;
  if (solved) {
    text = `🧩 Solved today's LogicVault puzzle${hintsUsed > 0 ? ` in ${hintsUsed} hints` : ''}! 🔥 Day ${streak} streak. Try it: logicvault.tech/logic`;
  } else {
    text = `🧩 Tried today's LogicVault puzzle. Day ${streak} streak! Can you solve it? logicvault.tech/logic`;
  }
  shareResult(text);
}

// Global instance
let logicGame = null;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LogicPuzzle, shareLogicResult };
}
