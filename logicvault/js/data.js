/* ========================================
   LOGICVAULT — DATA LAYER
   60 Quotes + 60 Puzzles
   ======================================== */

// ============================================
// QUOTES DATA (60 entries)
// ============================================
const QUOTES = [
  // MOTIVATION (12 quotes)
  { id: "q001", text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation", difficulty: "easy" },
  { id: "q002", text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation", difficulty: "easy" },
  { id: "q003", text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "motivation", difficulty: "medium" },
  { id: "q004", text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation", difficulty: "easy" },
  { id: "q005", text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation", difficulty: "medium" },
  { id: "q006", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "motivation", difficulty: "medium" },
  { id: "q007", text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation", difficulty: "medium" },
  { id: "q008", text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett", category: "motivation", difficulty: "hard" },
  { id: "q009", text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela", category: "motivation", difficulty: "medium" },
  { id: "q010", text: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", author: "Aristotle", category: "motivation", difficulty: "medium" },
  { id: "q011", text: "Do what you can with all you have, wherever you are.", author: "Theodore Roosevelt", category: "motivation", difficulty: "easy" },
  { id: "q012", text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "motivation", difficulty: "easy" },

  // WISDOM (12 quotes)
  { id: "q013", text: "The unexamined life is not worth living.", author: "Socrates", category: "wisdom", difficulty: "easy" },
  { id: "q014", text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom", difficulty: "easy" },
  { id: "q015", text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom", difficulty: "easy" },
  { id: "q016", text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom", difficulty: "easy" },
  { id: "q017", text: "It is the mark of an educated mind to be able to entertain a thought without accepting it.", author: "Aristotle", category: "wisdom", difficulty: "medium" },
  { id: "q018", text: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare", category: "wisdom", difficulty: "medium" },
  { id: "q019", text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "wisdom", difficulty: "easy" },
  { id: "q020", text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom", difficulty: "easy" },
  { id: "q021", text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche", category: "wisdom", difficulty: "easy" },
  { id: "q022", text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "wisdom", difficulty: "easy" },
  { id: "q023", text: "When the student is ready, the teacher will appear. When the student is truly ready, the teacher will disappear.", author: "Lao Tzu", category: "wisdom", difficulty: "medium" },
  { id: "q024", text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "wisdom", difficulty: "medium" },

  // TECH (12 quotes)
  { id: "q025", text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "tech", difficulty: "easy" },
  { id: "q026", text: "Fix the cause, not the symptom.", author: "Steve Maguire", category: "tech", difficulty: "easy" },
  { id: "q027", text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "tech", difficulty: "easy" },
  { id: "q028", text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "tech", difficulty: "easy" },
  { id: "q029", text: "You cannot escape the responsibility of tomorrow by evading it today.", author: "Abraham Lincoln", category: "tech", difficulty: "medium" },
  { id: "q030", text: "The most damaging phrase in the language is: 'We've always done it this way.'", author: "Grace Hopper", category: "tech", difficulty: "medium" },
  { id: "q031", text: "Optimism is an occupational hazard of programming: feedback is the treatment.", author: "Kent Beck", category: "tech", difficulty: "medium" },
  { id: "q032", text: "Knowledge is power, but enthusiasm pushes the switch.", author: "Unknown", category: "tech", difficulty: "easy" },
  { id: "q033", text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", category: "tech", difficulty: "easy" },
  { id: "q034", text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", category: "tech", difficulty: "medium" },
  { id: "q035", text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", category: "tech", difficulty: "easy" },
  { id: "q036", text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson", category: "tech", difficulty: "easy" },

  // LITERATURE (12 quotes)
  { id: "q037", text: "To be, or not to be, that is the question.", author: "William Shakespeare", category: "literature", difficulty: "easy" },
  { id: "q038", text: "It was the best of times, it was the worst of times.", author: "Charles Dickens", category: "literature", difficulty: "easy" },
  { id: "q039", text: "All happy families are alike; each unhappy family is unhappy in its own way.", author: "Leo Tolstoy", category: "literature", difficulty: "medium" },
  { id: "q040", text: "In my end is my beginning.", author: "Mary Queen of Scots", category: "literature", difficulty: "easy" },
  { id: "q041", text: "Whatever you are, be a good one.", author: "Abraham Lincoln", category: "literature", difficulty: "easy" },
  { id: "q042", text: "So we beat on, boats against the current, borne back ceaselessly into the past.", author: "F. Scott Fitzgerald", category: "literature", difficulty: "medium" },
  { id: "q043", text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", author: "Jane Austen", category: "literature", difficulty: "hard" },
  { id: "q044", text: "Call me Ishmael.", author: "Herman Melville", category: "literature", difficulty: "easy" },
  { id: "q045", text: "The person, be it gentleman or lady, who has not pleasure in reading a good novel, must be intolerably stupid.", author: "Jane Austen", category: "literature", difficulty: "medium" },
  { id: "q046", text: "Words have no single fixed meaning. They are shaped by use and context.", author: "Ursula K. Le Guin", category: "literature", difficulty: "medium" },
  { id: "q047", text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin", category: "literature", difficulty: "medium" },
  { id: "q048", text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou", category: "literature", difficulty: "medium" },

  // SCIENCE (12 quotes)
  { id: "q049", text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan", category: "science", difficulty: "medium" },
  { id: "q050", text: "Imagination is more important than knowledge.", author: "Albert Einstein", category: "science", difficulty: "easy" },
  { id: "q051", text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson", category: "science", difficulty: "medium" },
  { id: "q052", text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan", category: "science", difficulty: "easy" },
  { id: "q053", text: "Equipped with his five senses, man explores the universe around him and calls the adventure Science.", author: "Edwin Hubble", category: "science", difficulty: "medium" },
  { id: "q054", text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie", category: "science", difficulty: "easy" },
  { id: "q055", text: "The important thing is not to stop questioning.", author: "Albert Einstein", category: "science", difficulty: "easy" },
  { id: "q056", text: "Science knows no country, because knowledge belongs to humanity.", author: "Louis Pasteur", category: "science", difficulty: "medium" },
  { id: "q057", text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun", category: "science", difficulty: "easy" },
  { id: "q058", text: "The universe is full of magical things, patiently waiting for our wits to grow sharper.", author: "Eden Phillpotts", category: "science", difficulty: "medium" },
  { id: "q059", text: "If I have seen further, it is by standing on the shoulders of giants.", author: "Isaac Newton", category: "science", difficulty: "easy" },
  { id: "q060", text: "Doubt is not a pleasant condition, but certainty is absurd.", author: "Voltaire", category: "science", difficulty: "easy" }
];

// ============================================
// PUZZLES DATA (60 entries)
// ============================================
const PUZZLES = [
  // LATERAL THINKING (15 puzzles)
  { id: "p001", question: "A man walks into a restaurant and orders albatross soup. After one sip, he goes home and kills himself. Why?", answer: "He was a sailor stranded on an island. His companions told him they were eating albatross soup, but they were actually feeding him his dead wife. When he tasted real albatross at the restaurant, he realized the truth.", hint1: "Think about what he ate before.", hint2: "He had been stranded somewhere remote.", hint3: "The soup tastes different from what he remembered.", category: "lateral", difficulty: "hard", tags: ["classic", "dark"] },
  { id: "p002", question: "A woman shoots her husband. Then she holds him under water for five minutes. Finally, she hangs him. But they both go out together and enjoy a wonderful dinner. How?", answer: "The woman is a photographer. She shot a photo of her husband, developed it in water, and hung it up to dry.", hint1: "No violence is involved.", hint2: "Think about different meanings of 'shoot'.", hint3: "It involves photography.", category: "lateral", difficulty: "medium", tags: ["wordplay"] },
  { id: "p003", question: "A man is found dead in a field with a pack on his back. There are no footprints around him. How did he die?", answer: "He died from a parachute failure. The pack is his unopened parachute.", hint1: "The pack is important.", hint2: "He came from above.", hint3: "Think about what could be in a backpack.", category: "lateral", difficulty: "medium", tags: ["classic"] },
  { id: "p004", question: "Two fathers and two sons went fishing. They caught three fish, yet each person got a whole fish. How?", answer: "There were only three people: a grandfather, his son, and his grandson. The grandfather is a father, the son is both a father and a son, and the grandson is a son.", hint1: "Count the actual number of people.", hint2: "Some people have multiple roles.", hint3: "There are only three people total.", category: "lateral", difficulty: "easy", tags: ["family"] },
  { id: "p005", question: "A truck driver is going down a one-way street the wrong way. A police officer sees him but doesn't stop him. Why?", answer: "The truck driver was walking, not driving.", hint1: "He's not in his truck.", hint2: "Read the scenario carefully.", hint3: "His mode of transport matters.", category: "lateral", difficulty: "easy", tags: ["wordplay"] },
  { id: "p006", question: "Emily's mother has three daughters. The first is named April, the second is named May. What is the third daughter's name?", answer: "Emily. The question states 'Emily's mother'.", hint1: "Read the first word again.", hint2: "The answer is in the question.", hint3: "It's not June.", category: "lateral", difficulty: "easy", tags: ["trick"] },
  { id: "p007", question: "A man lives on the 10th floor. Every day he takes the elevator down to the ground floor. When he returns, he takes the elevator to the 7th floor and walks up the stairs. Except on rainy days, when he goes all the way to the 10th floor. Why?", answer: "The man is a dwarf and can't reach the button for the 10th floor. On rainy days, he uses his umbrella to press it.", hint1: "Physical limitation is involved.", hint2: "Weather affects his ability.", hint3: "He needs help reaching higher buttons.", category: "lateral", difficulty: "medium", tags: ["classic"] },
  { id: "p008", question: "What gets wetter the more it dries?", answer: "A towel.", hint1: "It's something you use after bathing.", hint2: "Its purpose is drying things.", hint3: "Common household item.", category: "lateral", difficulty: "easy", tags: ["riddle"] },
  { id: "p009", question: "A cowboy rides into town on Friday, stays for three days, and leaves on Friday. How?", answer: "Friday is the name of his horse.", hint1: "Friday isn't a day of the week here.", hint2: "Think about what else Friday could be.", hint3: "It's what he rides.", category: "lateral", difficulty: "easy", tags: ["wordplay"] },
  { id: "p010", question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "An echo.", hint1: "It repeats what you say.", hint2: "Sound-related phenomenon.", hint3: "Common in mountains and caves.", category: "lateral", difficulty: "easy", tags: ["nature"] },
  { id: "p011", question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps.", hint1: "Related to walking.", hint2: "They accumulate as you move.", hint3: "Physical traces of movement.", category: "lateral", difficulty: "easy", tags: ["classic"] },
  { id: "p012", question: "A man is looking at a photograph and says, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?", answer: "His son. 'My father's son' with no siblings means himself, so 'that man's father' is himself.", hint1: "Break down the relationship statement.", hint2: "'My father's son' refers to the speaker.", hint3: "Think generationally.", category: "lateral", difficulty: "medium", tags: ["family"] },
  { id: "p013", question: "What has cities, but no houses; mountains, but no trees; and water, but no fish?", answer: "A map.", hint1: "It represents places.", hint2: "You might hang it on a wall.", hint3: "Used for navigation.", category: "lateral", difficulty: "easy", tags: ["object"] },
  { id: "p014", question: "A doctor gives you three pills and tells you to take one every half hour. How long until you've taken all three?", answer: "One hour. You take the first immediately, the second after 30 minutes, and the third after another 30 minutes.", hint1: "You don't wait before taking the first.", hint2: "Count the intervals, not the pills.", hint3: "Two intervals of 30 minutes.", category: "lateral", difficulty: "easy", tags: ["math"] },
  { id: "p015", question: "What can you catch but not throw?", answer: "A cold.", hint1: "It's an illness.", hint2: "You 'catch' it when sick.", hint3: "Common viral infection.", category: "lateral", difficulty: "easy", tags: ["wordplay"] },

  // MATH (15 puzzles)
  { id: "p016", question: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", answer: "5 minutes. Each machine makes one widget in 5 minutes, so 100 machines make 100 widgets in the same time.", hint1: "Think about the rate per machine.", hint2: "Each machine works independently.", hint3: "The ratio stays the same.", category: "math", difficulty: "medium", tags: ["rate"] },
  { id: "p017", question: "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?", answer: "$0.05. If the ball is $0.05, the bat is $1.05, totaling $1.10.", hint1: "It's not 10 cents.", hint2: "Set up an equation: x + (x+1) = 1.10", hint3: "The ball costs 5 cents.", category: "math", difficulty: "medium", tags: ["algebra"] },
  { id: "p018", question: "What is half of 2 plus 2?", answer: "3. Half of 2 is 1, plus 2 equals 3. (Not 4 - order of operations!)", hint1: "Follow order of operations.", hint2: "Division comes before addition.", hint3: "Calculate 'half of 2' first.", category: "math", difficulty: "easy", tags: ["operations"] },
  { id: "p019", question: "If you divide 30 by half and add 10, what do you get?", answer: "70. Dividing by half means dividing by 0.5, which is the same as multiplying by 2. So 30 ÷ 0.5 = 60, plus 10 = 70.", hint1: "'Divide by half' is tricky wording.", hint2: "Dividing by 0.5 doubles the number.", hint3: "30 × 2 = 60.", category: "math", difficulty: "medium", tags: ["operations"] },
  { id: "p020", question: "How many times can you subtract 5 from 25?", answer: "Once. After subtracting 5 from 25 once, you're subtracting from 20, not 25.", hint1: "Think literally about the wording.", hint2: "The number changes after subtraction.", hint3: "Only the first subtraction is FROM 25.", category: "math", difficulty: "easy", tags: ["trick"] },
  { id: "p021", question: "What number should come next: 2, 4, 8, 16, ...?", answer: "32. Each number is doubled (powers of 2).", hint1: "Each number relates to the previous.", hint2: "Multiply by 2 each time.", hint3: "2^5 = 32.", category: "math", difficulty: "easy", tags: ["sequence"] },
  { id: "p022", question: "If 3 cats catch 3 rats in 3 minutes, how many cats are needed to catch 100 rats in 100 minutes?", answer: "3 cats. The same 3 cats can catch 100 rats in 100 minutes at the same rate.", hint1: "Think about the rate.", hint2: "More time compensates for more rats.", hint3: "Same number of cats works.", category: "math", difficulty: "medium", tags: ["rate"] },
  { id: "p023", question: "What is the sum of all numbers from 1 to 100?", answer: "5050. Using Gauss's formula: n(n+1)/2 = 100(101)/2 = 5050.", hint1: "There's a clever formula.", hint2: "Pair first and last: 1+100=101, 2+99=101...", hint3: "50 pairs of 101.", category: "math", difficulty: "hard", tags: ["sum"] },
  { id: "p024", question: "A farmer has 17 sheep. All but 9 run away. How many are left?", answer: "9. 'All but 9' means 9 remain.", hint1: "Read carefully.", hint2: "'All but 9' is key.", hint3: "Nine didn't run away.", category: "math", difficulty: "easy", tags: ["wording"] },
  { id: "p025", question: "What comes next: 1, 1, 2, 3, 5, 8, ...?", answer: "13. This is the Fibonacci sequence - each number is the sum of the two preceding ones.", hint1: "Add the previous two numbers.", hint2: "5 + 8 = ?", hint3: "Famous mathematical sequence.", category: "math", difficulty: "medium", tags: ["sequence"] },
  { id: "p026", question: "If a clock chimes 5 times in 4 seconds, how many times will it chime in 10 seconds?", answer: "13 times. The chimes happen at t=0,1,2,3,4 (5 chimes in 4 seconds). In 10 seconds: t=0 through t=10 = 11 chimes... Actually, let's recalculate: 5 chimes with 4 intervals = 1 second per interval. In 10 seconds = 10 intervals + 1 = 11 chimes.", hint1: "Count the intervals between chimes.", hint2: "5 chimes means 4 gaps.", hint3: "Each gap is 1 second.", category: "math", difficulty: "hard", tags: ["timing"] },
  { id: "p027", question: "What is 1000 + 40 + 1000 + 30 + 1000 + 20 + 1000 + 10?", answer: "4100. Many people incorrectly say 5000. Add carefully: 4000 + 40 + 30 + 20 + 10 = 4100.", hint1: "Add slowly and carefully.", hint2: "There are four 1000s.", hint3: "4000 + 100 = 4100.", category: "math", difficulty: "easy", tags: ["arithmetic"] },
  { id: "p028", question: "A snail climbs 3 feet during the day but slides back 2 feet at night. How many days to climb a 10-foot wall?", answer: "8 days. After 7 days, the snail is at 7 feet. On day 8, it climbs 3 feet and reaches 10 feet before sliding back.", hint1: "Track daily progress.", hint2: "Net gain is 1 foot per day.", hint3: "On the last day, it doesn't slide back.", category: "math", difficulty: "medium", tags: ["progression"] },
  { id: "p029", question: "What is the next prime number after 7?", answer: "11. Prime numbers are only divisible by 1 and themselves.", hint1: "It's not 9 (divisible by 3).", hint2: "Check each number sequentially.", hint3: "11 is only divisible by 1 and 11.", category: "math", difficulty: "easy", tags: ["primes"] },
  { id: "p030", question: "If you flip a coin 3 times, what's the probability of getting exactly 2 heads?", answer: "3/8 or 37.5%. Possible outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. Three have exactly 2 heads: HHT, HTH, THH.", hint1: "List all possible outcomes.", hint2: "There are 8 total outcomes.", hint3: "Count outcomes with exactly 2 heads.", category: "math", difficulty: "hard", tags: ["probability"] },

  // RIDDLES (10 puzzles)
  { id: "p031", question: "I have keys but no locks. I have space but no room. You can enter, but can't go outside. What am I?", answer: "A keyboard.", hint1: "You use it every day.", hint2: "Related to computers.", hint3: "Has letters and numbers.", category: "riddle", difficulty: "medium", tags: ["technology"] },
  { id: "p032", question: "What has hands but cannot clap?", answer: "A clock.", hint1: "It tells time.", hint2: "The hands point to numbers.", hint3: "Found on walls or wrists.", category: "riddle", difficulty: "easy", tags: ["time"] },
  { id: "p033", question: "What has a head and a tail but no body?", answer: "A coin.", hint1: "Used for money.", hint2: "Has two sides.", hint3: "You flip it to decide.", category: "riddle", difficulty: "easy", tags: ["money"] },
  { id: "p034", question: "What can fill a room but takes up no space?", answer: "Light.", hint1: "It's invisible.", hint2: "Comes from the sun or bulbs.", hint3: "Allows you to see.", category: "riddle", difficulty: "easy", tags: ["physics"] },
  { id: "p035", question: "What goes up but never comes down?", answer: "Your age.", hint1: "It increases constantly.", hint2: "Related to time passing.", hint3: "Personal and unavoidable.", category: "riddle", difficulty: "easy", tags: ["time"] },
  { id: "p036", question: "What has teeth but cannot bite?", answer: "A comb.", hint1: "Used for hair.", hint2: "Has many thin parts.", hint3: "Personal grooming tool.", category: "riddle", difficulty: "easy", tags: ["object"] },
  { id: "p037", question: "What can you break without touching it?", answer: "A promise.", hint1: "It's not physical.", hint2: "Related to trust.", hint3: "Verbal commitment.", category: "riddle", difficulty: "easy", tags: ["abstract"] },
  { id: "p038", question: "What belongs to you but others use it more?", answer: "Your name.", hint1: "It identifies you.", hint2: "Others say it when addressing you.", hint3: "Given at birth.", category: "riddle", difficulty: "easy", tags: ["identity"] },
  { id: "p039", question: "What gets bigger the more you take away?", answer: "A hole.", hint1: "It's an empty space.", hint2: "Created by digging.", hint3: "Absence of material.", category: "riddle", difficulty: "easy", tags: ["paradox"] },
  { id: "p040", question: "I'm tall when I'm young, and short when I'm old. What am I?", answer: "A candle.", hint1: "It provides light.", hint2: "It melts as it burns.", hint3: "Made of wax.", category: "riddle", difficulty: "easy", tags: ["object"] },

  // SEQUENCE (10 puzzles)
  { id: "p041", question: "What comes next: J, F, M, A, M, J, ...?", answer: "J (July). These are the first letters of months: January, February, March, April, May, June, July.", hint1: "Think about time.", hint2: "Calendar related.", hint3: "Twelve total in the sequence.", category: "sequence", difficulty: "medium", tags: ["months"] },
  { id: "p042", question: "What comes next: O, T, T, F, F, S, S, ...?", answer: "E (Eight). First letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight.", hint1: "Mathematical.", hint2: "Counting numbers.", hint3: "Starts with O for One.", category: "sequence", difficulty: "medium", tags: ["numbers"] },
  { id: "p043", question: "What comes next: 3, 3, 5, 4, 4, 3, 5, 5, ...?", answer: "4. These are the letter counts of numbers: One(3), Two(3), Three(5), Four(4), Five(4), Six(3), Seven(5), Eight(5), Nine(4).", hint1: "Count something about numbers.", hint2: "Spell out the numbers.", hint3: "Count the letters.", category: "sequence", difficulty: "hard", tags: ["letters"] },
  { id: "p044", question: "What comes next: 1, 11, 21, 1211, 111221, ...?", answer: "312211. This is the 'look-and-say' sequence. Read the previous number aloud: 111221 = 'three 1s, two 2s, one 1' = 312211.", hint1: "Read the numbers out loud.", hint2: "Describe what you see.", hint3: "Count consecutive digits.", category: "sequence", difficulty: "hard", tags: ["pattern"] },
  { id: "p045", question: "What comes next: 2, 6, 12, 20, 30, ...?", answer: "42. Pattern: n² + n, or differences increase by 2: +4, +6, +8, +10, +12.", hint1: "Look at the differences.", hint2: "Differences increase by 2.", hint3: "Or use n(n+1).", category: "sequence", difficulty: "medium", tags: ["algebra"] },
  { id: "p046", question: "What comes next: S, M, T, W, T, F, ...?", answer: "S (Saturday). Days of the week: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.", hint1: "Time related.", hint2: "Seven total.", hint3: "Weekly cycle.", category: "sequence", difficulty: "easy", tags: ["days"] },
  { id: "p047", question: "What comes next: 1, 4, 9, 16, 25, ...?", answer: "36. Perfect squares: 1², 2², 3², 4², 5², 6².", hint1: "Multiply numbers by themselves.", hint2: "Next is 6 squared.", hint3: "6 × 6 = ?", category: "sequence", difficulty: "easy", tags: ["squares"] },
  { id: "p048", question: "What comes next: A, E, F, H, I, L, M, ...?", answer: "N. Letters that can be written with only straight lines (no curves).", hint1: "Think about letter shapes.", hint2: "Written with straight strokes only.", hint3: "No curved lines.", category: "sequence", difficulty: "hard", tags: ["letters"] },
  { id: "p049", question: "What comes next: 1, 2, 4, 7, 11, 16, ...?", answer: "22. Differences increase by 1: +1, +2, +3, +4, +5, +6.", hint1: "Look at the differences between numbers.", hint2: "Each difference increases by 1.", hint3: "16 + 6 = 22.", category: "sequence", difficulty: "medium", tags: ["addition"] },
  { id: "p050", question: "What comes next: C, D, G, L, Q, ...?", answer: "Z. Letter positions: 3, 4, 7, 12, 17. Differences: +1, +3, +5, +7, +9. So 17+9=26 = Z.", hint1: "Convert to numbers.", hint2: "Look at position differences.", hint3: "Odd number increments.", category: "sequence", difficulty: "hard", tags: ["letters"] },

  // VISUAL (10 puzzles)
  { id: "p051", question: "Imagine a cube painted red on all sides. It's cut into 27 smaller cubes (3×3×3). How many small cubes have exactly 2 red faces?", answer: "12 cubes. These are the edge cubes (not corners, not face centers, not interior). A cube has 12 edges.", hint1: "Visualize the cube structure.", hint2: "Think about edge positions.", hint3: "Count the edges of a cube.", category: "visual", difficulty: "medium", tags: ["geometry"] },
  { id: "p052", question: "How many triangles are in a Star of David (two overlapping equilateral triangles forming a six-pointed star)?", answer: "8 triangles. There are 6 small triangles at the points, plus 2 large equilateral triangles that form the star.", hint1: "Count the small ones first.", hint2: "Don't forget the large ones.", hint3: "6 small + 2 large.", category: "visual", difficulty: "medium", tags: ["counting"] },
  { id: "p053", question: "If you fold a piece of paper in half 3 times and cut off one corner, how many holes will there be when unfolded?", answer: "8 holes. Each fold doubles the layers: 2³ = 8 layers, so one cut makes 8 holes.", hint1: "Count the layers created.", hint2: "Each fold doubles the thickness.", hint3: "2 × 2 × 2 = 8.", category: "visual", difficulty: "medium", tags: ["folding"] },
  { id: "p054", question: "A square has 4 corners. If you cut off one corner, how many corners does it have now?", answer: "5 corners. Cutting off a corner creates 2 new corners where there was 1, so 4 - 1 + 2 = 5.", hint1: "Visualize the cut.", hint2: "A straight cut creates new corners.", hint3: "You add more than you remove.", category: "visual", difficulty: "easy", tags: ["geometry"] },
  { id: "p055", question: "How many squares are on a standard chess board (including all sizes, not just 1×1)?", answer: "209 squares. 1×1: 64, 2×2: 49, 3×3: 36, 4×4: 25, 5×5: 16, 6×6: 9, 7×7: 4, 8×8: 1. Total: 204. Wait, let me recalculate: 64+49+36+25+16+9+4+1 = 204 squares.", hint1: "Count each size separately.", hint2: "Sum of squares formula.", hint3: "n² for each size from 1 to 8.", category: "visual", difficulty: "hard", tags: ["counting"] },
  { id: "p056", question: "What 3D shape looks like a circle from the front, a square from the side, and a triangle from above?", answer: "A cylinder with a wedge cut out, or more precisely, a shape that combines these properties. Actually, this is impossible with a single convex shape. The classic answer is a cylindrical wedge or a specially designed object.", hint1: "Think about combining shapes.", hint2: "Different views show different 2D shapes.", hint3: "Consider a modified cylinder.", category: "visual", difficulty: "hard", tags: ["3D"] },
  { id: "p057", question: "If a mirror reflects left and right but not up and down, why?", answer: "Mirrors don't actually reflect left and right - they reflect front and back (depth inversion). We perceive it as left-right because we mentally rotate ourselves to face our reflection.", hint1: "Think about what direction mirrors actually invert.", hint2: "It's about depth, not lateral inversion.", hint3: "Your nose is closer to the mirror than your ears.", category: "visual", difficulty: "hard", tags: ["optics"] },
  { id: "p058", question: "How many faces does a Möbius strip have?", answer: "1 face. A Möbius strip has only one continuous surface and one edge.", hint1: "It's a special topological object.", hint2: "Trace your finger along it.", hint3: "You'll cover the entire surface without lifting.", category: "visual", difficulty: "medium", tags: ["topology"] },
  { id: "p059", question: "In a room, there's a candle, a wood stove, and a gas lamp. You only have one match. What do you light first?", answer: "The match. You need to light the match first before lighting anything else.", hint1: "Think practically.", hint2: "What enables the other lightings?", hint3: "The tool itself.", category: "visual", difficulty: "easy", tags: ["logic"] },
  { id: "p060", question: "A pentagon has how many diagonals?", answer: "5 diagonals. Formula: n(n-3)/2 where n=5. So 5(5-3)/2 = 5(2)/2 = 5 diagonals.", hint1: "Use the diagonal formula.", hint2: "n(n-3)/2 for an n-sided polygon.", hint3: "5 × 2 ÷ 2 = 5.", category: "visual", difficulty: "medium", tags: ["geometry"] }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get deterministic index based on date
 * Same index for everyone on the same day
 */
function getTodayIndex(array) {
  const start = new Date('2025-01-01');
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return diff % array.length;
}

/**
 * Get today's quote
 */
function getTodayQuote() {
  const index = getTodayIndex(QUOTES);
  return QUOTES[index];
}

/**
 * Get today's puzzle
 */
function getTodayPuzzle() {
  const index = getTodayIndex(PUZZLES);
  return PUZZLES[index];
}

/**
 * Get quote by ID
 */
function getQuoteById(id) {
  return QUOTES.find(q => q.id === id);
}

/**
 * Get puzzle by ID
 */
function getPuzzleById(id) {
  return PUZZLES.find(p => p.id === id);
}

/**
 * Format date for display
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
 * Get difficulty class
 */
function getDifficultyClass(difficulty) {
  return `difficulty-${difficulty}`;
}

/**
 * Get level title
 */
function getLevelTitle(level) {
  if (level >= 30) return 'Legend';
  if (level >= 20) return 'Genius';
  if (level >= 10) return 'Solver';
  if (level >= 5) return 'Thinker';
  return 'Beginner';
}
