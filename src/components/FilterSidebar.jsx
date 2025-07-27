import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio' | 'range';
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  onFilterChange: (filterId: string, value: any) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFilterChange('price', newRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('Price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
        >
          <span>Price Range</span>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.has('Price') ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.has('Price') && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Filter Groups */}
      {filters.map((filterGroup) => (
        <div key={filterGroup.title} className="mb-6">
          <button
            onClick={() => toggleSection(filterGroup.title)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
          >
            <span>{filterGroup.title}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.has(filterGroup.title) ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.has(filterGroup.title) && (
            <div className="space-y-2">
              {filterGroup.options.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type={filterGroup.type === 'radio' ? 'radio' : 'checkbox'}
                    name={filterGroup.type === 'radio' ? filterGroup.title : undefined}
                    onChange={(e) => onFilterChange(option.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                  {option.count && (
                    <span className="text-xs text-gray-500">({option.count})</span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;