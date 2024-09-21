import {useEffect} from 'react';

export function ConsoleMessage() {
  useEffect(() => {
    if (window.sessionStorage.getItem('hello_message_shown') === 'true') return;
    window.sessionStorage.setItem('hello_message_shown', 'true');
    console.info(
      'Hello and welcome :)\nFeel free to check out the source code:\nhttps://github.com/satelllte/space',
    );
  }, []);

  return null;
}
