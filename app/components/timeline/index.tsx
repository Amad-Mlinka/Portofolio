'use client';
import React, {useState } from 'react';
import { ExperienceItem as TimelineInterface } from '@/app/interfaces/experience/ExperienceItem';
import TimelineItem from './timelineItem';
import styles from './timeline.module.scss'

interface TimelineProps {
  timelineItems: TimelineInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ timelineItems }) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  
  // Extract unique tags from timeline items
  const tags = timelineItems
    .filter(exp => exp.techStack) 
    .flatMap(exp => exp.techStack); 

  const uniqueTags = Array.from(new Set(tags));

  // ** Toggle Tag Selection **
  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag) // Remove tag if already selected
        : [...prevTags, tag] // Add tag if not selected
    );
  };

  // ** Filter Timeline Items Based on Active Tags **
  const filteredItems = activeTags.length > 0 
    ? timelineItems.filter(item => 
        activeTags.every(tag => item.techStack?.includes(tag)) // Item must contain all active tags
      ) 
    : timelineItems;

  // ** Clear All Tag Filters **
  const clearFilters = () => setActiveTags([]);

  return (
    <div className={styles.timelineContainer}>
      {/* Tag Filter Buttons */}
      <div className={styles.tagList}>
        {uniqueTags.map((tag, index) => (
          <button 
            key={index} 
            onClick={() => toggleTag(tag)} 
            className={`badge-outline badge-outline--accent1 ${activeTags.includes(tag) ? styles.activeTag : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Clear Filter Button */}
      {activeTags.length > 0 && (
        <button 
          onClick={clearFilters} 
          className={styles.clearButton}
        >
          Clear Filters ({activeTags.join(', ')})
        </button>
      )}

      {/* Filtered Timeline */}
      <div className={`${styles.line} space-y-8 relative p-4`}>
        <div className={styles.timeline}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <TimelineItem 
                key={index} 
                {...item} 
              />
            ))
          ) : (
            <p className={styles.noResults}>No results match the selected tags.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
