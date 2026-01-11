import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/components/TimelineControl.module.css';

const TimelineControl = React.memo(({ minYear = -500000, maxYear = 2050, currentYear, onChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  // Format year for display logic
  const formatYear = (y) => {
    const absY = Math.abs(y);
    if (y < 0) return `${absY.toLocaleString()} BCE`;
    return `${absY} CE`;
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      let activeYear = currentYear;
      const step = (maxYear - minYear) / 200; // Complete in ~3-4 seconds loop? specific speed
      
      const animate = () => {
        activeYear += step;
        if (activeYear >= maxYear) {
            activeYear = maxYear;
            setIsPlaying(false);
            onChange(maxYear);
            return;
        }
        onChange(Math.floor(activeYear));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, minYear, maxYear, onChange]); // Removes currentYear dependency to avoid re-triggering constantly

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button 
            className={styles.playButton} 
            onClick={handlePlayToggle}
            title={isPlaying ? "Pause History" : "Play History"}
        >
            {isPlaying ? '⏸' : '▶'}
        </button>
        
        <div className={styles.sliderWrapper}>
            <input 
                type="range" 
                min={minYear} 
                max={maxYear} 
                value={currentYear} 
                onChange={(e) => {
                    setIsPlaying(false);
                    onChange(parseInt(e.target.value));
                }}
                className={styles.slider}
            />
        </div>
        
        <div className={styles.yearDisplay}>
            {formatYear(currentYear)}
        </div>
      </div>
    </div>
  );
});

TimelineControl.displayName = 'TimelineControl';

export default TimelineControl;
