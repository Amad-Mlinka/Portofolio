'use client';
import React from 'react';
import { ExperienceItem as TimelineInterface } from '@/app/interfaces/experience/ExperienceItem';
import TimelineItem from './timelineItem';
import styles from './timeline.module.scss'

interface TimelineProps {
  timelineItems: TimelineInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ timelineItems }) => {

  //const [filteredTimelineItems, setTimelineItems] = useState([...timelineItems]);
  
  const tags = timelineItems
  .filter(exp => exp.techStack) 
  .flatMap(exp => exp.techStack); 

const uniqueTags = Array.from(new Set(tags));
  return (
    <div className={styles.timelineContainer}>
     <div className={styles.tagList}>
      {uniqueTags.map((tag,index)=>(
        <div className={`badge-outline badge-outline--accent1`} key={index}>{tag}</div>
      ))}
      </div>
      <div className={`${styles.line} space-y-8 relative p-4`}>
     
     <div className={styles.timeline}>
       {timelineItems.map((item, index) => (
         <TimelineItem 
           key={index} 
           {...item} 
         />
       ))}
     </div>
     
   </div>
    </div>
   
  );
};

export default Timeline;
