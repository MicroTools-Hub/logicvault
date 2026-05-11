/* ========================================
   LOGICVAULT — SHARED UTILITIES
   Common functions used across pages
   ======================================== */

/**
 * Render ad slot placeholder
 * @param {string} size - 'banner' | 'square' | 'leaderboard'
 * @returns {string} HTML string for ad slot
 */
function renderAdSlot(size = 'banner') {
  const sizes = {
    banner:      { w: '100%',  h: '90px',   label: 'Ad · 728×90' },
    square:      { w: '300px', h: '250px',  label: 'Ad · 300×250' },
    leaderboard: { w: '100%',  h: '90px',   label: 'Ad · 970×90' },
  };
  const s = sizes[size] || sizes.banner;
  return `<div class="ad-slot ad-slot--${size}" style="
    width:${s.w}; min-height:${s.h};
    background: var(--surface);
    border: 1px dashed var(--border);
    border-radius: 12px;
    display:flex; align-items:center; justify-content:center;
    color: var(--muted); font-size:11px;
    font-family:'Space Mono',monospace;
    margin: 32px auto; letter-spacing:.05em;
  ">${s.label}</div>`;
}

/**
 * Render streak badge HTML
 * @param {number} count - Current streak count
 * @returns {string} HTML string for streak badge
 */
function renderStreakBadge(count) {
  if (!count || count === 0) {
    return '<span class="streak-badge">No streak</span>';
  }
  const glowing = count >= 3 ? 'glowing' : '';
  return `<span class="streak-badge ${glowing}">🔥 ${count} day${count > 1 ? 's' : ''}</span>`;
}

/**
 * Render XP progress bar HTML
 * @param {number} level - Current level
 * @param {number} xp - Current XP
 * @param {number} xpToNext - XP needed for next level
 * @returns {string} HTML string for XP bar
 */
function renderXPBar(level, xp, xpToNext) {
  const progress = xpToNext > 0 ? (xp / xpToNext) * 100 : 0;
  return `
    <div class="xp-bar-container">
      <div class="xp-bar-label">
        <span>Level ${level} — ${getLevelTitle(level)}</span>
        <span>${xp} / ${xpToNext} XP</span>
      </div>
      <div class="xp-bar">
        <div class="xp-fill" style="width: ${progress}%"></div>
      </div>
    </div>
  `;
}

/**
 * Render level badge HTML
 * @param {number} level - Current level
 * @returns {string} HTML string for level badge
 */
function renderLevelBadge(level) {
  return `<span class="level-badge">Lvl ${level} — ${getLevelTitle(level)}</span>`;
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'info'
 */
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast-container');
  if (existingToast) {
    existingToast.remove();
  }

  const container = document.createElement('div');
  container.className = 'toast-container';
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  document.body.appendChild(container);

  // Auto-remove after 2.5 seconds
  setTimeout(() => {
    container.remove();
  }, 2500);
}

/**
 * Copy text to clipboard and show confirmation
 * @param {string} text - Text to copy
 */
async function shareResult(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard!', 'success');
  }
}

/**
 * Trigger confetti burst animation
 * @param {HTMLElement} targetEl - Element to attach confetti to
 */
function confettiBurst(targetEl) {
  const container = targetEl.querySelector('.confetti-container');
  if (!container) return;

  const colors = ['#4ade80', '#f59e0b', '#f87171', '#818cf8', '#22d3ee', '#ef4444'];
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 1 + 2;
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = color;
    confetti.style.left = `${left}%`;
    confetti.style.animationDelay = `${delay}s`;
    confetti.style.animationDuration = `${duration}s`;
    
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, (duration + delay) * 1000);
  }
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
 * Calculate WPM from characters and time
 * @param {number} correctChars - Number of correctly typed characters
 * @param {number} elapsedSeconds - Time elapsed in seconds
 * @returns {number} Words per minute
 */
function calculateWPM(correctChars, elapsedSeconds) {
  if (elapsedSeconds <= 0) return 0;
  // Standard: 5 characters = 1 word
  return Math.round((correctChars / 5) / (elapsedSeconds / 60));
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
 * Get category display name
 * @param {string} category - Category slug
 * @returns {string} Display name
 */
function getCategoryName(category) {
  const names = {
    motivation: 'Motivation',
    wisdom: 'Wisdom',
    tech: 'Technology',
    literature: 'Literature',
    science: 'Science',
    lateral: 'Lateral Thinking',
    math: 'Math',
    riddle: 'Riddle',
    sequence: 'Sequence',
    visual: 'Visual'
  };
  return names[category] || category;
}

/**
 * Get category icon
 * @param {string} category - Category slug
 * @returns {string} Emoji icon
 */
function getCategoryIcon(category) {
  const icons = {
    motivation: '💪',
    wisdom: '🧠',
    tech: '💻',
    literature: '📚',
    science: '🔬',
    lateral: '💡',
    math: '🔢',
    riddle: '❓',
    sequence: '📈',
    visual: '👁️'
  };
  return icons[category] || '🎯';
}

/**
 * Format time in seconds to MM:SS
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if date is today
 */
function isToday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * Check if date was yesterday
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if date was yesterday
 */
function isYesterday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

/**
 * Get relative date description
 * @param {string} dateString - ISO date string
 * @returns {string} Relative description
 */
function getRelativeDate(dateString) {
  if (!dateString) return '';
  if (isToday(dateString)) return 'Today';
  if (isYesterday(dateString)) return 'Yesterday';
  return formatDate(dateString);
}

/**
 * Generate keyboard heatmap HTML
 * @param {Object} keyStats - Object with key accuracy data
 * @returns {string} HTML string for keyboard
 */
function generateKeyboardHeatmap(keyStats = {}) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  let html = '<div class="keyboard">';
  
  rows.forEach((row, rowIndex) => {
    html += '<div class="keyboard-row">';
    row.forEach(key => {
      const stats = keyStats[key.toLowerCase()];
      let className = 'key';
      
      if (stats) {
        const accuracy = (stats.correct / stats.total) * 100;
        if (accuracy >= 80) className += ' good';
        else if (accuracy < 50) className += ' bad';
      }
      
      html += `<div class="${className}">${key}</div>`;
    });
    html += '</div>';
  });
  
  html += '</div>';
  return html;
}

/**
 * Create simple bar chart HTML
 * @param {Array} data - Array of {value, label} objects
 * @param {number} maxValue - Maximum value for scaling
 * @returns {string} HTML string for bar chart
 */
function generateBarChart(data, maxValue = 100) {
  if (!data || data.length === 0) return '<p>No data yet</p>';
  
  let html = '<div class="bar-chart">';
  
  data.forEach(item => {
    const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
    let barClass = 'bar';
    
    if (item.value < 30) barClass += ' low';
    else if (item.value < 70) barClass += ' medium';
    else barClass += ' high';
    
    html += `<div class="${barClass}" style="height: ${height}%" title="${item.label}: ${item.value}"></div>`;
  });
  
  html += '</div>';
  return html;
}

/**
 * Generate calendar heatmap HTML (GitHub-style)
 * @param {Array} days - Array of 30 day statuses: 'solved' | 'failed' | 'missed'
 * @returns {string} HTML string for calendar heatmap
 */
function generateCalendarHeatmap(days = []) {
  let html = '<div class="calendar-heatmap">';
  
  for (let i = 0; i < 30; i++) {
    const status = days[i] || 'missed';
    html += `<div class="heatmap-cell ${status}" title="Day ${i + 1}"></div>`;
  }
  
  html += '</div>';
  return html;
}

/**
 * Generate pie chart using conic-gradient
 * @param {Object} data - Object with category percentages
 * @returns {string} CSS conic-gradient string
 */
function generatePieChart(data = {}) {
  const colors = {
    lateral: '#4ade80',
    math: '#f59e0b',
    riddle: '#f87171',
    sequence: '#818cf8',
    visual: '#22d3ee'
  };
  
  let gradient = 'conic-gradient(';
  let startAngle = 0;
  const entries = Object.entries(data);
  
  entries.forEach(([category, percentage], index) => {
    const endAngle = startAngle + (percentage * 360);
    const color = colors[category] || '#8888aa';
    gradient += `${color} ${startAngle}deg ${endAngle}deg`;
    
    if (index < entries.length - 1) {
      gradient += ', ';
    }
    
    startAngle = endAngle;
  });
  
  gradient += ')';
  return gradient;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
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
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderAdSlot,
    renderStreakBadge,
    renderXPBar,
    renderLevelBadge,
    showToast,
    shareResult,
    confettiBurst,
    getPerformanceLabel,
    calculateWPM,
    calculateAccuracy,
    getCategoryName,
    getCategoryIcon,
    formatTime,
    isToday,
    isYesterday,
    getRelativeDate,
    generateKeyboardHeatmap,
    generateBarChart,
    generateCalendarHeatmap,
    generatePieChart,
    debounce,
    throttle
  };
}
