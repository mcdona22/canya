export type Level = 'success' | 'info' | 'warning' | 'error';

export type MessageMap<T> = Record<Level, T>;

// Example usage:
const messageIcons: MessageMap<string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
};
