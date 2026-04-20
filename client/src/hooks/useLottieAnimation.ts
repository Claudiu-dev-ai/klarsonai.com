import { useEffect, useState } from 'react';

export function useLottieAnimation(url: string) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch animation: ${response.statusText}`);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnimation();
  }, [url]);

  return { animationData, loading, error };
}
