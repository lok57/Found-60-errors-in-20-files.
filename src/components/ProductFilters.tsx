import { useState } from 'react';
import { Filter, X, SlidersHorizontal, Check } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

interface ProductFiltersProps {
  filters: FilterOption[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function ProductFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  className = ''
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilters = Object.values(selectedFilters).some(values => values.length > 0);

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  );

  return (
    <>
      {/* Filter Icon Button */}
      <div className={`${className} absolute left-4 top-4 z-10`}>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <SlidersHorizontal className="w-5 h-5 text-white transition-transform group-hover:rotate-180" />
          <span className="text-white font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex items-center justify-center bg-accent-600 text-white text-xs min-w-[20px] h-5 px-1.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Drawer */}
      <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute inset-y-0 left-0 w-full max-w-sm bg-white/10 backdrop-blur-xl transform transition-transform duration-500 ease-out border-r border-white/20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col text-white">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center">
                  <Filter className="w-6 h-6 mr-2 text-accent-400" />
                  Filters
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    onClearFilters();
                    setIsOpen(false);
                  }}
                  className="mt-4 w-full px-4 py-2 text-sm text-accent-400 border border-accent-400 rounded-lg hover:bg-accent-400/10 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4 space-y-8">
                {filters.map((filter) => (
                  <div key={filter.id} className="border-b border-white/10 pb-6 last:border-0">
                    <h4 className="font-medium mb-4 text-lg">{filter.label}</h4>
                    <div className="space-y-3">
                      {filter.options.map((option) => {
                        const isSelected = selectedFilters[filter.id]?.includes(option) || false;
                        return (
                          <label 
                            key={option} 
                            className="flex items-center group cursor-pointer"
                          >
                            <div className={`w-5 h-5 rounded border ${
                              isSelected 
                                ? 'bg-accent-600 border-accent-600' 
                                : 'border-white/30 group-hover:border-white/50'
                            } flex items-center justify-center transition-colors mr-3`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={isSelected}
                              onChange={(e) => {
                                const currentValues = selectedFilters[filter.id] || [];
                                const newValues = e.target.checked
                                  ? [...currentValues, option]
                                  : currentValues.filter(value => value !== option);
                                onFilterChange(filter.id, newValues);
                              }}
                            />
                            <span className={`text-sm ${
                              isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                            } transition-colors`}>
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/20 p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-accent-600 text-white py-3 px-4 rounded-lg hover:bg-accent-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}