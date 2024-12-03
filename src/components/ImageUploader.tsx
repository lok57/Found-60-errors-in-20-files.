import { useState, useRef } from 'react';
import { X, Image as ImageIcon, Film } from 'lucide-react';
import toast from 'react-hot-toast';
import { MediaFile } from '../types';

export interface ImageUploaderProps {
  currentMedia?: string[];
  onMediaChange: (urls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({
  currentMedia = [],
  onMediaChange,
  maxFiles = 5,
}: ImageUploaderProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Check if adding new files would exceed the limit
    if (mediaFiles.length + files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files`);
      return;
    }

    setIsUploading(true);

    try {
      const newMediaFiles = await Promise.all(
        files.map(async (file) => {
          if (
            !file.type.startsWith('image/') &&
            !file.type.startsWith('video/')
          ) {
            throw new Error(
              'Invalid file type. Please upload images or videos only.'
            );
          }

          // Create preview URL
          const preview = URL.createObjectURL(file);

          return {
            id: crypto.randomUUID(),
            type: file.type.startsWith('image/') ? 'image' : 'video',
            file,
            preview,
          } as MediaFile;
        })
      );

      setMediaFiles((current) => [...current, ...newMediaFiles]);
      const mediaUrls = newMediaFiles.map((media) => media.preview);
      onMediaChange([...currentMedia, ...mediaUrls]);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to process files'
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeMedia = (id: string) => {
    setMediaFiles((current) => {
      const updatedFiles = current.filter((media) => media.id !== id);
      const updatedUrls = updatedFiles.map((media) => media.preview);
      onMediaChange(updatedUrls);
      return updatedFiles;
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Media ({mediaFiles.length}/{maxFiles})
        </label>

        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {mediaFiles.map((media) => (
              <div
                key={media.id}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                {media.type === 'image' ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeMedia(media.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {mediaFiles.length < maxFiles && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
              id="media-upload"
              multiple
            />
            <label
              htmlFor="media-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="flex space-x-2">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <Film className="w-8 h-8 text-gray-400" />
              </div>
              <span className="text-sm text-gray-600">
                {isUploading
                  ? 'Processing...'
                  : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-gray-500">
                Images (PNG, JPG, GIF) or Videos (MP4, WebM)
              </span>
            </label>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}