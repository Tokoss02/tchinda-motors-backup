'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  onActionClick: () => void;
  actionLabel?: React.ReactNode; 
  actionClassName?: string;
}

export default function PageHeader({
  
  title,
  onActionClick,
  actionLabel,
  actionClassName = 'btn btn-primary ',
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 ">
      <h1 className="text-2xl font-bold">{title}</h1>
      {actionLabel && (
        <button className={actionClassName} onClick={onActionClick}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
