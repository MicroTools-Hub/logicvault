/* ========================================
   LOGICVAULT — Data Layer
   All quotes and puzzles stored here
   ======================================== */

// --- QUOTES (60 entries) ---
const QUOTES = [
  // Motivation (12)
  { id: "q001", text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation", difficulty: "easy" },
  { id: "q002", text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation", difficulty: "easy" },
  { id: "q003", text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "motivation", difficulty: "medium" },
  { id: "q004", text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation", difficulty: "easy" },
  { id: "q005", text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation", difficulty: "medium" },
  { id: "q006", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "motivation", difficulty: "medium" },
  { id: "q007", text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation", difficulty: "medium" },
  { id: "q008", text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett", category: "motivation", difficulty: "hard" },
  { id: "q009", text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela", category: "motivation", difficulty: "medium" },
  { id: "q010", text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation", difficulty: "easy" },
  { id: "q011", text: "Your limitation—it's only your imagination. Push harder, fall down, but don't give up.", author: "Unknown", category: "motivation", difficulty: "medium" },
  { id: "q012", text: "Great things never come from comfort zones. Dream big and dare to fail.", author: "Unknown", category: "motivation", difficulty: "medium" },
  
  // Wisdom (12)
  { id: "q013", text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom", difficulty: "easy" },
  { id: "q014", text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom", difficulty: "easy" },
  { id: "q015", text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "wisdom", difficulty: "easy" },
  { id: "q016", text: "The unexamined life is not worth living.", author: "Socrates", category: "wisdom", difficulty: "easy" },
  { id: "q017", text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom", difficulty: "easy" },
  { id: "q018", text: "Change is the law of life. And those who look only to the past or present are certain to miss the future.", author: "John F. Kennedy", category: "wisdom", difficulty: "hard" },
  { id: "q019", text: "The fool doth think he is wise, but the man who knows himself to be a fool is a wise man.", author: "William Shakespeare", category: "wisdom", difficulty: "medium" },
  { id: "q020", text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "wisdom", difficulty: "easy" },
  { id: "q021", text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom", difficulty: "easy" },
  { id: "q022", text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche", category: "wisdom", difficulty: "easy" },
  { id: "q023", text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "wisdom", difficulty: "medium" },
  { id: "q024", text: "May you live every day of your life.", author: "Jonathan Swift", category: "wisdom", difficulty: "easy" },
  
  // Tech (12)
  { id: "q025", text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "tech", difficulty: "easy" },
  { id: "q026", text: "Fix the cause, not the symptom.", author: "Steve Maguire", category: "tech", difficulty: "easy" },
  { id: "q027", text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "tech", difficulty: "easy" },
  { id: "q028", text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "tech", difficulty: "easy" },
  { id: "q029", text: "You cannot escape the responsibility of tomorrow by evading it today.", author: "Abraham Lincoln", category: "tech", difficulty: "medium" },
  { id: "q030", text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", category: "tech", difficulty: "easy" },
  { id: "q031", text: "Hardware eventually fails. Software eventually works.", author: "Gary Kildall", category: "tech", difficulty: "easy" },
  { id: "q032", text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "tech", difficulty: "easy" },
  { id: "q033", text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde", category: "tech", difficulty: "easy" },
  { id: "q034", text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel", category: "tech", difficulty: "medium" },
  { id: "q035", text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann", category: "tech", difficulty: "easy" },
  { id: "q036", text: "Knowledge is power.", author: "Francis Bacon", category: "tech", difficulty: "easy" },
  
  // Literature (12)
  { id: "q037", text: "To be, or not to be, that is the question.", author: "William Shakespeare", category: "literature", difficulty: "easy" },
  { id: "q038", text: "It was the best of times, it was the worst of times.", author: "Charles Dickens", category: "literature", difficulty: "easy" },
  { id: "q039", text: "All happy families are alike; each unhappy family is unhappy in its own way.", author: "Leo Tolstoy", category: "literature", difficulty: "medium" },
  { id: "q040", text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", author: "Jane Austen", category: "literature", difficulty: "hard" },
  { id: "q041", text: "Call me Ishmael.", author: "Herman Melville", category: "literature", difficulty: "easy" },
  { id: "q042", text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.", author: "F. Scott Fitzgerald", category: "literature", difficulty: "hard" },
  { id: "q043", text: "It was a bright cold day in April, and the clocks were striking thirteen.", author: "George Orwell", category: "literature", difficulty: "medium" },
  { id: "q044", text: "The sky above the port was the color of television, tuned to a dead channel.", author: "William Gibson", category: "literature", difficulty: "medium" },
  { id: "q045", text: "I am no bird; and no net ensnares me.", author: "Charlotte Brontë", category: "literature", difficulty: "easy" },
  { id: "q046", text: "There was a boy called Eustace Clarence Scrubb, and he almost deserved it.", author: "C.S. Lewis", category: "literature", difficulty: "medium" },
  { id: "q047", text: "The sun shone, having no alternative, on the nothing new.", author: "Samuel Beckett", category: "literature", difficulty: "medium" },
  { id: "q048", text: "If you really want to hear about it, the first thing you'll probably want to know is where I was born.", author: "J.D. Salinger", category: "literature", difficulty: "hard" },
  
  // Science (12)
  { id: "q049", text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan", category: "science", difficulty: "medium" },
  { id: "q050", text: "The important thing is not to stop questioning.", author: "Albert Einstein", category: "science", difficulty: "easy" },
  { id: "q051", text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan", category: "science", difficulty: "easy" },
  { id: "q052", text: "Science without religion is lame, religion without science is blind.", author: "Albert Einstein", category: "science", difficulty: "medium" },
  { id: "q053", text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson", category: "science", difficulty: "medium" },
  { id: "q054", text: "Equipped with his five senses, man explores the universe around him and calls the adventure Science.", author: "Edwin Hubble", category: "science", difficulty: "hard" },
  { id: "q055", text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie", category: "science", difficulty: "medium" },
  { id: "q056", text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun", category: "science", difficulty: "easy" },
  { id: "q057", text: "Science is organized knowledge. Wisdom is organized life.", author: "Immanuel Kant", category: "science", difficulty: "easy" },
  { id: "q058", text: "The universe is full of magical things, patiently waiting for our wits to grow sharper.", author: "Eden Phillpotts", category: "science", difficulty: "medium" },
  { id: "q059", text: "Doubt is not a pleasant condition, but certainty is absurd.", author: "Voltaire", category: "science", difficulty: "easy" },
  { id: "q060", text: "We are just an advanced breed of monkeys on a minor planet of a very average star.", author: "Stephen Hawking", category: "science", difficulty: "medium" }
];

// --- PUZZLES (60 entries) ---
const PUZZLES = [
  // Lateral Thinking (15)
  {
    id: "p001",
    question: "A man walks into a restaurant and orders albatross soup. After one sip, he goes home and kills himself. Why?",
    answer: "He was a sailor who had been stranded on an island. His companions told him they were eating albatross soup to survive, but they were actually feeding him his wife who had died. When he tasted real albatross soup at the restaurant, he realized the truth.",
    hint1: "Think about what he was eating before.",
    hint2: "He had been stranded somewhere remote.",
    hint3: "The soup tastes different from what he remembered.",
    category: "lateral",
    difficulty: "hard",
    tags: ["classic", "dark"]
  },
  {
    id: "p002",
    question: "A woman shoots her husband. Then she holds him under water for five minutes. Finally, she hangs him. But five minutes later they both go out together and enjoy a wonderful dinner together. How can this be?",
    answer: "The woman is a photographer. She shot a picture of her husband, developed it in water, and hung it up to dry.",
    hint1: "Think about different meanings of words.",
    hint2: "She's not using a gun.",
    hint3: "This is about photography.",
    category: "lateral",
    difficulty: "medium",
    tags: ["wordplay", "classic"]
  },
  {
    id: "p003",
    question: "A man is found dead in a field next to an unopened package. There are no footprints anywhere. How did he die?",
    answer: "He was a skydiver whose parachute failed to open. The unopened package is his parachute.",
    hint1: "Look up.",
    hint2: "The package is important.",
    hint3: "He fell from the sky.",
    category: "lateral",
    difficulty: "medium",
    tags: ["classic"]
  },
  {
    id: "p004",
    question: "Every night, a man tells his wife a story. Every morning, she thanks him. One night, he tells her no story. That morning, she is dead. Why?",
    answer: "The man is a lighthouse keeper. His 'story' is the light that guides ships safely. One night he forgot to turn on the light, and his wife died in a shipwreck.",
    hint1: "Think about what 'story' could mean metaphorically.",
    hint2: "He has an important job at night.",
    hint3: "The light went out.",
    category: "lateral",
    difficulty: "hard",
    tags: ["metaphor"]
  },
  {
    id: "p005",
    question: "A truck driver is going down a one-way street the wrong way. A police officer sees him but doesn't stop him. Why?",
    answer: "The truck driver was walking, not driving his truck.",
    hint1: "Think about his mode of transportation.",
    hint2: "He's not in the truck.",
    hint3: "He's on foot.",
    category: "lateral",
    difficulty: "easy",
    tags: ["wordplay"]
  },
  {
    id: "p006",
    question: "A man lives on the 30th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 20th floor and walks the rest of the way—except on rainy days, when he takes the elevator all the way to the 30th floor. Why?",
    answer: "The man is too short to reach the button for the 30th floor. On rainy days, he uses his umbrella to press the button.",
    hint1: "Think about his physical characteristics.",
    hint2: "The elevator buttons are the key.",
    hint3: "Rain brings an accessory.",
    category: "lateral",
    difficulty: "medium",
    tags: ["classic"]
  },
  {
    id: "p007",
    question: "Two men play five sets of tennis. Each wins three sets. How is this possible?",
    answer: "They are playing doubles, not singles. They are partners.",
    hint1: "Think about the format of the game.",
    hint2: "They're on the same team.",
    hint3: "There are four players total.",
    category: "lateral",
    difficulty: "easy",
    tags: ["sports"]
  },
  {
    id: "p008",
    question: "A girl finds two books in a library. Both have the same title, author, and publication date. But one costs three times as much as the other. Why?",
    answer: "One book is a first edition signed by the author, making it much more valuable.",
    hint1: "Think about what makes books valuable.",
    hint2: "The content is identical.",
    hint3: "Collectors care about this difference.",
    category: "lateral",
    difficulty: "medium",
    tags: ["collecting"]
  },
  {
    id: "p009",
    question: "A man is lying dead in a room with a pack on his back. The windows are locked from the inside. How did he die?",
    answer: "He was a parachutist whose parachute failed to open. He crashed through the skylight.",
    hint1: "The pack is important.",
    hint2: "Look up, not at the windows.",
    hint3: "He came from above.",
    category: "lateral",
    difficulty: "medium",
    tags: ["classic"]
  },
  {
    id: "p010",
    question: "Why can't a person living in New York be buried in California?",
    answer: "Because the person is still living.",
    hint1: "Read carefully.",
    hint2: "Living people aren't buried.",
    hint3: "It's about being alive.",
    category: "lateral",
    difficulty: "easy",
    tags: ["wordplay", "trick"]
  },
  {
    id: "p011",
    question: "A doctor and a bus driver are both in love with the same woman. The bus driver goes away on a trip. Before he leaves, he gives the woman 21 apples. Why?",
    answer: "An apple a day keeps the doctor away.",
    hint1: "Think about common sayings.",
    hint2: "21 days of apples.",
    hint3: "It's a proverb.",
    category: "lateral",
    difficulty: "medium",
    tags: ["wordplay", "proverb"]
  },
  {
    id: "p012",
    question: "What can you catch but never throw?",
    answer: "A cold.",
    hint1: "It's not a physical object.",
    hint2: "You get sick with it.",
    hint3: "Common illness.",
    category: "lateral",
    difficulty: "easy",
    tags: ["riddle"]
  },
  {
    id: "p013",
    question: "A horse is tied to a 10-foot rope, but hay is 15 feet away. If the rope can't stretch or break, how can the horse reach the hay?",
    answer: "The other end of the rope isn't tied to anything.",
    hint1: "Think about what the rope is attached to.",
    hint2: "Only one end is secured.",
    hint3: "The horse can move freely.",
    category: "lateral",
    difficulty: "easy",
    tags: ["logic"]
  },
  {
    id: "p014",
    question: "A man pushes his car to a hotel and loses his fortune. What happened?",
    answer: "He's playing Monopoly. He landed on a property with a hotel.",
    hint1: "Think about games.",
    hint2: "It's a board game.",
    hint3: "Money is fake.",
    category: "lateral",
    difficulty: "medium",
    tags: ["games", "classic"]
  },
  {
    id: "p015",
    question: "You see a boat filled with people, yet there isn't a single person on board. How is that possible?",
    answer: "All the people on the boat are married.",
    hint1: "Think about the word 'single'.",
    hint2: "It's about relationship status.",
    hint3: "Everyone has a spouse.",
    category: "lateral",
    difficulty: "easy",
    tags: ["wordplay"]
  },
  
  // Math Puzzles (15)
  {
    id: "p016",
    question: "What number should come next: 2, 6, 12, 20, 30, ?",
    answer: "42 (each number increases by consecutive even numbers: +4, +6, +8, +10, +12)",
    hint1: "Look at the differences between numbers.",
    hint2: "The differences form a pattern.",
    hint3: "Add 12 to 30.",
    category: "math",
    difficulty: "medium",
    tags: ["sequence"]
  },
  {
    id: "p017",
    question: "If 3 cats can catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    answer: "3 cats (the same 3 cats can catch 100 mice in 100 minutes at the same rate)",
    hint1: "Think about the rate per cat.",
    hint2: "Each cat catches one mouse per 3 minutes.",
    hint3: "Time scales proportionally.",
    category: "math",
    difficulty: "medium",
    tags: ["rate", "classic"]
  },
  {
    id: "p018",
    question: "What is half of two plus two?",
    answer: "Three (half of two is one, plus two equals three)",
    hint1: "Follow order of operations.",
    hint2: "Do 'half of two' first.",
    hint3: "1 + 2 = 3",
    category: "math",
    difficulty: "easy",
    tags: ["order-of-operations"]
  },
  {
    id: "p019",
    question: "A bat and ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?",
    answer: "$0.05 (ball = x, bat = x + 1, so x + (x+1) = 1.10, therefore x = 0.05)",
    hint1: "Set up an equation.",
    hint2: "Let x = ball price.",
    hint3: "It's not 10 cents.",
    category: "math",
    difficulty: "medium",
    tags: ["algebra", "classic"]
  },
  {
    id: "p020",
    question: "If you divide 30 by half and add 10, what do you get?",
    answer: "70 (dividing by half means multiplying by 2, so 30 × 2 = 60, then 60 + 10 = 70)",
    hint1: "'Divide by half' doesn't mean divide by 2.",
    hint2: "30 ÷ 0.5 = 60.",
    hint3: "Then add 10.",
    category: "math",
    difficulty: "medium",
    tags: ["operations"]
  },
  {
    id: "p021",
    question: "What number is missing: 1, 1, 2, 3, 5, 8, 13, ?",
    answer: "21 (Fibonacci sequence - each number is the sum of the two before it)",
    hint1: "Add the previous two numbers.",
    hint2: "8 + 13 = ?",
    hint3: "Famous sequence.",
    category: "math",
    difficulty: "easy",
    tags: ["fibonacci", "sequence"]
  },
  {
    id: "p022",
    question: "How many months have 28 days?",
    answer: "All 12 months have at least 28 days.",
    hint1: "Think carefully about the wording.",
    hint2: "Not just February.",
    hint3: "Every month has a 28th day.",
    category: "math",
    difficulty: "easy",
    tags: ["trick", "calendar"]
  },
  {
    id: "p023",
    question: "A farmer has 17 sheep, and all but 9 die. How many are left?",
    answer: "9 (all BUT 9 die, meaning 9 survive)",
    hint1: "Read carefully.",
    hint2: "'All but 9' means 9 remain.",
    hint3: "Not 8 died.",
    category: "math",
    difficulty: "easy",
    tags: ["wordplay"]
  },
  {
    id: "p024",
    question: "What is the next number: 1, 4, 9, 16, 25, ?",
    answer: "36 (perfect squares: 1², 2², 3², 4², 5², 6²)",
    hint1: "These are square numbers.",
    hint2: "6 squared = ?",
    hint3: "Multiply 6 × 6.",
    category: "math",
    difficulty: "easy",
    tags: ["squares", "sequence"]
  },
  {
    id: "p025",
    question: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    answer: "5 minutes (each machine makes one widget in 5 minutes)",
    hint1: "Think about the rate per machine.",
    hint2: "Each machine works independently.",
    hint3: "Same time, more output.",
    category: "math",
    difficulty: "medium",
    tags: ["rate", "classic"]
  },
  {
    id: "p026",
    question: "What number comes next: 3, 7, 15, 31, 63, ?",
    answer: "127 (each number is double the previous plus 1, or 2^n - 1)",
    hint1: "Double and add 1.",
    hint2: "Or think powers of 2 minus 1.",
    hint3: "63 × 2 + 1 = 127.",
    category: "math",
    difficulty: "medium",
    tags: ["sequence", "powers"]
  },
  {
    id: "p027",
    question: "At a party, everyone shakes hands with everyone else exactly once. If there were 66 handshakes, how many people were at the party?",
    answer: "12 people (n(n-1)/2 = 66, so n = 12)",
    hint1: "Use the handshake formula.",
    hint2: "n(n-1)/2 = 66.",
    hint3: "Solve for n.",
    category: "math",
    difficulty: "hard",
    tags: ["combinatorics"]
  },
  {
    id: "p028",
    question: "What is 1/2 of 1/4 of 1/10 of 400?",
    answer: "5 (400 ÷ 10 = 40, 40 ÷ 4 = 10, 10 ÷ 2 = 5)",
    hint1: "Work from right to left.",
    hint2: "Start with 400 ÷ 10.",
    hint3: "Keep dividing.",
    category: "math",
    difficulty: "easy",
    tags: ["fractions"]
  },
  {
    id: "p029",
    question: "If yesterday was tomorrow, today would be Saturday. What day is it actually?",
    answer: "Monday (if today were Sunday, yesterday would be Saturday, making 'tomorrow' Saturday means today is Monday)",
    hint1: "Work backwards.",
    hint2: "Think about relative days.",
    hint3: "Test each day.",
    category: "math",
    difficulty: "hard",
    tags: ["logic", "days"]
  },
  {
    id: "p030",
    question: "A clock chimes 5 times in 5 seconds. How long does it take to chime 10 times?",
    answer: "11.25 seconds (there are 4 intervals between 5 chimes = 1.25s each, so 9 intervals for 10 chimes = 11.25s)",
    hint1: "Count the intervals, not the chimes.",
    hint2: "4 gaps between 5 chimes.",
    hint3: "9 gaps for 10 chimes.",
    category: "math",
    difficulty: "hard",
    tags: ["intervals", "classic"]
  },
  
  // Riddles (10)
  {
    id: "p031",
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "An echo",
    hint1: "You hear me in mountains.",
    hint2: "I repeat what you say.",
    hint3: "Sound bouncing off surfaces.",
    category: "riddle",
    difficulty: "medium",
    tags: ["sound", "classic"]
  },
  {
    id: "p032",
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps",
    hint1: "You make them when walking.",
    hint2: "They show where you've been.",
    hint3: "Physical traces.",
    category: "riddle",
    difficulty: "easy",
    tags: ["walking", "classic"]
  },
  {
    id: "p033",
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "A map",
    hint1: "It shows places.",
    hint2: "Used for navigation.",
    hint3: "Paper representation.",
    category: "riddle",
    difficulty: "easy",
    tags: ["geography", "classic"]
  },
  {
    id: "p034",
    question: "What has keys but can't open locks?",
    answer: "A piano",
    hint1: "It makes music.",
    hint2: "Black and white keys.",
    hint3: "Musical instrument.",
    category: "riddle",
    difficulty: "easy",
    tags: ["music", "classic"]
  },
  {
    id: "p035",
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "A candle",
    hint1: "It provides light.",
    hint2: "It melts as it burns.",
    hint3: "Gets shorter over time.",
    category: "riddle",
    difficulty: "easy",
    tags: ["light", "classic"]
  },
  {
    id: "p036",
    question: "What has a head and a tail but no body?",
    answer: "A coin",
    hint1: "You use it to pay.",
    hint2: "Heads or tails.",
    hint3: "Metal currency.",
    category: "riddle",
    difficulty: "easy",
    tags: ["money", "classic"]
  },
  {
    id: "p037",
    question: "What can travel around the world while staying in a corner?",
    answer: "A stamp",
    hint1: "It goes on letters.",
    hint2: "Postal service.",
    hint3: "Stays in the corner of an envelope.",
    category: "riddle",
    difficulty: "medium",
    tags: ["mail", "classic"]
  },
  {
    id: "p038",
    question: "I have holes in my top and bottom, holes in my middle, holes all over, yet I still hold water. What am I?",
    answer: "A sponge",
    hint1: "You use it for cleaning.",
    hint2: "It absorbs liquid.",
    hint3: "Full of pores.",
    category: "riddle",
    difficulty: "medium",
    tags: ["cleaning"]
  },
  {
    id: "p039",
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "The letter M",
    hint1: "Look at the words themselves.",
    hint2: "Count the letters.",
    hint3: "It's about spelling.",
    category: "riddle",
    difficulty: "medium",
    tags: ["letters", "wordplay"]
  },
  {
    id: "p040",
    question: "What gets wetter the more it dries?",
    answer: "A towel",
    hint1: "You use it after a shower.",
    hint2: "It absorbs water.",
    hint3: "Bathroom item.",
    category: "riddle",
    difficulty: "easy",
    tags: ["bathroom", "classic"]
  },
  
  // Sequence (10)
  {
    id: "p041",
    question: "What letter comes next: O, T, T, F, F, S, S, ?",
    answer: "E (Eight - first letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight)",
    hint1: "Think about numbers.",
    hint2: "First letters of counting numbers.",
    hint3: "What comes after seven?",
    category: "sequence",
    difficulty: "medium",
    tags: ["letters", "numbers"]
  },
  {
    id: "p042",
    question: "What comes next: J, F, M, A, M, J, J, ?",
    answer: "A (August - first letters of months: January, February, March, April, May, June, July, August)",
    hint1: "Think about the calendar.",
    hint2: "Months of the year.",
    hint3: "8th month starts with A.",
    category: "sequence",
    difficulty: "easy",
    tags: ["months", "calendar"]
  },
  {
    id: "p043",
    question: "What number comes next: 1, 11, 21, 1211, 111221, ?",
    answer: "312211 (Look-and-Say sequence: describe the previous number aloud)",
    hint1: "Read the digits out loud.",
    hint2: "Describe what you see.",
    hint3: "111221 = three 1s, two 2s, one 1.",
    category: "sequence",
    difficulty: "hard",
    tags: ["look-and-say", "famous"]
  },
  {
    id: "p044",
    question: "What comes next: 2, 3, 5, 7, 11, 13, ?",
    answer: "17 (prime numbers in order)",
    hint1: "Only divisible by 1 and itself.",
    hint2: "Prime numbers.",
    hint3: "Next prime after 13.",
    category: "sequence",
    difficulty: "medium",
    tags: ["primes"]
  },
  {
    id: "p045",
    question: "What letter comes next: A, E, F, H, I, L, M, ?",
    answer: "N (letters made with straight lines only, no curves)",
    hint1: "Look at the shapes.",
    hint2: "No curved lines.",
    hint3: "Next straight-line letter.",
    category: "sequence",
    difficulty: "hard",
    tags: ["letters", "shapes"]
  },
  {
    id: "p046",
    question: "What comes next: 1, 2, 4, 7, 11, 16, ?",
    answer: "22 (add 1, then 2, then 3, etc.: +1, +2, +3, +4, +5, +6)",
    hint1: "Increasing addition.",
    hint2: "Add one more each time.",
    hint3: "16 + 6 = 22.",
    category: "sequence",
    difficulty: "medium",
    tags: ["addition"]
  },
  {
    id: "p047",
    question: "What comes next: S, M, T, W, T, F, ?",
    answer: "S (Saturday - days of the week)",
    hint1: "Days of the week.",
    hint2: "Seven days.",
    hint3: "Last day of the week.",
    category: "sequence",
    difficulty: "easy",
    tags: ["days", "week"]
  },
  {
    id: "p048",
    question: "What number comes next: 100, 95, 85, 70, 50, ?",
    answer: "25 (subtract 5, then 10, then 15, then 20, then 25)",
    hint1: "Subtract increasing amounts.",
    hint2: "-5, -10, -15, -20, -25.",
    hint3: "50 - 25 = 25.",
    category: "sequence",
    difficulty: "medium",
    tags: ["subtraction"]
  },
  {
    id: "p049",
    question: "What comes next: 1, 1, 2, 6, 24, 120, ?",
    answer: "720 (factorials: 1!, 2!, 3!, 4!, 5!, 6!)",
    hint1: "Multiply by increasing numbers.",
    hint2: "×1, ×2, ×3, ×4, ×5, ×6.",
    hint3: "120 × 6 = 720.",
    category: "sequence",
    difficulty: "hard",
    tags: ["factorials"]
  },
  {
    id: "p050",
    question: "What comes next: C, D, G, H, K, L, ?",
    answer: "O (skip 1, take 2, skip 1, take 2 pattern in alphabet)",
    hint1: "Look at the alphabet positions.",
    hint2: "Skip one letter between pairs.",
    hint3: "After L, skip M, N, take O.",
    category: "sequence",
    difficulty: "medium",
    tags: ["alphabet"]
  },
  
  // Visual (10)
  {
    id: "p051",
    question: "How many triangles are in a triangle with lines drawn from each corner to the midpoint of the opposite side?",
    answer: "16 triangles (the medians create 6 small triangles, plus combinations)",
    hint1: "Count small ones first.",
    hint2: "Then count combinations.",
    hint3: "Include the large outer triangle.",
    category: "visual",
    difficulty: "hard",
    tags: ["geometry", "counting"]
  },
  {
    id: "p052",
    question: "If you draw a square and connect the midpoints of each side, what shape do you get inside?",
    answer: "A smaller square (rotated 45 degrees)",
    hint1: "Draw it out.",
    hint2: "Four equal sides.",
    hint3: "Diamond orientation.",
    category: "visual",
    difficulty: "easy",
    tags: ["geometry", "shapes"]
  },
  {
    id: "p053",
    question: "How many squares are on a standard chess board (including all sizes)?",
    answer: "204 squares (64 1×1 + 49 2×2 + 36 3×3 + 25 4×4 + 16 5×5 + 9 6×6 + 4 7×7 + 1 8×8)",
    hint1: "Count all sizes, not just 1×1.",
    hint2: "Sum of perfect squares 1-8.",
    hint3: "1² + 2² + 3² + ... + 8².",
    category: "visual",
    difficulty: "hard",
    tags: ["chess", "counting"]
  },
  {
    id: "p054",
    question: "What 3D shape has 6 faces, 12 edges, and 8 vertices?",
    answer: "A cube (or rectangular prism)",
    hint1: "Common box shape.",
    hint2: "All sides equal in special case.",
    hint3: "Dice shape.",
    category: "visual",
    difficulty: "easy",
    tags: ["3d", "geometry"]
  },
  {
    id: "p055",
    question: "If you fold a piece of paper in half 3 times and cut one corner, how many holes will it have when unfolded?",
    answer: "8 holes (2³ = 8 layers)",
    hint1: "Each fold doubles the layers.",
    hint2: "2 × 2 × 2 = 8.",
    hint3: "Powers of 2.",
    category: "visual",
    difficulty: "medium",
    tags: ["folding", "spatial"]
  },
  {
    id: "p056",
    question: "How many sides does a hexagon have?",
    answer: "6 sides",
    hint1: "Hexa means six.",
    hint2: "Like a honeycomb cell.",
    hint3: "Stop sign shape has 8, this has 2 fewer.",
    category: "visual",
    difficulty: "easy",
    tags: ["geometry", "basic"]
  },
  {
    id: "p057",
    question: "What shape is formed when you slice a cylinder horizontally (parallel to its base)?",
    answer: "A circle",
    hint1: "Same as the base.",
    hint2: "Round shape.",
    hint3: "No corners.",
    category: "visual",
    difficulty: "easy",
    tags: ["3d", "slicing"]
  },
  {
    id: "p058",
    question: "In a 3×3 grid, how many rectangles (including squares) can you find?",
    answer: "36 rectangles (use formula: C(4,2) × C(4,2) = 6 × 6 = 36)",
    hint1: "Choose 2 vertical and 2 horizontal lines.",
    hint2: "4 lines in each direction.",
    hint3: "Combinations of 2 from 4.",
    category: "visual",
    difficulty: "hard",
    tags: ["grid", "counting"]
  },
  {
    id: "p059",
    question: "What angle is formed by the hands of a clock at 3:00?",
    answer: "90 degrees (right angle)",
    hint1: "One hand points up, one points right.",
    hint2: "Quarter of a circle.",
    hint3: "Perpendicular lines.",
    category: "visual",
    difficulty: "easy",
    tags: ["clock", "angles"]
  },
  {
    id: "p060",
    question: "If you rotate the letter 'N' 90 degrees clockwise, what letter does it look like?",
    answer: "Z",
    hint1: "Visualize the rotation.",
    hint2: "Top becomes right side.",
    hint3: "Diagonal flips direction.",
    category: "visual",
    difficulty: "easy",
    tags: ["rotation", "letters"]
  }
];

// --- UTILITY FUNCTIONS ---

/**
 * Get deterministic index based on current date
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
 * Get random quote (for archive/practice)
 */
function getRandomQuote(excludeId = null) {
  let quote;
  do {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    quote = QUOTES[randomIndex];
  } while (excludeId && quote.id === excludeId);
  return quote;
}

/**
 * Get random puzzle (for archive/practice)
 */
function getRandomPuzzle(excludeId = null) {
  let puzzle;
  do {
    const randomIndex = Math.floor(Math.random() * PUZZLES.length);
    puzzle = PUZZLES[randomIndex];
  } while (excludeId && puzzle.id === excludeId);
  return puzzle;
}

/**
 * Get quotes by category
 */
function getQuotesByCategory(category) {
  return QUOTES.filter(q => q.category === category);
}

/**
 * Get puzzles by category
 */
function getPuzzlesByCategory(category) {
  return PUZZLES.filter(p => p.category === category);
}

/**
 * Get puzzles by difficulty
 */
function getPuzzlesByDifficulty(difficulty) {
  return PUZZLES.filter(p => p.difficulty === difficulty);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUOTES, PUZZLES, getTodayIndex, getTodayQuote, getTodayPuzzle, getQuoteById, getPuzzleById, getRandomQuote, getRandomPuzzle, getQuotesByCategory, getPuzzlesByCategory, getPuzzlesByDifficulty };
}
