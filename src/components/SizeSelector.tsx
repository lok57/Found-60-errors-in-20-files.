interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Size
      </label>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`py-2 text-sm font-medium rounded-md ${
              selectedSize === size
                ? 'bg-black text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
