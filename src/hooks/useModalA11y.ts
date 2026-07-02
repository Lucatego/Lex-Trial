import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Standard modal keyboard behavior: Escape closes it, Tab is trapped inside
 * the container while open, the first focusable element is focused on open,
 * and focus returns to whatever triggered the modal once it unmounts.
 */
export function useModalA11y<T extends HTMLElement>(onClose: () => void) {
  const containerRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    const focusables = container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (e.key === 'Tab' && container) {
        const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (nodes.length === 0) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  return containerRef;
}
