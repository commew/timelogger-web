import { useState, useEffect } from 'react';
import { ExhaustiveError } from '@/features';

const timeCalculator = (time: number): string => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = time % 60;

  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');
  const secondStr = second.toString().padStart(2, '0');
  const formattedTime = `${hourStr}:${minuteStr}:${secondStr}`;

  return formattedTime;
};

/**
 * @param duration - タスクの時間
 * @param status - タスクの状態
 * @returns HH:MM:SS 形式の時間
 * @description タスクの時間を HH:MM:SS 形式に変換する. タスクの状態が recording の場合はカウントが進むようにする.
 */
export const useTaskTimer = (
  duration: number,
  status: 'recording' | 'pending' | 'completed'
): string => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    let id: NodeJS.Timeout;

    switch (status) {
      case 'recording':
        id = setInterval(() => {
          setTime((t) => t + 1);
        }, 1000);

        return () => {
          clearInterval(id);
        };
      case 'pending':
      case 'completed':
        return;
      default:
        throw new ExhaustiveError(status);
    }
  }, [status]);

  return timeCalculator(time);
};
