import { useState, useEffect } from 'react';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const PREFIX = 'video_chunk_';
const META_KEY = 'video_metadata';

interface VideoMetadata {
  timestamp: number;
  chunks: number;
  size: number;
  type: string;
}

const getChunkKey = (url: string, index: number) => `${PREFIX}${btoa(url)}_${index}`;
const getMetaKey = (url: string) => `${META_KEY}_${btoa(url)}`;

export const useVideoStorage = (videoUrl: string) => {
  const [videoBlob, setVideoBlob] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const metaKey = getMetaKey(videoUrl);
        const metadata = localStorage.getItem(metaKey);
        const now = Date.now();

        if (metadata) {
          const meta: VideoMetadata = JSON.parse(metadata);
          if (now - meta.timestamp < CACHE_DURATION) {
            // Video is cached and not expired, reconstruct from chunks
            const chunks: Blob[] = [];
            for (let i = 0; i < meta.chunks; i++) {
              const chunkData = localStorage.getItem(getChunkKey(videoUrl, i));
              if (chunkData) {
                const byteCharacters = atob(chunkData.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let j = 0; j < byteCharacters.length; j++) {
                  byteNumbers[j] = byteCharacters.charCodeAt(j);
                }
                const byteArray = new Uint8Array(byteNumbers);
                chunks.push(new Blob([byteArray], { type: meta.type }));
              }
            }

            if (chunks.length === meta.chunks) {
              const fullBlob = new Blob(chunks, { type: meta.type });
              setVideoBlob(URL.createObjectURL(fullBlob));
              setLoading(false);
              return;
            }
          }
        }

        // Fetch and store video in chunks
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const chunks = Math.ceil(blob.size / CHUNK_SIZE);

        // Store metadata
        const meta: VideoMetadata = {
          timestamp: now,
          chunks,
          size: blob.size,
          type: blob.type,
        };
        localStorage.setItem(metaKey, JSON.stringify(meta));

        // Store chunks
        for (let i = 0; i < chunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, blob.size);
          const chunk = blob.slice(start, end, blob.type);
          
          const reader = new FileReader();
          reader.onloadend = () => {
            try {
              localStorage.setItem(getChunkKey(videoUrl, i), reader.result as string);
            } catch (error) {
              console.error('Storage error:', error);
              // If storage is full, clear old chunks
              clearOldChunks();
              try {
                localStorage.setItem(getChunkKey(videoUrl, i), reader.result as string);
              } catch (retryError) {
                console.error('Storage retry failed:', retryError);
              }
            }
          };
          reader.readAsDataURL(chunk);
        }

        setVideoBlob(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Video loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();

    return () => {
      if (videoBlob) {
        URL.revokeObjectURL(videoBlob);
      }
    };
  }, [videoUrl]);

  return { videoBlob, loading };
};

function clearOldChunks() {
  const now = Date.now();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(META_KEY)) {
      const metadata = JSON.parse(localStorage.getItem(key) || '{}');
      if (now - metadata.timestamp >= CACHE_DURATION) {
        // Remove expired chunks
        const url = key.replace(META_KEY + '_', '');
        for (let j = 0; j < metadata.chunks; j++) {
          localStorage.removeItem(getChunkKey(atob(url), j));
        }
        localStorage.removeItem(key);
      }
    }
  }
}