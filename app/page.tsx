import Hero from './components/hero';
import Timeline from './components/timeline';
import timelineData from '@/app/CV_DATA.json'


export default function Home() {
  return (
    <div>
      <div id="about" className='min-h-screen'>
        <Hero />
        <Timeline timelineItems={timelineData} />
      </div>
      <section id="skills" className='min-h-screen'>
        <h2>Skills Section</h2>
      </section>
      <section id="projects" className='min-h-screen'>
        <h2>Projects Section</h2>
      </section>
      <section id="contact" className='min-h-screen'>
        <h2>Contact Section</h2>
      </section>
    </div>
  );
}
