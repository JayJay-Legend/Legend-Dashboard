import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Pagination;