/**
 * Uzbek Latin to Cyrillic converter
 * Converts Uzbek text from Latin alphabet to Cyrillic alphabet
 */

// Uzbek Latin to Cyrillic mapping
const uzbekLatinToCyrillic: Record<string, string> = {
  // Special characters (must be checked first - longer sequences)
  "O'": 'Ў',
  "o'": 'ў',
  "G'": 'Ғ',
  "g'": 'ғ',
  'Sh': 'Ш',
  'sh': 'ш',
  'Ch': 'Ч',
  'ch': 'ч',
  'Ng': 'Нг',
  'ng': 'нг',
  'Ya': 'Я',
  'ya': 'я',
  'Yo': 'Ё',
  'yo': 'ё',
  'Yu': 'Ю',
  'yu': 'ю',
  'Ye': 'Е',
  'ye': 'е',

  // Single characters
  'A': 'А',
  'a': 'а',
  'B': 'Б',
  'b': 'б',
  'D': 'Д',
  'd': 'д',
  'E': 'Э',
  'e': 'э',
  'F': 'Ф',
  'f': 'ф',
  'G': 'Г',
  'g': 'г',
  'H': 'Ҳ',
  'h': 'ҳ',
  'I': 'И',
  'i': 'и',
  'J': 'Ж',
  'j': 'ж',
  'K': 'К',
  'k': 'к',
  'L': 'Л',
  'l': 'л',
  'M': 'М',
  'm': 'м',
  'N': 'Н',
  'n': 'н',
  'O': 'О',
  'o': 'о',
  'P': 'П',
  'p': 'п',
  'Q': 'Қ',
  'q': 'қ',
  'R': 'Р',
  'r': 'р',
  'S': 'С',
  's': 'с',
  'T': 'Т',
  't': 'т',
  'U': 'У',
  'u': 'у',
  'V': 'В',
  'v': 'в',
  'X': 'Х',
  'x': 'х',
  'Y': 'Й',
  'y': 'й',
  'Z': 'З',
  'z': 'з',
};

/**
 * Converts Uzbek Latin text to Cyrillic
 * @param text Text in Latin alphabet
 * @returns Text in Cyrillic alphabet
 */
export function latinToCyrillic(text: string): string {
  let result = text;

  // First, handle multi-character sequences
  const multiCharKeys = Object.keys(uzbekLatinToCyrillic)
    .filter(k => k.length > 1)
    .sort((a, b) => b.length - a.length);

  for (const latinChar of multiCharKeys) {
    const cyrillicChar = uzbekLatinToCyrillic[latinChar];
    result = result.split(latinChar).join(cyrillicChar);
  }

  // Handle 'E/e' with special logic (Э at start, Е in the middle)
  // Replace E at the beginning of words or after spaces with Э
  result = result.replace(/\bE/g, 'Э'); // Word boundary E → Э
  result = result.replace(/\be/g, 'э'); // Word boundary e → э

  // Replace remaining E/e (in the middle of words) with Е/е
  result = result.replace(/E/g, 'Е');
  result = result.replace(/e/g, 'е');

  // Now handle all other single characters except E/e (already handled)
  const singleCharKeys = Object.keys(uzbekLatinToCyrillic)
    .filter(k => k.length === 1 && k !== 'E' && k !== 'e')
    .sort((a, b) => b.length - a.length);

  for (const latinChar of singleCharKeys) {
    const cyrillicChar = uzbekLatinToCyrillic[latinChar];
    result = result.split(latinChar).join(cyrillicChar);
  }

  return result;
}

/**
 * Converts Cyrillic text to Latin (reverse operation)
 * @param text Text in Cyrillic alphabet
 * @returns Text in Latin alphabet
 */
export function cyrillicToLatin(text: string): string {
  let result = text;

  // Create reverse mapping
  const cyrillicToLatinMap: Record<string, string> = {};
  for (const [latin, cyrillic] of Object.entries(uzbekLatinToCyrillic)) {
    cyrillicToLatinMap[cyrillic] = latin;
  }

  // Sort keys by length (longest first)
  const sortedKeys = Object.keys(cyrillicToLatinMap).sort((a, b) => b.length - a.length);

  for (const cyrillicChar of sortedKeys) {
    const latinChar = cyrillicToLatinMap[cyrillicChar];
    result = result.split(cyrillicChar).join(latinChar);
  }

  return result;
}
