import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { TextEncoder, TextDecoder } from 'util';

// jsdom does not provide TextEncoder/TextDecoder, which react-router 7 needs at
// import time. Polyfill them before any component module is loaded.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

expect.extend(toHaveNoViolations);
