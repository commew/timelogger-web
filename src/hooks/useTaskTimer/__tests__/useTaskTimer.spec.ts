import { renderHook, act } from '@testing-library/react';
import { useTaskTimer } from '@/hooks';

describe('src/hooks/useTaskTimer/useTaskTimer.ts TestCases', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return the formatted time for recording status', () => {
    const { result } = renderHook(() => useTaskTimer(0, 'recording'));

    expect(result.current).toBe('00:00:00');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('00:00:01');
  });

  it('should return the formatted time for pending status', () => {
    const { result } = renderHook(() => useTaskTimer(14410, 'pending'));

    expect(result.current).toBe('04:00:10');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('04:00:10');
  });

  it('should return the formatted time for completed status', () => {
    const { result } = renderHook(() => useTaskTimer(300, 'completed'));
    expect(result.current).toBe('00:05:00');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('00:05:00');
  });

  it('should return the formatted time for very long time.', () => {
    const { result } = renderHook(() => useTaskTimer(360000, 'completed')); // 100時間
    expect(result.current).toBe('100:00:00');
  });
});
