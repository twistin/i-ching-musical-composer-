
import React from 'react';
import { LineType } from '../types';

interface LineDisplayProps {
  type: LineType;
  isSmall?: boolean;
}

const LineDisplay: React.FC<LineDisplayProps> = ({ type, isSmall = false }) => {
  const height = isSmall ? 'h-1.5' : 'h-2.5';
  const gap = isSmall ? 'gap-1' : 'gap-2';
  const segmentWidth = isSmall ? 'w-8' : 'w-12';
  const barColor = 'bg-yellow-400';

  if (type === LineType.Solid) {
    return (
      <div className={`w-full flex justify-center items-center my-1 ${height}`}>
        <div className={`${segmentWidth} ${height} ${barColor} rounded-sm`}></div>
      </div>
    );
  } else { // Broken
    return (
      <div className={`w-full flex justify-center items-center my-1 ${height} ${gap}`}>
        <div className={`${isSmall ? 'w-3' : 'w-5'} ${height} ${barColor} rounded-sm`}></div>
        <div className={`${isSmall ? 'w-3' : 'w-5'} ${height} ${barColor} rounded-sm`}></div>
      </div>
    );
  }
};

export default LineDisplay;
    