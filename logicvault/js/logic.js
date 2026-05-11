/* ========================================
   LOGICVAULT — LOGIC PUZZLE GAME
   Handles the daily logic puzzle challenge
   ======================================== */

class LogicGame {
  constructor() {
    this.puzzle = null;
    this.hintsRevealed = 0;
    this.hasSubmitted = false;
    this.hasSelfReported = false;
    
    this.init();
  }
  
  init() {
    // Get puzzle from URL param or use today's
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleId = urlParams.get('puzzle');
    
    if (puzzleId) {
      this.puzzle = getPuzzleById(puzzleId);
    } else {
      this.puzzle = getTodayPuzzle();
    }
    
    if (!this.puzzle) {
      showToast('Error loading puzzle', 'error');
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
    
    const puzzleNumEl = document.getElementById('puzzle-number');
    if (puzzleNumEl) {
      const index = getTodayIndex(PUZZLES);
      puzzleNumEl.textContent = `#${index + 1}`;
    }
    
    const categoryEl = document.getElementById('category-badge');
    if (categoryEl) {
      categoryEl.textContent = getCategoryName(this.puzzle.category);
    }
    
    const difficultyEl = document.getElementById('difficulty-badge');
    if (difficultyEl) {
      difficultyEl.textContent = this.puzzle.difficulty.toUpperCase();
      difficultyEl.className = `difficulty-badge difficulty-${this.puzzle.difficulty}`;
    }
    
    // Render puzzle
    this.renderPuzzle();
  }
  
  renderPuzzle() {
    const questionEl = document.getElementById('puzzle-question');
    if (questionEl) {
      questionEl.textContent = this.puzzle.question;
    }
    
    const categoryBadge = document.getElementById('puzzle-category');
    if (categoryBadge) {
      categoryBadge.textContent = `${getCategoryIcon(this.puzzle.category)} ${getCategoryName(this.puzzle.category)}`;
    }
  }
  
  bindEvents() {
    // Hint buttons
    const hintBtns = document.querySelectorAll('.hint-btn');
    hintBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => this.revealHint(index + 1));
    });
    
    // Submit answer button
    const submitBtn = document.getElementById('submit-answer');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitAnswer());
    }
    
    // Allow Enter key to submit (for math/sequence puzzles)
    const answerInput = document.getElementById('answer-input');
    if (answerInput && this.puzzle.category === 'math' || this.puzzle.category === 'sequence') {
      answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitAnswer();
        }
      });
    }
  }
  
  revealHint(hintNum) {
    if (this.hintsRevealed >= hintNum) return;
    
    // Check if previous hints are revealed
    if (hintNum > 1 && this.hintsRevealed < hintNum - 1) {
      showToast(`Reveal hint ${hintNum - 1} first!`, 'info');
      return;
    }
    
    this.hintsRevealed = hintNum;
    
    // Update button states
    for (let i = 1; i <= hintNum; i++) {
      const btn = document.getElementById(`hint-btn-${i}`);
      if (btn) {
        btn.classList.add('used');
        btn.disabled = true;
        btn.textContent = `✓ Hint ${i}`;
      }
      
      // Show hint text
      const hintText = document.getElementById(`hint-text-${i}`);
      if (hintText) {
        hintText.classList.remove('hidden');
      }
    }
    
    // Enable next hint button
    const nextBtn = document.getElementById(`hint-btn-${hintNum + 1}`);
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }
  
  submitAnswer() {
    if (this.hasSubmitted) return;
    
    const answerInput = document.getElementById('answer-input');
    if (!answerInput) return;
    
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
      showToast('Please enter an answer', 'error');
      return;
    }
    
    this.hasSubmitted = true;
    
    // For math/sequence, auto-grade
    if (this.puzzle.category === 'math' || this.puzzle.category === 'sequence') {
      this.autoGradeAnswer(userAnswer);
    } else {
      // For lateral/riddle/visual, show reveal and self-report
      this.showRevealSection();
    }
  }
  
  autoGradeAnswer(userAnswer) {
    // Normalize answers for comparison
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    const correctAnswer = normalize(this.puzzle.answer.split('.')[0]); // Take first sentence for math
    const userNormalized = normalize(userAnswer);
    
    // Try to extract number from user answer
    const numberMatch = userAnswer.match(/[\d.]+/);
    const userNumber = numberMatch ? numberMatch[0] : userNormalized;
    
    // Extract number from correct answer
    const correctNumber = this.puzzle.answer.match(/[\d.]+/);
    const correctNum = correctNumber ? correctNumber[0] : correctAnswer;
    
    const isCorrect = userNumber === correctNum || userNormalized === correctAnswer;
    
    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
    
    // Show reveal section regardless
    setTimeout(() => {
      this.showRevealSection();
    }, 500);
  }
  
  showRevealSection() {
    const answerSection = document.getElementById('answer-section');
    if (!answerSection) return;
    
    const revealHTML = `
      <div class="reveal-section" id="reveal-section">
        <h3 class="mb-2">🎯 The Answer</h3>
        <p class="reveal-answer">${this.puzzle.answer}</p>
        
        <div class="reveal-actions mt-3">
          <button class="btn btn-primary" onclick="logicGame.selfReport(true)">
            ✓ Yes, I got it!
          </button>
          <button class="btn btn-secondary" onclick="logicGame.selfReport(false)">
            ✗ Not quite
          </button>
        </div>
      </div>
    `;
    
    answerSection.insertAdjacentHTML('afterend', revealHTML);
    
    // Scroll to reveal
    setTimeout(() => {
      document.getElementById('reveal-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
  
  handleCorrectAnswer() {
    showToast('Correct! 🎉', 'success');
    
    const answerSection = document.getElementById('answer-section');
    if (answerSection) {
      answerSection.style.borderColor = 'var(--correct)';
    }
  }
  
  handleIncorrectAnswer() {
    showToast('Not quite, keep trying!', 'error');
    
    const answerSection = document.getElementById('answer-section');
    if (answerSection) {
      answerSection.classList.add('shake');
      answerSection.style.borderColor = 'var(--wrong)';
      
      setTimeout(() => {
        answerSection.classList.remove('shake');
      }, 500);
    }
  }
  
  selfReport(solved) {
    if (this.hasSelfReported) return;
    this.hasSelfReported = true;
    
    // Update stats
    const result = updateLogicGame(this.puzzle.id, this.hintsRevealed, solved);
    
    // Hide reveal section actions
    const revealActions = document.querySelector('#reveal-section .reveal-actions');
    if (revealActions) {
      revealActions.classList.add('hidden');
    }
    
    // Show completion message
    this.showCompletion(solved, result);
  }
  
  showCompletion(solved, result) {
    const container = document.querySelector('.logic-container');
    if (!container) return;
    
    const completionHTML = `
      <div class="completion-screen mt-4" id="completion-screen">
        <div class="confetti-container"></div>
        
        ${solved ? `
          <h2 class="result-title">🎉 Solved!</h2>
          <p class="result-label">Great job! You cracked today's puzzle.</p>
        ` : `
          <h2 class="result-title">💪 Keep Practicing!</h2>
          <p class="result-label">You'll get the next one!</p>
        `}
        
        <div class="result-xp mb-3">
          ⚡ XP earned: +${result.xpEarned}
        </div>
        
        ${renderStreakBadge(result.streak)}
        
        <div class="result-actions mt-4">
          <button class="btn btn-secondary btn-small" onclick="shareLogicResult(${solved}, ${this.hintsRevealed}, ${result.streak})">
            📤 Share
          </button>
          <a href="typing.html" class="btn btn-primary btn-small">
            ⌨️ Try Typing Challenge
          </a>
          <a href="archive.html" class="btn btn-ghost btn-small">
            📚 Browse Past Puzzles
          </a>
        </div>
      </div>
    `;
    
    // Insert after puzzle card
    const puzzleCard = document.querySelector('.puzzle-card');
    if (puzzleCard) {
      puzzleCard.insertAdjacentHTML('afterend', completionHTML);
    }
    
    // Trigger confetti if solved
    if (solved) {
      setTimeout(() => {
        const completionScreen = document.getElementById('completion-screen');
        if (completionScreen) {
          confettiBurst(completionScreen);
        }
      }, 100);
    }
    
    // Scroll to completion
    setTimeout(() => {
      document.getElementById('completion-screen')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }
}

// Share function for global access
function shareLogicResult(solved, hintsUsed, streak) {
  if (solved) {
    const hintText = hintsUsed > 0 ? `in ${hintsUsed} hint${hintsUsed > 1 ? 's' : ''}` : 'without hints';
    const text = `🧩 Solved today's LogicVault puzzle ${ hintText }! 🔥 Day ${streak} streak. Try it: logicvault.tech/logic`;
    shareResult(text);
  } else {
    const text = `🧩 Tried today's LogicVault puzzle. Day ${streak} streak. Can you solve it? logicvault.tech/logic`;
    shareResult(text);
  }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on logic page
  if (document.getElementById('puzzle-question')) {
    window.logicGame = new LogicGame();
  }
});
