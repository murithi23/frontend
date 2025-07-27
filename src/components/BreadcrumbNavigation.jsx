import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/" 
        className="hover:text-blue-600 transition-colors duration-200 flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          {item.path && index < items.length - 1 ? (
            <Link 
              href={item.path} 
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-gray-800 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;