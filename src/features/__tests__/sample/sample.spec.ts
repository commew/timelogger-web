import { sampleFunc } from '@/features';

describe('src/features/sample.ts sampleFunc Test Cases', () => {
  it('should return the result of addition.', () => {
    expect(sampleFunc(1, 5)).toStrictEqual(6);
  });
});
