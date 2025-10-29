/**
 * Convert Latin text to Cyrillic script
 * Used for Uzbek and Karakalpak languages
 */

const latinToCyrillicMap: Record<string, string> = {
  // Uppercase
  A: 'А',
  B: 'Б',
  D: 'Д',
  F: 'Ф',
  G: 'Г',
  H: 'Ҳ',
  I: 'И',
  J: 'Ж',
  K: 'К',
  L: 'Л',
  M: 'М',
  N: 'Н',
  O: 'О',
  P: 'П',
  Q: 'Қ',
  R: 'Р',
  S: 'С',
  T: 'Т',
  V: 'В',
  X: 'Х',
  Y: 'Й',
  Z: 'З',

  // Lowercase
  a: 'а',
  b: 'б',
  d: 'д',
  f: 'ф',
  g: 'г',
  h: 'ҳ',
  i: 'и',
  j: 'ж',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  q: 'қ',
  r: 'р',
  s: 'с',
  t: 'т',
  v: 'в',
  x: 'х',
  y: 'й',
  z: 'з',
};

export function latinToCyrillic(text: string): string {
  let result = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    const nextChar = text[i + 1];

    // Special two-character combinations
    if (char === 'S' && nextChar === 'h') {
      result += 'Ш';
      i += 2;
    } else if (char === 's' && nextChar === 'h') {
      result += 'ш';
      i += 2;
    } else if (char === 'C' && nextChar === 'h') {
      result += 'Ч';
      i += 2;
    } else if (char === 'c' && nextChar === 'h') {
      result += 'ч';
      i += 2;
    } else if (char === 'O' && (nextChar === "'" || nextChar === "'")) {
      result += 'Ў';
      i += 2;
    } else if (char === 'o' && (nextChar === "'" || nextChar === "'")) {
      result += 'ў';
      i += 2;
    } else if (char === 'G' && (nextChar === "'" || nextChar === "'")) {
      result += 'Ғ';
      i += 2;
    } else if (char === 'g' && (nextChar === "'" || nextChar === "'")) {
      result += 'ғ';
      i += 2;
    }
    // E/Е conversion: Э at word start, Е in the middle
    else if (char === 'E' || char === 'e') {
      const isWordStart = i === 0 || /\s/.test(text[i - 1]);
      if (char === 'E') {
        result += isWordStart ? 'Э' : 'Е';
      } else {
        result += isWordStart ? 'э' : 'е';
      }
      i++;
    }
    // Ya/Я, Yo/Ё, Yu/Ю special cases
    else if (char === 'Y' && nextChar === 'a') {
      result += 'Я';
      i += 2;
    } else if (char === 'y' && nextChar === 'a') {
      result += 'я';
      i += 2;
    } else if (char === 'Y' && nextChar === 'o') {
      result += 'Ё';
      i += 2;
    } else if (char === 'y' && nextChar === 'o') {
      result += 'ё';
      i += 2;
    } else if (char === 'Y' && nextChar === 'u') {
      result += 'Ю';
      i += 2;
    } else if (char === 'y' && nextChar === 'u') {
      result += 'ю';
      i += 2;
    }
    // Ts/Ц combination
    else if (char === 'T' && nextChar === 's') {
      result += 'Ц';
      i += 2;
    } else if (char === 't' && nextChar === 's') {
      result += 'ц';
      i += 2;
    }
    // Single character mapping
    else if (latinToCyrillicMap[char]) {
      result += latinToCyrillicMap[char];
      i++;
    }
    // Keep character as-is (numbers, punctuation, etc.)
    else {
      result += char;
      i++;
    }
  }

  return result;
}
