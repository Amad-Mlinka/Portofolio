import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Experience Types
  const experienceTypes = ['Education', 'Project', 'Internship', 'Employment'];
  
  const experienceTypeRecords = await Promise.all(
    experienceTypes.map(type => 
      prisma.experienceType.upsert({
        where: { name: type },
        update: {},
        create: { name: type },
      })
    )
  );

  // Get IDs for each experience type
  const experienceTypeIds = Object.fromEntries(
    experienceTypeRecords.map(record => [record.name, record.id])
  );

  // Seed Experiences from CV
  const experiences = [
    {
      title: 'CRM Developer',
      company: 'Advista d.o.o',
      location: 'Sarajevo, Bosnia and Herzegovina',
      duration: '02/2024 – 09/2024',
      description: `Spearheaded the development of Miniweb, a web application enabling users to create personalized mini websites, similar to Shopify's landing page builder.
      Engineered a comprehensive CRM solution for a digital marketing startup, enhancing customer interaction management and lead tracking.
      Developed custom e-commerce integrations to streamline marketing strategies and improve customer engagement.
      Maintained clear and concise documentation, facilitating ease of understanding and knowledge transfer among team members.
      Utilized PHP and Vanilla JS/jQuery to create a responsive and efficient user interface.
      Communicated complex technical concepts clearly to non-technical stakeholders, ensuring alignment and understanding across teams.`,
      techStack: ['PHP', 'Vanilla JS', 'jQuery'],
      typeId: experienceTypeIds['Employment'],
    },
    {
      title: 'Full Stack Engineer',
      company: 'Zentury Media',
      location: 'Sarajevo, Bosnia and Herzegovina',
      duration: '09/2023 – 02/2024',
      description: `Developed and integrated modules for wallet history, calendar management, and content ordering into Zentury's proprietary CRM, utilizing C#, Angular, and PostgreSQL.
      Collaborated with cross-functional teams to ensure seamless integration of new features, improving overall system performance.
      Maintained consistent coding standards and documentation, facilitating efficient knowledge transfer and team collaboration.
      Utilized agile methodologies to manage project timelines, consistently delivering modules on schedule and exceeding client expectations.`,
      techStack: ['C#', 'Angular', 'PostgreSQL'],
      typeId: experienceTypeIds['Employment'],
    },
    {
      title: 'Software Engineer',
      company: 'AgentLocator',
      location: 'Sarajevo, Bosnia and Herzegovina',
      duration: '11/2021 – 08/2023',
      description: `Developed and maintained advanced real estate solutions, CRM, and CMS systems, extensively utilized in the USA and Canadian markets.
      Spearheaded the implementation of a 10-year archive feature, significantly improving data management capabilities and supporting long-term customer relationship strategies.
      Utilized C# .NET for robust backend development, ensuring high performance and reliability of systems.
      Collaborated closely with deployment teams, assisting with deployments on each successful iteration, ensuring smooth transitions and minimal downtime.`,
      techStack: ['C#', '.NET', 'SQLServer'],
      typeId: experienceTypeIds['Employment'],
    },
    {
      title: 'Software Engineer',
      company: 'Enigma Development',
      location: 'Sarajevo, Bosnia and Herzegovina',
      duration: '12/2020 – 10/2021',
      description: `Crafted responsive and user-friendly websites using HTML, CSS, and JS/jQuery, with PHP—CodeIgnitor) and Node.js(Express) backends.
      Played a key role in developing a German real estate site, implementing e-commerce functionalities and property management features.`,
      techStack: ['PHP', 'CodeIgniter', 'Node.js', 'Express'],
      typeId: experienceTypeIds['Employment'],
    },
    {
      title: 'Software Engineer - Bachelor',
      company: 'University of Zenica',
      location: 'Zenica, Bosnia and Herzegovina',
      duration: '10/2018 – 05/2021',
      description: 'Bachelor of Software Engineering',
      techStack: [],
      typeId: experienceTypeIds['Education'],
    },
  ];

  await Promise.all(
    experiences.map(exp => 
      prisma.experience.create({
        data: exp,
      })
    )
  );
}

main()
  .then(() => console.log('Seeding complete!'))
  .catch((e) => console.error('Seeding failed:', e))
  .finally(async () => await prisma.$disconnect());
