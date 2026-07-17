/**
 * Utility functions for common operations across the application.
 */

/**
 * Generates an initial password based on the user's phone number.
 * Uses the last 4 digits of the phone number.
 * 
 * // TODO: Implement First Login Password Change mechanism
 * 
 * @param {string} phone - The user's phone number
 * @returns {string} The generated password
 */
export const generateInitialPassword = (phone) => {
  if (!phone) return '1234'; // Fallback
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return digits.padEnd(4, '0');
  return digits.slice(-4);
};

/**
 * Validates a phone number.
 * Ensures it contains at least 12 digits (e.g. 998901234567).
 * 
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length === 12 && digits.startsWith('998');
};

/**
 * Formats a raw phone string into a standard format: +998 90 123 45 67
 * 
 * @param {string} value - The raw phone input
 * @returns {string} Formatted phone string
 */
export const formatPhone = (value) => {
  let val = value.replace(/[^\d+]/g, '');
  if (!val.startsWith('+998')) val = '+998';
  
  let digits = val.replace(/\D/g, '').substring(3);
  let formatted = '+998';
  if (digits.length > 0) formatted += ' ' + digits.substring(0, 2);
  if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
  if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
  if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
  
  return formatted;
};
