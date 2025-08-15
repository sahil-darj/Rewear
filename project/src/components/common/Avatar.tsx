import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User Avatar', size = 36, className }) => (
  <img
    src={src || `https://ui-avatars.com/api/?name=User&background=E0F2F1&color=00695C&size=${size * 2}`}
    alt={alt}
    width={size}
    height={size}
    className={`rounded-full object-cover border border-emerald-200 ${className || ''}`}
    aria-label={alt}
  />
);
