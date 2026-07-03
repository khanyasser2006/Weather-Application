import { useState, useEffect } from 'react';

export default function useIntroAnimation() {
  const [isFirstLoad] = useState(() => {
    if (typeof window === 'undefined') return false;
    const played = sessionStorage.getItem('skyora-intro-played');
    if (!played) {
      sessionStorage.setItem('skyora-intro-played', 'true');
      return true;
    }
    return false;
  });

  return isFirstLoad;
}
