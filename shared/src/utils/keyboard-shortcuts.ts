/**
 * Generates F-key label for an option based on its index
 * @param index - Zero-based index of the option
 * @returns F-key label (F1, F2, F3, etc.)
 */
export function getFKeyLabel(index: number): string {
  return `F${index + 1}`;
}

/**
 * Gets the F-key name for keyboard event handling
 * @param index - Zero-based index of the option
 * @returns Key name for keyboard events
 */
export function getFKeyName(index: number): string {
  return `F${index + 1}`;
}

/**
 * Checks if a keyboard event matches an F-key for a given index
 * @param event - Keyboard event
 * @param index - Zero-based index to match
 * @returns True if the event matches the F-key for this index
 */
export function isFKeyForIndex(event: KeyboardEvent, index: number): boolean {
  return event.key === getFKeyName(index);
}
