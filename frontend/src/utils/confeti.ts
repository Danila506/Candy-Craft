// utils/confetti.ts
import confetti from 'canvas-confetti';

export const launchSweetConfetti = () => {
  // Основной взрыв конфетти
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });

  // Дополнительные конфетти в виде сердечек
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.3, y: 0.6 },
      shapes: ['circle', 'square'],
      colors: ['#ff398b', '#ff6ba9', '#ff9ec0']
    });
  }, 250);

  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.7, y: 0.6 },
      shapes: ['circle', 'square'],
      colors: ['#ff398b', '#ff6ba9', '#ff9ec0']
    });
  }, 500);
};