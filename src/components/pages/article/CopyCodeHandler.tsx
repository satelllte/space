import {useEffect} from 'react';

export function CopyCodeHandler() {
  useEffect(() => {
    const status = document.querySelector<HTMLElement>(
      '[data-copy-code-status]',
    );
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      'button[data-copy-code]',
    );

    const timeouts = new Map<
      HTMLButtonElement,
      ReturnType<typeof setTimeout>
    >();

    const handleClick = async (button: HTMLButtonElement) => {
      const codeElement = button
        .closest('[data-slot="mdx-code-block"]')
        ?.querySelector('pre code');
      if (!codeElement) return;

      const code = codeElement.textContent;
      if (!code) return;

      const message = await navigator.clipboard
        .writeText(code)
        .then(() => 'Copied')
        .catch(() => 'Failed to copy');
      button.textContent = message;

      if (status) {
        status.textContent = `${message} to clipboard`;
      }

      const previousTimeout = timeouts.get(button);
      if (previousTimeout) {
        clearTimeout(previousTimeout);
      }

      const timeout = setTimeout(() => {
        button.textContent = 'Copy';
        if (status) status.textContent = '';
        timeouts.delete(button);
      }, 2000);

      timeouts.set(button, timeout);
    };

    const handlers = new Map<HTMLButtonElement, () => void>();

    for (const button of buttons) {
      button.hidden = false;
      const handler = async () => {
        void handleClick(button);
      };
      handlers.set(button, handler);
      button.addEventListener('click', handler);
    }

    return () => {
      for (const [button, handler] of handlers) {
        button.removeEventListener('click', handler);
      }
      for (const timeout of timeouts.values()) {
        clearTimeout(timeout);
      }
      timeouts.clear();
    };
  }, []);

  return <div data-copy-code-status role='status' className='sr-only'></div>;
}
