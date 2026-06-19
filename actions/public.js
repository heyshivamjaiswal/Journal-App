'use server';

import { revalidateTag, unstable_cache } from 'next/cache';

export async function getUnsplashImage(query) {
  console.log('UNSPLASH KEY:', process.env.UNSPLASH_ACCESS_KEY);

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.results?.[0]?.urls?.regular || null;
  } catch (error) {
    console.error('Unsplash Error:', error);
    return null;
  }
}

export const getDailyPrompt = unstable_cache(
  async () => {
    try {
      const res = await fetch('https://api.adviceslip.com/advice', {
        cache: 'no-store',
      });
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      return {
        success: false,
        data: "What's on your mind today?",
      };
    }
  },
  ['daily-prompt'], // cache key
  {
    revalidate: 86400, // 24 hours in seconds
    tags: ['daily-prompt'],
  }
);

// Optional: Function to force revalidate the cache
export async function revalidateDailyPrompt() {
  revalidateTag('daily-prompt');
}
