import {describe, expect} from 'vitest';
import {cn} from './cn';

describe('cn', (it) => {
  it('works', () => {
    expect(cn('c1')).toEqual('c1');
    expect(cn('c1', 'c2')).toEqual('c1 c2');
    expect(cn(true && 'c1', false && 'c2', 'c3')).toEqual('c1 c3');
    expect(cn(false && 'c1', 'c2', 'c3')).toEqual('c2 c3');
  });
});
