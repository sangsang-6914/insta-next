const Stack = require('../service/stack.ts');

describe('stack test', () => {
  let stack: any;
  beforeEach(() => {
    stack = new Stack();
  });
  it('stack size', () => {
    expect(stack.size()).toBe(0);
  });
});
