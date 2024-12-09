import React from 'react';
import styles from './timelineItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faComputer, faGraduationCap, faCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TimelineItem as TimelineInterface } from '@/app/interfaces/timeline/TimelineItem';

type TimelineItemType = 'employment' | 'project' | 'education' | 'default';

const typeStyles: Record<TimelineItemType, { class: string; icon: IconDefinition }> = {
  employment: {
    class: styles.employment,
    icon: faBriefcase
  },
  project: {
    class: styles.project,
    icon: faComputer
  },
  education: {
    class: styles.education,
    icon: faGraduationCap
  },
  default: {
    class: styles.default,
    icon: faCircle
  },
};

const TimelineItem: React.FC<TimelineInterface> = ({
  title,
  duration,
  description,
  type = 'default',
  techStack,
  isActive = false
}) => {
  const { class: typeClass, icon: Icon } = typeStyles[type as TimelineItemType] || typeStyles['default'];

  return (
    <div
      className={`${styles.timelineItem} ${typeClass} ${isActive ? styles.isActive : ''} relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
    >
      <div
        className={`${styles.icon} flex items-center justify-center w-10 h-10 rounded-full border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}
      >
        <FontAwesomeIcon icon={Icon} className="w-5 h-5" />
      </div>
      <div className={`${styles.content} w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 shadow`}>
        <div className="flex items-center justify-between space-x-2 mb-1">
          <div className={`font-bold ${styles.title}`}>{title}</div>
          <time className={`font-caveat font-medium ${styles.duration}`}>
            {duration}
          </time>
        </div>
        <div className={`${styles.description}`}>{description}</div>
        <div className={`${styles.tags}`}>

          {techStack?.map((tech, index) => (
            <div className={`badge-outline ${type == "education" ? "badge-outline--accent3" : type == "projects" ? "badge-outline--accent2" : "badge-outline--accent1"}`} key={index}>{tech}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
