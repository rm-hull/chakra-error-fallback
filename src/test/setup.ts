import "@testing-library/jest-dom/vitest";
import { JSDOM } from "jsdom";
import ResizeObserver from "resize-observer-polyfill";
import { vi } from "vitest";
import "vitest-axe/extend-expect";

const { window } = new JSDOM();

// Mock getComputedStyle on the JSDOM window object
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: vi.fn((_elt: Element) => {
    void _elt; // Explicitly mark as unused
    return {
      getPropertyValue: vi.fn((_prop: string) => {
        void _prop; // Explicitly mark as unused
        return '';
      }),
      width: '0px',
      height: '0px',
    } as CSSStyleDeclaration; // Cast to CSSStyleDeclaration to satisfy types
  }), // Closing parenthesis for vi.fn()
});

// ResizeObserver mock
vi.stubGlobal("ResizeObserver", ResizeObserver);


// matchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver mock
class MockIntersectionObserver implements IntersectionObserver { // Explicitly implement
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
  root = null; // Add required properties
  rootMargin = "";
  thresholds = [];

  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    void _callback;
    void _options;
    // We can store callback and options if needed for advanced testing
  }
}
// @ts-expect-error: `vi.stubGlobal` expects a constructor type for IntersectionObserver, but our mock class might not fully match all properties or methods of the native IntersectionObserver constructor, leading to a type mismatch.
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as typeof IntersectionObserver);


// Scroll Methods mock
Object.defineProperty(window.Element.prototype, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn(),
});

// requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60);

// URL object mock
window.URL.createObjectURL = () => "https://i.pravatar.cc/300";
window.URL.revokeObjectURL = () => {};

// navigator mock
Object.defineProperty(window, "navigator", {
  value: {
    clipboard: {
      writeText: vi.fn(async (): Promise<void> => {}),
    },
  },
});

vi.stubGlobal("window", window);
vi.stubGlobal("document", window.document);