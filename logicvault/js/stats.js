/* ========================================
   LOGICVAULT — Stats Engine
   localStorage-based user statistics
   ======================================== */

const STATS_KEY = 'lv_stats';

/**
 * Default stats structure
 */
const DEFAULT_STATS = {
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

/**
 * Get full stats object from localStorage
 * @returns {Object} Stats object
 */
function getStats() {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) {
      return JSON.parse(JSON.stringify(DEFAULT_STATS));
    }
    
    const stats = JSON.parse(stored);
    
    // Merge with defaults to ensure all fields exist
    return {
      ...DEFAULT_STATS,
      ...stats,
      typing: { ...DEFAULT_STATS.typing, ...stats.typing },
      logic: { ...DEFAULT_STATS.logic, ...stats.logic }
    };
  } catch (e) {
    console.error('Error reading stats:', e);
    return JSON.parse(JSON.stringify(DEFAULT_STATS));
  }
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
 * Check and update streaks based on last activity
 * Should be called on page load
 */
function checkAndUpdateStreaks() {
  const stats = getStats();
  let changed = false;
  
  // Check typing streak
  if (stats.typing.lastPlayed) {
    const lastDate = new Date(stats.typing.lastPlayed);
    const today = new Date();
    
    // Normalize to midnight
    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken
      if (stats.typing.currentStreak > 0) {
        stats.typing.currentStreak = 0;
        changed = true;
      }
    }
  }
  
  // Check logic streak
  if (stats.logic.lastSolved) {
    const lastDate = new Date(stats.logic.lastSolved);
    const today = new Date();
    
    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken
      if (stats.logic.currentStreak > 0) {
        stats.logic.currentStreak = 0;
        changed = true;
      }
    }
  }
  
  if (changed) {
    saveStats(stats);
  }
  
  return stats;
}

/**
 * Update stats after typing game
 * @param {number} wpm - Words per minute
 * @param {number} accuracy - Accuracy percentage
 * @param {string} quoteId - Quote ID
 */
function updateTypingGame(wpm, accuracy, quoteId) {
  const stats = checkAndUpdateStreaks();
  const now = new Date().toISOString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate XP
  let xpEarned = 10; // Base XP for completing
  
  if (wpm > 60) xpEarned += 5;
  if (wpm > 100) xpEarned += 10;
  if (accuracy === 100) xpEarned += 10;
  
  // Check if played today for streak
  const lastPlayed = stats.typing.lastPlayed ? new Date(stats.typing.lastPlayed) : null;
  if (lastPlayed) {
    lastPlayed.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastPlayed) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      stats.typing.currentStreak++;
      
      // Bonus XP for streaks
      if (stats.typing.currentStreak >= 7) {
        xpEarned += 10;
      } else if (stats.typing.currentStreak >= 3) {
        xpEarned += 5;
      }
    } else if (diffDays > 1) {
      // Streak broken, reset to 1
      stats.typing.currentStreak = 1;
    }
    // If diffDays === 0, already played today, no streak change
  } else {
    // First time playing
    stats.typing.currentStreak = 1;
  }
  
  // Update longest streak
  if (stats.typing.currentStreak > stats.typing.longestStreak) {
    stats.typing.longestStreak = stats.typing.currentStreak;
  }
  
  // Update typing stats
  stats.typing.gamesPlayed++;
  stats.typing.totalCharsTyped += (wpm * 5 * (accuracy / 100)); // Approximate
  
  if (wpm > stats.typing.bestWPM) {
    stats.typing.bestWPM = wpm;
  }
  
  if (accuracy > stats.typing.bestAccuracy) {
    stats.typing.bestAccuracy = accuracy;
  }
  
  // Calculate new average WPM
  const totalWPM = (stats.typing.avgWPM * (stats.typing.gamesPlayed - 1)) + wpm;
  stats.typing.avgWPM = Math.round(totalWPM / stats.typing.gamesPlayed);
  
  // Add to history (keep last 30)
  stats.typing.history.unshift({
    date: now,
    wpm: wpm,
    accuracy: accuracy,
    quoteId: quoteId
  });
  stats.typing.history = stats.typing.history.slice(0, 30);
  
  // Update last played
  stats.typing.lastPlayed = now;
  
  // Add XP and update level
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
 * Update stats after logic puzzle
 * @param {string} puzzleId - Puzzle ID
 * @param {number} hintsUsed - Number of hints used
 * @param {boolean} solved - Whether puzzle was solved
 */
function updateLogicGame(puzzleId, hintsUsed, solved) {
  const stats = checkAndUpdateStreaks();
  const now = new Date().toISOString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate XP
  let xpEarned = 0;
  
  if (solved) {
    xpEarned = 15; // Base XP for solving
    
    if (hintsUsed === 0) {
      xpEarned += 10; // Bonus for no hints
    }
    
    // Check if solved today for streak
    const lastSolved = stats.logic.lastSolved ? new Date(stats.logic.lastSolved) : null;
    if (lastSolved) {
      lastSolved.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - lastSolved) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        stats.logic.currentStreak++;
        
        // Bonus XP for streaks
        if (stats.logic.currentStreak >= 7) {
          xpEarned += 10;
        } else if (stats.logic.currentStreak >= 3) {
          xpEarned += 5;
        }
      } else if (diffDays > 1) {
        // Streak broken, reset to 1
        stats.logic.currentStreak = 1;
      }
    } else {
      // First time solving
      stats.logic.currentStreak = 1;
    }
    
    // Update longest streak
    if (stats.logic.currentStreak > stats.logic.longestStreak) {
      stats.logic.longestStreak = stats.logic.currentStreak;
    }
    
    // Update solve count
    stats.logic.solved++;
    stats.logic.lastSolved = now;
  } else {
    // Tried but didn't solve
    xpEarned = 5; // Consolation XP
  }
  
  // Update hints used
  stats.logic.hintsUsed += hintsUsed;
  
  // Add to history (keep last 30)
  stats.logic.history.unshift({
    date: now,
    puzzleId: puzzleId,
    hintsUsed: hintsUsed,
    solved: solved
  });
  stats.logic.history = stats.logic.history.slice(0, 30);
  
  // Add XP and update level
  stats.xp += xpEarned;
  stats.level = Math.floor(stats.xp / 100) + 1;
  
  saveStats(stats);
  
  return {
    xpEarned,
    newLevel: stats.level,
    streak: stats.logic.currentStreak,
    solved
  };
}

/**
 * Get level info with XP progress
 * @returns {Object} Level information
 */
function getLevel() {
  const stats = getStats();
  const xpToNext = 100; // XP needed for each level
  const xpInCurrentLevel = stats.xp % 100;
  const progress = xpInCurrentLevel / xpToNext;
  
  const titles = {
    1: 'Beginner',
    5: 'Thinker',
    10: 'Solver',
    20: 'Genius',
    30: 'Legend'
  };
  
  let title = 'Beginner';
  for (const lvl of Object.keys(titles).sort((a, b) => b - a)) {
    if (stats.level >= parseInt(lvl)) {
      title = titles[lvl];
      break;
    }
  }
  
  return {
    level: stats.level,
    xp: stats.xp,
    xpToNext,
    xpInCurrentLevel,
    progress,
    title
  };
}

/**
 * Get streak info for a mode
 * @param {string} mode - 'typing' | 'logic'
 * @returns {Object} Streak information
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (mode === 'typing') {
    if (!stats.typing.lastPlayed) return false;
    const lastPlayed = new Date(stats.typing.lastPlayed);
    lastPlayed.setHours(0, 0, 0, 0);
    return lastPlayed.getTime() === today.getTime();
  } else if (mode === 'logic') {
    if (!stats.logic.lastSolved) return false;
    const lastSolved = new Date(stats.logic.lastSolved);
    lastSolved.setHours(0, 0, 0, 0);
    return lastSolved.getTime() === today.getTime();
  }
  
  return false;
}

/**
 * Get today's result for a mode
 * @param {string} mode - 'typing' | 'logic'
 * @returns {Object|null} Today's result or null
 */
function getTodayResult(mode) {
  const stats = getStats();
  
  if (mode === 'typing' && stats.typing.history.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstEntry = stats.typing.history[0];
    const entryDate = new Date(firstEntry.date);
    entryDate.setHours(0, 0, 0, 0);
    
    if (entryDate.getTime() === today.getTime()) {
      return firstEntry;
    }
  } else if (mode === 'logic' && stats.logic.history.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstEntry = stats.logic.history[0];
    const entryDate = new Date(firstEntry.date);
    entryDate.setHours(0, 0, 0, 0);
    
    if (entryDate.getTime() === today.getTime()) {
      return firstEntry;
    }
  }
  
  return null;
}

/**
 * Reset all stats (for testing/debugging)
 */
function resetAllStats() {
  localStorage.removeItem(STATS_KEY);
  return DEFAULT_STATS;
}

/**
 * Get typing heatmap data (last 30 days)
 * @returns {Array} Array of {date, played, wpm} objects
 */
function getTypingHeatmap() {
  const stats = getStats();
  const heatmap = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const dateStr = date.toISOString().split('T')[0];
    const dayStats = stats.typing.history.filter(h => {
      const hDate = new Date(h.date);
      hDate.setHours(0, 0, 0, 0);
      return hDate.getTime() === date.getTime();
    });
    
    heatmap.push({
      date: dateStr,
      played: dayStats.length > 0,
      avgWpm: dayStats.length > 0 
        ? Math.round(dayStats.reduce((sum, h) => sum + h.wpm, 0) / dayStats.length)
        : 0
    });
  }
  
  return heatmap;
}

/**
 * Get logic heatmap data (last 30 days)
 * @returns {Array} Array of {date, solved, hintsUsed} objects
 */
function getLogicHeatmap() {
  const stats = getStats();
  const heatmap = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const dayStats = stats.logic.history.filter(h => {
      const hDate = new Date(h.date);
      hDate.setHours(0, 0, 0, 0);
      return hDate.getTime() === date.getTime();
    });
    
    heatmap.push({
      date: date.toISOString().split('T')[0],
      solved: dayStats.some(h => h.solved),
      attempted: dayStats.length > 0,
      hintsUsed: dayStats.reduce((sum, h) => sum + h.hintsUsed, 0)
    });
  }
  
  return heatmap;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getStats,
    saveStats,
    checkAndUpdateStreaks,
    updateTypingGame,
    updateLogicGame,
    getLevel,
    getStreak,
    hasPlayedToday,
    getTodayResult,
    resetAllStats,
    getTypingHeatmap,
    getLogicHeatmap
  };
}
