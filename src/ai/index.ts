import { GoogleGenerativeAI } from '@google/generative-ai'
import { GAME_DATA_RESPONSE } from '../types/game.type'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: 'application/json',
}

export async function fetchGameData(): Promise<GAME_DATA_RESPONSE> {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hi, do you know the game Figgerits?' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: "Yes, I do! I know Figgerits. It's a logic puzzle game that combines a word puzzle (usually a cryptogram) with a logic grid.\n\nHere's what I know about Figgerits:\n\n*   **Gameplay:** You have a set of clues, often in the form of a cryptogram where each number represents a letter. You also have a logic grid where you need to deduce which number corresponds to which letter. By solving the logic grid, you decode the letters, which then helps you solve the cryptogram and reveal a hidden phrase or fact.\n\n*   **Core Mechanics:** The game relies heavily on logical deduction, pattern recognition, and understanding how both cryptograms and logic grids work.\n\n*   **Popularity:** It's a fairly popular puzzle game available on mobile devices (iOS and Android) and often played online. It's enjoyed by people who like brain teasers, logic problems, and word games.\n\n*   **Features:** It usually has levels of increasing difficulty, various themes, and can be a good way to improve critical thinking skills.\n\nIs there anything specific you want to know about Figgerits? Maybe you're looking for tips, or want to discuss a particular puzzle? Let me know!\n",
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "Ok, I'm building a Figgerits clone in ReactJS, can you give me the necessary data for the game to work? a random phrase that has to be discovered, and a set of clues to help the user decode the cryptogram. I need this data as an api response in json, in order to be used in the app",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, here\'s a JSON structure you can use as an API response for your Figgerits clone, complete with a phrase to discover, a cryptogram, and clues for the logic grid. I\'ve tried to make the clues reasonable for a small, introductory puzzle.\n\n```json\n{\n  "puzzleId": "12345",\n  "phrase": "REACT IS FUN",\n  "cryptogram": "12345 67 890",\n  "clues": [\n    {\n      "type": "row",\n      "index": 0,\n      "statement": "The number representing \'A\' is less than 4."\n    },\n    {\n      "type": "row",\n      "index": 1,\n      "statement": "The number representing \'C\' is an even number."\n    },\n    {\n      "type": "column",\n      "index": 1,\n      "statement": "The number 1 is either \'R\' or \'T\'."\n    },\n    {\n      "type": "column",\n      "index": 2,\n      "statement": "The number 2 is not \'C\'."\n    },\n    {\n       "type": "row",\n       "index": 2,\n       "statement": "The number representing \'F\' is not an odd number"\n    }\n  ],\n  "solution": {\n    "1": "R",\n    "2": "E",\n    "3": "A",\n    "4": "C",\n    "5": "T",\n    "6": "I",\n    "7": "S",\n    "8": "F",\n    "9": "U",\n    "0": "N"\n  }\n}\n```\n\n**Explanation of the fields:**\n\n*   `puzzleId`:  A unique identifier for the puzzle.  Useful for saving progress or tracking statistics.\n\n*   `phrase`: The phrase that the player needs to uncover.  This is the answer.\n\n*   `cryptogram`: The encoded phrase. The user will decode this string.\n\n*   `clues`:  An array of clues.  Each clue is an object with:\n\n    *   `type`:  Indicates whether the clue primarily relates to a row ("row") or a column ("column") of the logic grid.  This is helpful to guide the player\'s thinking.\n    *   `index`: The index of either the row of letters (`row`) or column of numbers (`column`) the clue relates to. Index starts at 0.\n    *   `statement`:  The actual text of the clue.\n\n*   `solution`:  (Important, but probably hidden from the player initially).  A dictionary mapping the numbers in the `cryptogram` to the correct letters of the alphabet. This is how you\'ll verify the user\'s answer.  **Don\'t send this to the client until the user solves the puzzle or asks for a solution!**\n\n**How to use this data in your ReactJS app:**\n\n1.  **Fetch the data:**  Use `fetch` or `axios` to retrieve this JSON data from your API endpoint.\n2.  **Store in state:**  Store the fetched data in your React component\'s state using `useState`.\n3.  **Render the UI:**\n    *   Display the `cryptogram`.\n    *   Display the `clues`.\n    *   Create the logic grid based on the number of unique numbers in the `cryptogram` and the letters used in the target phrase.  (The `cryptogram` is important for determining the grid size!)\n    *   Provide input fields (e.g., dropdowns or text boxes) for the user to enter their letter-number mappings on the logic grid.\n4.  **Handle user input:** As the user fills in the grid, update the component\'s state to reflect their guesses.\n5.  **Check the solution:** When the user submits their answer, compare their mappings to the `solution` data to determine if they are correct.\n6.  **Reveal the phrase:** If the solution is correct, use the user\'s mappings to decode the `cryptogram` and display the `phrase`.\n\n**Important Considerations for Generating Puzzles:**\n\n*   **Difficulty:**  The difficulty of a Figgerits puzzle depends on:\n    *   The length of the phrase.\n    *   The complexity of the logic grid (number of possible combinations).\n    *   The clarity and specificity of the clues. (Ambiguous or vague clues are frustrating!)\n*   **Solvability:** *Always* make sure your puzzle is solvable using the clues provided! It\'s a good idea to have an algorithm that can solve the puzzle to verify its integrity before presenting it to the user.\n*   **Randomization:** If you\'re generating puzzles randomly, consider:\n    *   Picking a phrase first.\n    *   Choosing a random mapping of numbers to letters.\n    *   *Then* carefully designing clues that uniquely lead to that solution.  This is the hard part!\n\nThis structure provides a good starting point.  Good luck with your Figgerits clone!  Let me know if you have any more questions.\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Change the phrase and the clues and use content based on historical facts or quotes related to science',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, here\'s a modified JSON response with a phrase and clues related to science history, keeping the same basic structure:\n\n```json\n{\n  "puzzleId": "67890",\n  "phrase": "EUREKA I FOUND IT",\n  "cryptogram": "123145 6 7890 65",\n  "clues": [\n    {\n      "type": "row",\n      "index": 0,\n      "statement": "The number representing \'E\' is a prime number less than 5."\n    },\n    {\n      "type": "row",\n      "index": 1,\n      "statement": "The number representing \'U\' is greater than the number representing \'K\'."\n    },\n    {\n      "type": "column",\n      "index": 1,\n      "statement": "The number 1 is either \'E\' or \'A\'."\n    },\n    {\n      "type": "column",\n      "index": 2,\n      "statement": "The number 2 is not \'U\'."\n    },\n     {\n      "type": "row",\n      "index": 2,\n      "statement": "The number representing \'N\' is an even number"\n    },\n    {\n      "type": "row",\n      "index": 3,\n      "statement": "The number representing \'F\' is the greatest number"\n    },\n     {\n      "type": "row",\n      "index": 4,\n      "statement": "The number representing \'I\' is greater than 5."\n    }\n  ],\n  "solution": {\n    "1": "E",\n    "2": "U",\n    "3": "R",\n    "4": "K",\n    "5": "A",\n    "6": "I",\n    "7": "F",\n    "8": "O",\n    "9": "N",\n    "0": "D"\n  }\n}\n```\n\n**Explanation of Changes:**\n\n*   `phrase`: Changed to "EUREKA I FOUND IT", a famous quote attributed to Archimedes upon discovering a method for determining the purity of gold.\n*   `cryptogram`: Updated to reflect the new phrase.\n*   `clues`:  I rewrote the clues to be:\n    *   Consistent with the new letter arrangement.\n    *   Somewhat thematic (e.g., using "prime number").\n    *   A mix of row-based and column-based clues.\n\n**Why these clues are designed this way:**\n\n*   **Starting Points:**  The first clue (E being a prime number) is a good starting point because it limits the possibilities for \'E\' to 2 or 3.  This forces the user to start making deductions.\n*   **Relational Clues:** Clues like "U is greater than K" force the user to compare possibilities and eliminate candidates across the grid.\n*   **Combined Information:**  By using both row and column clues, the user needs to combine information to make progress.\n*   **Avoid Ambiguity:** The goal is that *each* clue, when combined with previous deductions, allows the user to confidently eliminate possibilities on the grid.\n\n**Tips for Creating Good Science/History Themed Puzzles:**\n\n1.  **Choose a Phrase Carefully:** Select a well-known quote, a significant scientific discovery, or a short biographical detail.\n2.  **Research Background Information:**  Use the background of the phrase or fact to inspire the clues. For example:\n    *   If the phrase is about a scientist, use clues that relate to their field of study or their life.\n    *   If the phrase is a scientific term, define aspects of the term as clues.\n3.  **Balance Difficulty and Engagement:**  Make the puzzle challenging but not frustrating. If the user gets stuck early on, they might give up.\n4.  **Variety:** Mix different types of clues (number relationships, alphabetical order, thematic hints).\n\nThis updated example should give you a solid foundation.  Remember to test your puzzle yourself to ensure it\'s solvable and reasonably fun!\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [{ text: 'Make the phrase a little bit longer' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Alright, here\'s a longer phrase and updated clues, still focusing on a science history theme:\n\n```json\n{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "type": "row",\n      "index": 0,\n      "statement": "The number representing \'G\' is an odd number less than 3."\n    },\n    {\n      "type": "row",\n      "index": 1,\n      "statement": "The number representing \'A\' is a prime number."\n    },\n    {\n      "type": "column",\n      "index": 1,\n      "statement": "The number 1 represents either \'G\' or \'F\'."\n    },\n    {\n      "type": "column",\n      "index": 2,\n      "statement": "The number 2 is not \'V\'."\n    },\n    {\n      "type": "row",\n      "index": 2,\n      "statement": "The number representing \'V\' is larger than 4."\n    },\n    {\n      "type": "row",\n      "index": 3,\n      "statement": "The number representing \'I\' is divisible by 3."\n    },\n     {\n      "type": "row",\n      "index": 4,\n      "statement": "The number representing \'S\' is next to each other"\n    },\n    {\n      "type": "row",\n      "index": 5,\n      "statement": "The number representing \'L\' is the greatest number"\n    },\n    {\n      "type": "row",\n      "index": 6,\n      "statement": "The number representing \'E\' is the smallest number"\n    },\n      {\n      "type": "row",\n      "index": 7,\n      "statement": "The number representing \'P\' is less than 8."\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n```\n\n**Key Changes and Considerations for Longer Phrases:**\n\n*   **Longer Cryptogram:** A longer phrase means a longer cryptogram, requiring more numbers to represent the letters.\n*   **More Letters:** This phrase uses more unique letters, which makes the logic grid larger and potentially more complex.\n*   **More Clues Required:** You\'ll need more clues to guide the user and make the puzzle solvable without being *too* easy.\n*   **Variety in Clues is Critical:**  To keep the user engaged with a longer puzzle, use a variety of clue types:\n    *   Numerical comparisons ("greater than," "less than," "prime").\n    *   Positioning clues ("next to each other").\n    *   Mathematical clues ("divisible by").\n*   **Theme-Relevant Clues:** Try to work in clues that relate to the subject matter of the phrase. (This is harder with longer phrases, but even subtle hints can enhance the experience.)\n*   **Einstein Quote:** The phrase is a quote attributed to Albert Einstein.\n\n**Important:** Double-check that *all* the letters in your phrase are actually represented in the `solution` map. And *triple-check* that your clues lead to a unique and solvable solution. Creating puzzles is a bit of an iterative process! You may need to tweak the clues until you\'re happy with the difficulty level.\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Ok, I like the length of the phrase, now make the clues similar to the phrase, some kind of questions with a hidden answer for the player to discover and help them reveal new letters to deduce the main phrase',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, I understand. I\'ll refactor the clues to be more like riddles or questions with hidden answers related to the phrase, acting as hints to reveal specific letters.\n\n```json\n{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "type": "row",\n      "index": 0,\n      "statement": "Which force keeps the apple from floating away? The number is 1, so it\'s the letter: \'1\'"\n    },\n    {\n      "type": "row",\n      "index": 1,\n      "statement": "What is the first letter of the scientific unit for measuring angles in a circle? The number is 3, so it\'s the letter: \'3\'"\n    },\n    {\n      "type": "column",\n      "index": 5,\n      "statement": "What do you call the capacity to cause change? The number is 6, so it\'s the letter: \'6\'."\n    },\n    {\n      "type": "column",\n      "index": 4,\n      "statement": "If I\'m at the center of the Earth, what am I? The number is 5, so it\'s the letter: \'5\'."\n    },\n    {\n      "type": "row",\n      "index": 2,\n      "statement": "What letter do you get if you remove the dot from the lowercase \'i\'? The number is 4, so it\'s the letter: \'4\'."\n    },\n    {\n      "type": "row",\n      "index": 3,\n      "statement": "What is the 5th letter on the alphabet? The number is 5, so it\'s the letter: \'5\'."\n    },\n     {\n      "type": "row",\n      "index": 4,\n      "statement": "The element with atomic number 16. The number is 8, so it\'s the letter: \'8\'."\n    },\n    {\n      "type": "row",\n      "index": 5,\n      "statement": "If I have 20 faces and I\'m made from a regular polygon, what shape I am? The number is 12, so it\'s the letter: \'L\'."\n    },\n    {\n      "type": "row",\n      "index": 6,\n      "statement": "Which letter could represent energy, force, electric charge, etc? The number is 12, so it\'s the letter: \'L\'."\n    },\n      {\n      "type": "row",\n      "index": 7,\n      "statement": "What is the opposite of True? The number is 7, so it\'s the letter: \'7\'."\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n```\n\n**Explanation of Changes:**\n\n1.  **Clue Format:** Each clue is now a question or riddle. The answer to the question is related to a specific letter in the puzzle. At the end of the clue, I\'ve added "The letter is [Number], so it\'s the letter: \'[Letter]\'". This reveals a letter directly from the riddle.\n\n2.  **Theme:** The clues are designed to be science-related, connecting to the quote and the overall theme.\n\n3.  **Letter Distribution:** The riddles are designed to reveal a good starting set of letters across the puzzle to help the user begin to decode other parts of the cryptogram.\n\n**Important Implementation Details:**\n\n*   **Clue UI:** Your React component will need to render these clues in a user-friendly way. Display the question, and perhaps have a reveal button or toggle for each clue that, when activated, reveals the number and letter hint.\n\n*   **Difficulty and Information:** Because the letters are being revealed in each clue, you may need to create harder clues, depending on the skills of the user.\n\n*   **Progressive Disclosure:** Think about whether you want to initially display *all* clues or have them unlock progressively as the user solves portions of the puzzle.\n\nThese question-based clues are much more engaging than the numerical and positioning clues from the previous examples. This version of your Figgerits clone should be quite fun! Let me know if you have other questions.\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "I need the object structure of the clues to be {statement: string, index: number, answer: string}, where 'statement' is the puzzle/riddle/question itself, and 'answer' is the answer for the riddle, puzzle or question",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, I understand. Here\'s the JSON with the `clues` array refactored to use the `{statement: string, index: number, answer: string}` object structure as requested.\n\n```json\n{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "statement": "Which force keeps the apple from floating away?",\n      "index": 0,\n      "answer": "G"\n    },\n    {\n      "statement": "What is the first letter of the scientific unit for measuring angles in a circle?",\n      "index": 1,\n      "answer": "A"\n    },\n    {\n      "statement": "What do you call the capacity to cause change?",\n      "index": 5,\n      "answer": "T"\n    },\n    {\n      "statement": "If I\'m at the center of the Earth, what am I?",\n      "index": 4,\n      "answer": "I"\n    },\n    {\n      "statement": "What letter do you get if you remove the dot from the lowercase \'i\'?",\n      "index": 2,\n      "answer": "V"\n    },\n    {\n      "statement": "What is the 5th letter on the alphabet?",\n      "index": 4,\n      "answer": "I"\n    },\n    {\n      "statement": "The element with atomic number 16?",\n      "index": 4,\n      "answer": "S"\n    },\n    {\n      "statement": "If I have 20 faces and I\'m made from a regular polygon, what shape I am?",\n      "index": 12,\n      "answer": "E"\n    },\n    {\n      "statement": "Which letter could represent energy, force, electric charge, etc?",\n      "index": 12,\n      "answer": "E"\n    },\n    {\n      "statement": "What is the opposite of True?",\n      "index": 7,\n      "answer": "Y"\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n```\n\n**Changes Made:**\n\n*   The `clues` array now contains objects with the following structure:\n\n    *   `statement`: The question or riddle.\n    *   `index`: (This remains the same) It indicates which *row* in your letter grid the answer refers to or, potentially, the number that the revealed letter corresponds to in the puzzle. (This is where you need to decide in your React component how to use that `index` to correctly update the game state.)\n    *   `answer`: The single-letter answer to the riddle/question.\n\n**Important Considerations for Implementation in Your React App:**\n\n*   **Index Interpretation:** You\'ll need to decide how the `index` field is used in your React component. Two common options:\n\n    1.  **Letter Grid Row:** The `index` corresponds to the row of a letter in your letter grid. So, when the user solves the riddle, you\'ll update the letter grid, filling in the letter at that row. The letter grid then becomes a visual aid to help solve the main cryptogram.\n    2.  **Cryptogram Number:** The `index` corresponds to the number in the cryptogram that the `answer` maps to. So, when the riddle is solved, you immediately know that "number 4 is the letter \'V\'", and you can update the decoded portion of the main puzzle.\n\n*   **State Management:** Carefully plan how you\'ll store the user\'s progress, the revealed letters, and how the component re-renders as they solve the puzzle.\n\n*   **UI/UX:** Think about how the user interacts with the clues. Should all clues be visible initially? Should they be revealed one at a time? How do you handle revealing the answer (e.g., a button click)?\n\nThis structure gives you a lot of flexibility. Good luck with your project!\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          { text: 'The answer of the clues have to be a full word or phrase, not a single letter' },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, I understand. Here\'s the JSON with the `clues` array refactored to have full words or phrases as answers:\n\n```json\n{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "statement": "Which force keeps the apple from floating away?",\n      "index": 1,\n      "answer": "GRAVITY"\n    },\n    {\n      "statement": "What is the first letter of the scientific unit for measuring angles in a circle?",\n      "index": 3,\n      "answer": "ANGLE"\n    },\n    {\n      "statement": "What do you call the capacity to cause change?",\n      "index": 6,\n      "answer": "ENERGY"\n    },\n    {\n      "statement": "If I\'m at the center of the Earth, what am I?",\n      "index": 5,\n      "answer": "INNER CORE"\n    },\n    {\n      "statement": "What letter do you get if you remove the dot from the lowercase \'i\'?",\n      "index": 4,\n      "answer": "REMOVE"\n    },\n    {\n      "statement": "What is the 5th letter on the alphabet?",\n      "index": 5,\n      "answer": "LETTER"\n    },\n    {\n      "statement": "The element with atomic number 16?",\n      "index": 8,\n      "answer": "SULFUR"\n    },\n    {\n      "statement": "If I have 20 faces and I\'m made from a regular polygon, what shape I am?",\n      "index": 12,\n      "answer": "ICOSAHEDRON"\n    },\n    {\n      "statement": "Which letter could represent energy, force, electric charge, etc?",\n      "index": 12,\n      "answer": "EQUATION"\n    },\n    {\n      "statement": "What is the opposite of True?",\n      "index": 7,\n      "answer": "FALSE"\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n```\n\n**Key Changes and Considerations:**\n\n*   **`answer` is now a word or phrase:** The `answer` property in each clue object now contains a full word or phrase related to the question/riddle.\n*   **index** You can choose whatever letter from the answer word to reveal, this is just an example.\n\n**Important Implementation Considerations:**\n\n*   **Clue UI and Interaction:** You need to think about how the "index" will be used.\n*   **Testing:** Make sure your changes work correctly and that the overall gameplay is still engaging.\n*   **Complexity:** Full-word answers increase the complexity of the game. Be sure to adjust the difficulty level as needed.\n\nThis refactored JSON should give you a more flexible structure for creating interesting and engaging Figgerits puzzles!\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "Ok, it's getting better... now make the clues relating to any topic (it could be grammar, entertainment, history, technology, etc.)",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "statement": "What word describes the state of being serious or solemn?",\n      "index": 1,\n      "answer": "GRAVE"\n    },\n    {\n      "statement": "Which word is used to express joy or astonishment?",\n      "index": 3,\n      "answer": "AHA"\n    },\n    {\n      "statement": "What word describes when you are currently existing or living?",\n      "index": 6,\n      "answer": "TODAY"\n    },\n    {\n      "statement": "Where does the White House is located?",\n      "index": 5,\n      "answer": "DISTRICT"\n    },\n    {\n      "statement": "What is the name of a large body of water, typically salt water, that covers most of the Earth\'s surface?",\n      "index": 4,\n      "answer": "PACIFIC"\n    },\n    {\n      "statement": "Which word can be used to ask \'why\' or express a question?",\n      "index": 5,\n      "answer": "QUESTION"\n    },\n    {\n      "statement": "What word defines the action of observing or perceiving something?",\n      "index": 8,\n      "answer": "SEEING"\n    },\n    {\n      "statement": "How do you call the ability or strength to do something with a successful result?",\n      "index": 12,\n      "answer": "CAPACITY"\n    },\n    {\n      "statement": "What is the system of words used in a particular discipline?",\n      "index": 12,\n      "answer": "LANGUAGE"\n    },\n    {\n      "statement": "What is the opposite of \'right\' or \'correct\'?",\n      "index": 7,\n      "answer": "WRONG"\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "The answers for the clues can't be part of the text of the statement (It's important that the player can't be able to see the answer of each clue)",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "statement": "Think of a somber mood or a serious occasion.",\n      "index": 1,\n      "answer": "GRAVE"\n    },\n    {\n      "statement": "Consider the sound you make when suddenly understanding something.",\n      "index": 3,\n      "answer": "AHA"\n    },\n    {\n      "statement": "Imagine yourself existing at this very moment.",\n      "index": 6,\n      "answer": "TODAY"\n    },\n    {\n      "statement": "Picture the area where the US president lives and works.",\n      "index": 5,\n      "answer": "DISTRICT"\n    },\n    {\n      "statement": "Envision the largest body of water on Earth.",\n      "index": 4,\n      "answer": "PACIFIC"\n    },\n    {\n      "statement": "Imagine yourself seeking knowledge or clarification.",\n      "index": 5,\n      "answer": "QUESTION"\n    },\n    {\n      "statement": "Picture the action of using your eyes to understand the world.",\n      "index": 8,\n      "answer": "SEEING"\n    },\n    {\n      "statement": "Think of the power or skill needed to achieve something.",\n      "index": 12,\n      "answer": "CAPACITY"\n    },\n    {\n      "statement": "Imagine a system used for communication and expression.",\n      "index": 12,\n      "answer": "LANGUAGE"\n    },\n    {\n      "statement": "Consider the opposite of being correct.",\n      "index": 7,\n      "answer": "WRONG"\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [{ text: 'Avoid answers with 3 or less letters' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: '{\n  "puzzleId": "98765",\n  "phrase": "GRAVITY IS NOT RESPONSIBLE FOR PEOPLE FALLING IN LOVE",\n  "cryptogram": "123456 78 905 12790783964812 792 31132 639974 70 5312",\n  "clues": [\n    {\n      "statement": "Think of a burial site or a serious situation.",\n      "index": 1,\n      "answer": "GRAVEYARD"\n    },\n    {\n      "statement": "Consider a method for achieving something.",\n      "index": 3,\n      "answer": "APPROACH"\n    },\n    {\n      "statement": "Imagine the current time or period.",\n      "index": 6,\n      "answer": "PRESENTLY"\n    },\n    {\n      "statement": "Picture the home of the US president.",\n      "index": 5,\n      "answer": "RESIDENCE"\n    },\n    {\n      "statement": "Envision a large body of saltwater.",\n      "index": 4,\n      "answer": "AQUAMARINE"\n    },\n    {\n      "statement": "Imagine expressing a desire to know something.",\n      "index": 5,\n      "answer": "INQUIRING"\n    },\n    {\n      "statement": "Picture using your senses to become aware of something.",\n      "index": 8,\n      "answer": "OBSERVING"\n    },\n    {\n      "statement": "Think of having the skill or ability to do something.",\n      "index": 12,\n      "answer": "COMPETENCE"\n    },\n    {\n      "statement": "Imagine a shared method of communication used by a community.",\n      "index": 12,\n      "answer": "DICTIONARY"\n    },\n    {\n      "statement": "Consider something that is incorrect or inaccurate.",\n      "index": 7,\n      "answer": "MISTAKENLY"\n    }\n  ],\n  "solution": {\n    "1": "G",\n    "2": "R",\n    "3": "A",\n    "4": "V",\n    "5": "I",\n    "6": "T",\n    "7": "Y",\n    "8": "S",\n    "9": "N",\n    "0": "O",\n    "L": "E",\n    "P": "F"\n  }\n}\n',
          },
        ],
      },
      {
        role: 'user',
        parts: [{ text: "Be careful with grammar, it's important to avoid misspellings" }],
      },
      {
        role: 'user',
        parts: [{ text: 'Give me the content in spanish' }],
      },
    ],
  })

  const result = await chatSession.sendMessage('Give me a new random phrase and new random clues')
  const data = JSON.parse(result.response.text())
  console.log(data)
  return data
}
