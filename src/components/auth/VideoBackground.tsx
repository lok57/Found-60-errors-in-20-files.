import React, { useEffect, useRef } from 'react';
import { useVideoStorage } from '../../utils/videoChunkStorage';

interface VideoBackgroundProps {
  videoUrl: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
  const { videoBlob, loading } = useVideoStorage(videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoBlob]);

  return (
    <div className="absolute inset-0 -z-10">
      {loading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            {videoBlob && <source src={videoBlob} type="video/mp4" />}
          </video>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-purple-900/40 backdrop-blur-[1px]"
            style={{
              backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)`
            }}
          />
        </>
      )}
    </div>
  );
};