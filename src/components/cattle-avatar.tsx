import React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

interface CattleAvatarProps {
  breed?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagBadge?: boolean;
}

export function CattleAvatar({
  breed = 'Limousin',
  id = '',
  size = 'md',
  className,
  showTagBadge = true,
}: CattleAvatarProps) {
  // Breed color profiles
  let bgGradient = 'from-[#F2EDE4] to-[#E5DDD0]';
  let hornColor = '#4A4135';
  let muzzleColor = '#C4B29C';
  let bodyColor = '#8A5237'; // Limousin reddish-brown

  if (breed.toLowerCase().includes('simental')) {
    bgGradient = 'from-[#FDF2E9] to-[#F5DECD]';
    bodyColor = '#B8652A'; // Golden-red/white mix
    muzzleColor = '#EAD6C6';
  } else if (breed.toLowerCase().includes('brahman')) {
    bgGradient = 'from-[#EEF1EF] to-[#DDE3DF]';
    bodyColor = '#6A7872'; // Greyish hump profile
    muzzleColor = '#434E4A';
  } else if (breed.toLowerCase().includes('po') || breed.toLowerCase().includes('ongole')) {
    bgGradient = 'from-[#F5F7F6] to-[#E3E8E5]';
    bodyColor = '#838F89'; // White/Grey with prominent dewlap
    muzzleColor = '#3A423E';
  }

  const sizeClasses = {
    sm: 'w-9 h-9 rounded-lg text-[10px]',
    md: 'w-11 h-11 rounded-xl text-xs',
    lg: 'w-16 h-16 rounded-2xl text-sm',
    xl: 'w-24 h-24 rounded-3xl text-base',
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 border border-[#E5EAE6] bg-gradient-to-b overflow-hidden shadow-xs select-none",
        bgGradient,
        sizeClasses[size],
        className
      )}
    >
      {/* Clean Stylized Cattle SVG Icon */}
      <svg
        className="w-3/4 h-3/4 text-[#26332C]"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horns */}
        <path
          d="M12 18C10 12 7 11 4 13C6 17 11 19 14 20"
          stroke={hornColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 18C38 12 41 11 44 13C42 17 37 19 34 20"
          stroke={hornColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Head */}
        <path
          d="M14 19C14 16 18 14 24 14C30 14 34 16 34 19C34 25 33 30 31 35C29 39 27 40 24 40C21 40 19 39 17 35C15 30 14 25 14 19Z"
          fill={bodyColor}
        />
        {/* Muzzle */}
        <ellipse cx="24" cy="33" rx="7.5" ry="5.5" fill={muzzleColor} />
        {/* Nostrils */}
        <circle cx="21" cy="33.5" r="1.2" fill="#2E2319" />
        <circle cx="27" cy="33.5" r="1.2" fill="#2E2319" />
        {/* Eyes */}
        <circle cx="18" cy="22" r="1.5" fill="#1C1814" />
        <circle cx="30" cy="22" r="1.5" fill="#1C1814" />
        {/* Ears */}
        <path
          d="M14 21C9 21 6 24 7 26C9 27 12 25 14 23"
          fill={bodyColor}
          stroke="#422E1F"
          strokeWidth="0.8"
        />
        <path
          d="M34 21C39 21 42 24 41 26C39 27 36 25 34 23"
          fill={bodyColor}
          stroke="#422E1F"
          strokeWidth="0.8"
        />
        {/* RFID Ear Tag Indicator on Left Ear */}
        <rect
          x="7.5"
          y="24"
          width="4"
          height="5.5"
          rx="1"
          fill="#1F6B4F"
          stroke="#FFFFFF"
          strokeWidth="0.75"
        />
      </svg>

      {/* RFID Tag Badge Mini Indicator */}
      {showTagBadge && size !== 'sm' && (
        <span
          title="Tersedia RFID Ear Tag"
          className="absolute bottom-1 right-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#1F6B4F] text-white shadow-xs"
        >
          <Tag className="w-2 h-2" />
        </span>
      )}
    </div>
  );
}
