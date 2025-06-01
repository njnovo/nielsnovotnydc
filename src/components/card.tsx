import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`relative aspect-video overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`flex items-baseline p-4 text-lg sm:text-base md:text-lg lg:text-base xl:text-sm ${className}`}>
      {children}
    </div>
  );
}

function Card({ children, className = "" }: CardProps) {
  return (
    <article className={`group relative cursor-pointer overflow-hidden border bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`} style={{borderColor: 'var(--color-tertiary)'}}>
      {children}
    </article>
  );
}

Card.Header = CardHeader;
Card.Content = CardContent;

export default Card; 