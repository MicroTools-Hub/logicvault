/* ========================================
   LOGICVAULT — STATS ENGINE
   LocalStorage-based user statistics
   ======================================== */

const STATS_KEY = 'lv_stats';

/**
 * Get default stats structure
 */
function getDefaultStats() {
  return {
    typing: {
      gamesPlayed: 0,
      bestWPM: 0,
      avgWPM: 0,
      bestAccuracy: 0,
      totalCharsTyped: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPlayed: null,
      history: []
    },
    logic: {
      solved: 0,
      hintsUsed: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSolved: null,
      history: []
    },
    xp: 0,
    level: 1
  };
}

/**
 * Get full stats object from localStorage
 * @returns {Object} Stats object
 */
function getStats() {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading stats:', e);
  }
  
  // Return default stats if nothing stored or error
  return getDefaultStats();
}

/**
 * Save stats to localStorage
 * @param {Object} stats - Stats object to save
 */
function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats:', e);
  }
}

/**
 * Check and update streaks on page load
 * Handles streak logic based on last activity
 */
function checkAndUpdateStreaks() {
  const stats = getStats();
  const today = new Date().toDateString();
  
  // Check typing streak
  if (stats.typing.lastPlayed) {
    const lastPlayed = new Date(stats.typing.lastPlayed);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastPlayed.toDateString() !== today) {
      if (lastPlayed.toDateString() === yesterday.toDateString()) {
        // Played yesterday, streak continues (will increment when played today)
      } else if (lastPlayed.toDateString() !== today) {
        // Last played was more than 1 day ago, reset streak
        stats.typing.currentStreak = 0;
      }
    }
  }
  
  // Check logic streak
  if (stats.logic.lastSolved) {
    const lastSolved = new Date(stats.logic.lastSolved);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastSolved.toDateString() !== today) {
      if (lastSolved.toDateString() === yesterday.toDateString()) {
        // Solved yesterday, streak continues (will increment when solved today)
      } else if (lastSolved.toDateString() !== today) {
        // Last solved was more than 1 day ago, reset streak
        stats.logic.currentStreak = 0;
      }
    }
  }
  
  saveStats(stats);
  return stats;
}

/**
 * Update stats after typing game completion
 * @param {number} wpm - Words per minute achieved
 * @param {number} accuracy - Accuracy percentage (0-100)
 * @param {string} quoteId - ID of the quote used
 * @param {Object} keyStats - Optional key-by-key accuracy data
 */
function updateTypingGame(wpm, accuracy, quoteId, keyStats = {}) {
  const stats = getStats();
  const today = new Date().toISOString();
  const todayStr = today.split('T')[0];
  
  // Update typing stats
  stats.typing.gamesPlayed++;
  stats.typing.totalCharsTyped += Math.round(wpm * 5); // Approximate chars
  
  // Update best WPM
  if (wpm > stats.typing.bestWPM) {
    stats.typing.bestWPM = wpm;
  }
  
  // Update best accuracy
  if (accuracy > stats.typing.bestAccuracy) {
    stats.typing.bestAccuracy = accuracy;
  }
  
  // Calculate new average WPM
  const totalWPM = stats.typing.avgWPM * (stats.typing.gamesPlayed - 1) + wpm;
  stats.typing.avgWPM = Math.round(totalWPM / stats.typing.gamesPlayed);
  
  // Update streak
  if (stats.typing.lastPlayed) {
    const lastPlayed = new Date(stats.typing.lastPlayed);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastPlayed.toDateString() === yesterday.toDateString()) {
      stats.typing.currentStreak++;
    } else if (lastPlayed.toDateString() !== todayStr) {
      stats.typing.currentStreak = 1;
    }
  } else {
    stats.typing.currentStreak = 1;
  }
  
  // Update longest streak
  if (stats.typing.currentStreak > stats.typing.longestStreak) {
    stats.typing.longestStreak = stats.typing.currentStreak;
  }
  
  stats.typing.lastPlayed = today;
  
  // Add to history (keep last 30)
  stats.typing.history.unshift({
    date: today,
    wpm,
    accuracy,
    quoteId
  });
  if (stats.typing.history.length > 30) {
    stats.typing.history.pop();
  }
  
  // Calculate and add XP
  let xpEarned = 10; // Base XP for completing
  if (wpm > 60) xpEarned += 5;
  if (wpm > 100) xpEarned += 15;
  if (accuracy === 100) xpEarned += 10;
  
  // Streak bonus
  if (stats.typing.currentStreak >= 7) {
    xpEarned += 10;
  } else if (stats.typing.currentStreak >= 3) {
    xpEarned += 5;
  }
  
  stats.xp += xpEarned;
  stats.level = Math.floor(stats.xp / 100) + 1;
  
  saveStats(stats);
  
  return {
    xpEarned,
    newLevel: stats.level,
    streak: stats.typing.currentStreak
  };
}

/**
 * Update stats after logic puzzle completion
 * @param {string} puzzleId - ID of the puzzle
 * @param {number} hintsUsed - Number of hints used (0-3)
 * @param {boolean} solved - Whether puzzle was solved correctly
 */
function updateLogicGame(puzzleId, hintsUsed, solved) {
  const stats = getStats();
  const today = new Date().toISOString();
  const todayStr = today.split('T')[0];
  
  // Update hints used
  stats.logic.hintsUsed += hintsUsed;
  
  if (solved) {
    stats.logic.solved++;
    
    // Update streak
    if (stats.logic.lastSolved) {
      const lastSolved = new Date(stats.logic.lastSolved);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastSolved.toDateString() === yesterday.toDateString()) {
        stats.logic.currentStreak++;
      } else if (lastSolved.toDateString() !== todayStr) {
        stats.logic.currentStreak = 1;
      }
    } else {
      stats.logic.currentStreak = 1;
    }
    
    // Update longest streak
    if (stats.logic.currentStreak > stats.logic.longestStreak) {
      stats.logic.longestStreak = stats.logic.currentStreak;
    }
    
    stats.logic.lastSolved = today;
  }
  
  // Add to history (keep last 30)
  stats.logic.history.unshift({
    date: today,
    puzzleId,
    hintsUsed,
    solved
  });
  if (stats.logic.history.length > 30) {
    stats.logic.history.pop();
  }
  
  // Calculate and add XP
  let xpEarned = 0;
  
  if (solved) {
    xpEarned = 15; // Base XP for solving
    
    if (hintsUsed === 0) {
      xpEarned += 10; // Bonus for no hints
    }
    
    // Streak bonus
    if (stats.logic.currentStreak >= 7) {
      xpEarned += 10;
    } else if (stats.logic.currentStreak >= 3) {
      xpEarned += 5;
    }
  } else {
    xpEarned = 5; // Consolation XP for trying
  }
  
  stats.xp += xpEarned;
  stats.level = Math.floor(stats.xp / 100) + 1;
  
  saveStats(stats);
  
  return {
    xpEarned,
    newLevel: stats.level,
    streak: stats.logic.currentStreak
  };
}

/**
 * Get level information
 * @returns {Object} Level info with progress
 */
function getLevel() {
  const stats = getStats();
  const level = stats.level;
  const xpToCurrent = (level - 1) * 100;
  const xpToNext = level * 100;
  const xpInCurrentLevel = stats.xp - xpToCurrent;
  const xpNeeded = 100;
  const progress = xpInCurrentLevel / xpNeeded;
  
  return {
    level,
    title: getLevelTitle(level),
    xp: stats.xp,
    xpToNext,
    xpInCurrentLevel,
    progress: Math.min(progress, 1)
  };
}

/**
 * Get streak information for a mode
 * @param {string} mode - 'typing' | 'logic'
 * @returns {Object} Streak info
 */
function getStreak(mode) {
  const stats = getStats();
  
  if (mode === 'typing') {
    return {
      current: stats.typing.currentStreak,
      longest: stats.typing.longestStreak
    };
  } else if (mode === 'logic') {
    return {
      current: stats.logic.currentStreak,
      longest: stats.logic.longestStreak
    };
  }
  
  return { current: 0, longest: 0 };
}

/**
 * Check if user has played today
 * @param {string} mode - 'typing' | 'logic'
 * @returns {boolean} True if played today
 */
function hasPlayedToday(mode) {
  const stats = getStats();
  const today = new Date().toDateString();
  
  if (mode === 'typing') {
    if (!stats.typing.lastPlayed) return false;
    return new Date(stats.typing.lastPlayed).toDateString() === today;
  } else if (mode === 'logic') {
    if (!stats.logic.lastSolved) return false;
    return new Date(stats.logic.lastSolved).toDateString() === today;
  }
  
  return false;
}

/**
 * Get today's play count
 * @param {string} mode - 'typing' | 'logic'
 * @returns {number} Count of plays today
 */
function getTodayPlayCount(mode) {
  const stats = getStats();
  const today = new Date().toDateString();
  let count = 0;
  
  if (mode === 'typing') {
    stats.typing.history.forEach(game => {
      if (new Date(game.date).toDateString() === today) {
        count++;
      }
    });
  } else if (mode === 'logic') {
    stats.logic.history.forEach(game => {
      if (new Date(game.date).toDateString() === today) {
        count++;
      }
    });
  }
  
  return count;
}

/**
 * Get recent games for chart display
 * @param {string} mode - 'typing' | 'logic'
 * @param {number} limit - Number of games to return
 * @returns {Array} Recent games array
 */
function getRecentGames(mode, limit = 7) {
  const stats = getStats();
  
  if (mode === 'typing') {
    return stats.typing.history.slice(0, limit);
  } else if (mode === 'logic') {
    return stats.logic.history.slice(0, limit);
  }
  
  return [];
}

/**
 * Get solve rate for logic puzzles
 * @returns {number} Solve rate percentage
 */
function getSolveRate() {
  const stats = getStats();
  const attempted = stats.logic.history.length;
  if (attempted === 0) return 0;
  return Math.round((stats.logic.solved / attempted) * 100);
}

/**
 * Get average hints used
 * @returns {number} Average hints per puzzle
 */
function getAvgHints() {
  const stats = getStats();
  const attempted = stats.logic.history.length;
  if (attempted === 0) return 0;
  return Math.round((stats.logic.hintsUsed / attempted) * 10) / 10;
}

/**
 * Get category breakdown for logic puzzles
 * @returns {Object} Category percentages
 */
function getCategoryBreakdown() {
  const stats = getStats();
  const breakdown = {};
  const total = stats.logic.solved || 1;
  
  stats.logic.history.forEach(game => {
    if (game.solved) {
      const puzzle = getPuzzleById(game.puzzleId);
      if (puzzle) {
        breakdown[puzzle.category] = (breakdown[puzzle.category] || 0) + 1;
      }
    }
  });
  
  // Convert to percentages
  Object.keys(breakdown).forEach(cat => {
    breakdown[cat] = Math.round((breakdown[cat] / total) * 100);
  });
  
  return breakdown;
}

/**
 * Reset all stats (with confirmation)
 * @returns {boolean} True if reset was performed
 */
function resetAllStats() {
  if (confirm('Are you sure you want to reset all your stats? This cannot be undone!')) {
    localStorage.removeItem(STATS_KEY);
    return true;
  }
  return false;
}

// Initialize streaks on load
checkAndUpdateStreaks();

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getStats,
    saveStats,
    updateTypingGame,
    updateLogicGame,
    getLevel,
    getStreak,
    hasPlayedToday,
    getTodayPlayCount,
    getRecentGames,
    getSolveRate,
    getAvgHints,
    getCategoryBreakdown,
    resetAllStats
  };
}
