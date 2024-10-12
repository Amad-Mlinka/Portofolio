import Hero from './components/hero/hero';

export default function Home() {
  return (
    <div>
      <div id="about">
        <Hero />
      </div>
      <section id="skills" style={{ height: '100vh'}}>
        {/* Projects Section Content */}
        <h2>Skills Section</h2>
      </section>
      <section id="projects" style={{ height: '100vh'}}>
        {/* Projects Section Content */}
        <h2>Projects Section</h2>
      </section>
      <section id="contact" style={{ height: '100vh' }}>
        {/* Contact Section Content */}
        <h2>Contact Section</h2>
      </section>
    </div>
  );
}
