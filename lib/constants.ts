/**
 * 1 spacing unit
 */
export const SPACING = 8;

/**
 * Create padding for an element. Works the same as the CSS attributes.
 * Ex: createSpacing(1) => `8px` | createSpacing(2, 0) => `16px 0px`
 * @param paddingUnits array of numbers
 */
export function createSpacing(...paddingUnits: number[]): string {
  if (paddingUnits.length === 0 || paddingUnits.length > 4) {
    console.error(
      `Expected > 0 or < 4 arguments. Received ${paddingUnits.length}!\n${paddingUnits}`
    );
    return "";
  }

  return paddingUnits.map((n) => `${n * SPACING}px`).join(" ");
}
