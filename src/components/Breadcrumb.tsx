import { Link, useMatches } from '@tanstack/react-router';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  currentPage: string;
  parentPath?: string;
}

const Breadcrumb = ({ currentPage, parentPath }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
      {parentPath && (
        <>
          <Link to={parentPath} className="flex items-center hover:text-gray-900">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Link>
          <ChevronRight size={16} />
        </>
      )}
      <span>{currentPage}</span>
    </nav>
  );
};

export default Breadcrumb;