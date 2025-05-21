// src/lib/utils.ts

export function isValidUrl(url: string): boolean {
  try {
    // First, try the simple regex that was in the original code,
    // as it might be specific to the expected URL patterns.
    const specificPattern = new RegExp(
      /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s/$.?#].[^\s]*$/
    );
    if (specificPattern.test(url)) {
      // Further check using the URL constructor for a more robust validation.
      new URL(url);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
