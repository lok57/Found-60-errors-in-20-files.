import { useState, useEffect } from 'react';

const VIDEO_STORAGE_KEY = 'background_video_data';
const VIDEO_TIMESTAMP_KEY = 'background_video_timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const useVideoStorage = (videoUrl: string) => {
  const [videoBlob, setVideoBlob] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        // Check if video exists in localStorage and is not expired
        const storedTimestamp = localStorage.getItem(VIDEO_TIMESTAMP_KEY);
        const storedVideo = localStorage.getItem(VIDEO_STORAGE_KEY);
        const now = Date.now();

        if (
          storedVideo &&
          storedTimestamp &&
          now - parseInt(storedTimestamp) < CACHE_DURATION
        ) {
          setVideoBlob(storedVideo);
          setLoading(false);
          return;
        }

        // Fetch and store video if not in cache or expired
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result as string;
          try {
            localStorage.setItem(VIDEO_STORAGE_KEY, base64data);
            localStorage.setItem(VIDEO_TIMESTAMP_KEY, now.toString());
            setVideoBlob(base64data);
          } catch (error) {
            console.error('Storage error:', error);
            // If localStorage is full, clear it and try again
            localStorage.clear();
            try {
              localStorage.setItem(VIDEO_STORAGE_KEY, base64data);
              localStorage.setItem(VIDEO_TIMESTAMP_KEY, now.toString());
              setVideoBlob(base64data);
            } catch (retryError) {
              console.error('Storage retry failed:', retryError);
            }
          }
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Video loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoUrl]);

  return { videoBlob, loading };
};