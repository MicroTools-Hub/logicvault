/* ========================================
   LOGICVAULT — Shared Utilities
   Common functions used across pages
   ======================================== */

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date like "Jan 15, 2025"
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Get formatted date for today
 */
function getTodayDate() {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Render ad slot placeholder
 * @param {string} size - 'banner' | 'square' | 'leaderboard'
 * @returns {string} HTML string
 */
function renderAdSlot(size = 'banner') {
  const sizes = {
    banner:      { w: '100%', h: '90px', label: 'Ad · 728×90' },
    square:      { w: '300px', h: '250px', label: 'Ad · 300×250' },
    leaderboard: { w: '100%', h: '90px', label: 'Ad · 970×90' },
  };
  const s = sizes[size] || sizes.banner;
  
  const adDiv = document.createElement('div');
  adDiv.className = `ad-slot ad-slot--${size}`;
  adDiv.style.cssText = `
    width: ${s.w}; 
    min-height: ${s.h};
    background: var(--surface);
    border: 1px dashed var(--border);
    border-radius: 12px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: var(--muted); 
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    margin: 32px auto; 
    letter-spacing: .05em;
  `;
  adDiv.textContent = s.label;
  
  return adDiv;
}

/**
 * Render streak badge HTML
 * @param {number} count - Streak count
 * @returns {string} HTML string
 */
function renderStreakBadge(count) {
  if (count <= 0) return '';
  
  const activeClass = count >= 3 ? 'nav__streak--active' : '';
  return `
    <div class="nav__streak ${activeClass}">
      <span>🔥</span>
      <span>${count} day${count > 1 ? 's' : ''}</span>
    </div>
  `;
}

/**
 * Render XP progress bar HTML
 * @param {number} level - Current level
 * @param {number} xp - Current XP
 * @param {number} xpToNext - XP needed for next level
 * @returns {string} HTML string
 */
function renderXPBar(level, xp, xpToNext) {
  const progress = xpToNext > 0 ? (xp / xpToNext) * 100 : 0;
  
  return `
    <div class="xp-bar-container">
      <div class="xp-bar__text">
        <span>Level ${level}</span>
        <span>${xp} / ${xpToNext} XP</span>
      </div>
      <div class="xp-bar">
        <div class="xp-bar__fill" style="width: ${progress}%"></div>
      </div>
    </div>
  `;
}

/**
 * Render level badge HTML
 * @param {number} level - Current level
 * @returns {string} HTML string
 */
function renderLevelBadge(level) {
  const titles = {
    1: 'Beginner',
    5: 'Thinker',
    10: 'Solver',
    20: 'Genius',
    30: 'Legend'
  };
  
  let title = 'Beginner';
  for (const lvl of Object.keys(titles).sort((a, b) => b - a)) {
    if (level >= parseInt(lvl)) {
      title = titles[lvl];
      break;
    }
  }
  
  return `
    <div class="level-badge">
      <span class="level-badge__num">Lvl ${level}</span>
      <span class="level-badge__title">${title}</span>
    </div>
  `;
}

/**
 * Create confetti burst animation
 * @param {HTMLElement} targetEl - Element to attach confetti to
 */
function confettiBurst(targetEl) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  targetEl.appendChild(container);
  
  const colors = ['#4ade80', '#f59e0b', '#818cf8', '#f87171', '#22d3ee', '#ef4444'];
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    // Random shapes
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '50%';
    }
    
    container.appendChild(confetti);
  }
  
  // Clean up after animation
  setTimeout(() => {
    container.remove();
  }, 5000);
}

/**
 * Share result to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function shareResult(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard!', 'success');
    return true;
  }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'info'
 */
function showToast(message, type = 'info') {
  // Create container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ'
  };
  
  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${icons[type]}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after 2.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/**
 * Get difficulty badge class
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 * @returns {string} CSS class
 */
function getDifficultyClass(difficulty) {
  return `difficulty--${difficulty}`;
}

/**
 * Get category icon
 * @param {string} category - Category name
 * @returns {string} Emoji icon
 */
function getCategoryIcon(category) {
  const icons = {
    motivation: '💪',
    wisdom: '🧠',
    tech: '💻',
    literature: '📚',
    science: '🔬',
    lateral: '🤔',
    math: '🔢',
    riddle: '❓',
    sequence: '📈',
    visual: '👁️'
  };
  return icons[category] || '⭐';
}

/**
 * Get performance label based on WPM
 * @param {number} wpm - Words per minute
 * @returns {string} Performance label with emoji
 */
function getPerformanceLabel(wpm) {
  if (wpm < 30) return "Keep Practicing 💪";
  if (wpm < 50) return "Getting There! 🌱";
  if (wpm < 70) return "Solid Speed! ⚡";
  if (wpm < 90) return "Great Speed! 🚀";
  if (wpm < 110) return "Blazing Fast! 🔥";
  return "Legendary! 👑";
}

/**
 * Calculate WPM from characters typed and time
 * @param {number} correctChars - Number of correct characters
 * @param {number} timeSeconds - Time in seconds
 * @returns {number} WPM rounded to nearest integer
 */
function calculateWPM(correctChars, timeSeconds) {
  if (timeSeconds <= 0) return 0;
  const words = correctChars / 5;
  const minutes = timeSeconds / 60;
  return Math.round(words / minutes);
}

/**
 * Calculate accuracy percentage
 * @param {number} correct - Correct characters
 * @param {number} total - Total characters typed
 * @returns {number} Accuracy percentage (0-100)
 */
function calculateAccuracy(correct, total) {
  if (total === 0) return 100;
  return Math.round((correct / total) * 100 * 10) / 10;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if two dates are consecutive days
 * @param {string} date1 - First date (ISO string)
 * @param {string} date2 - Second date (ISO string)
 * @returns {boolean} True if consecutive
 */
function areConsecutiveDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  // Normalize to midnight
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays === 1;
}

/**
 * Check if a date is today
 * @param {string} dateString - Date to check
 * @returns {boolean} True if today
 */
function isToday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

/**
 * Check if a date is yesterday
 * @param {string} dateString - Date to check
 * @returns {boolean} True if yesterday
 */
function isYesterday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return date.getDate() === yesterday.getDate() &&
         date.getMonth() === yesterday.getMonth() &&
         date.getFullYear() === yesterday.getFullYear();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatDate,
    getTodayDate,
    renderAdSlot,
    renderStreakBadge,
    renderXPBar,
    renderLevelBadge,
    confettiBurst,
    shareResult,
    showToast,
    getDifficultyClass,
    getCategoryIcon,
    getPerformanceLabel,
    calculateWPM,
    calculateAccuracy,
    escapeHtml,
    debounce,
    areConsecutiveDays,
    isToday,
    isYesterday
  };
}
