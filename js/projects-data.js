/**
 * Projects Data Module
 * Contains all project information and data structures
 */

export const projectsData = [
  {
    id: 1,
    title: "Creators Fit (formerly Privi): Monetizing Content for Brazilian Influencers",
    shortTitle: "Creators Fit (Privi)",
    description: "Platform for Brazilian creators to monetize exclusive content. Supports subscriptions, pay-per-view, and media uploads.",
    caseStudyUrl: "./cases/creators-fit.html",
    logo: "./assets/creators-fit/logo.png",
    logoAlt: "Privi Logo",
    cover: "./assets/creators-fit/cover.png",
    coverAlt: "Creators Fit (Privi)",
    tech: ['React', 'Django', 'PostgreSQL', 'Stripe', 'AWS S3'],
    designs: [
      { caption: 'Creator persona development and user journey mapping', src: './assets/creators-fit/creatorspersona.png' },
      { caption: 'Custom profile builder for content creators', src: './assets/creators-fit/customprofile.png' },
      { caption: 'Brand inspiration and visual identity development', src: './assets/creators-fit/brandinspiration.png' },
      { caption: 'Private feed interface for exclusive content', src: './assets/creators-fit/privifeed.png' },
      { caption: 'Instagram integration for cross-platform promotion', src: './assets/creators-fit/priviinstagram.png' }
    ],
    caseStudy: {
      context: { team: 'Team of 6', timeline: '8 months', role: 'Senior Product Designer & Frontend Lead' },
      problem: 'Brazilian content creators lacked accessible platforms to monetize their work directly. Existing international platforms had high fees, complex interfaces, and limited local payment options.',
      process: 'We researched the Brazilian creator economy, interviewed 50+ content creators, designed a localized monetization platform with multiple revenue streams, and built integrations with popular Brazilian payment methods.',
      impact: 'Onboarded 500+ creators in the first 6 months. Processed over R$1M in creator earnings. Platform was later rebranded to Creators Fit and expanded to include fitness and lifestyle creators.'
    }
  },
  {
    id: 2,
    title: "FIAP Startup Challenge: HealthHub",
    shortTitle: "FIAP HealthHub",
    description: "Mobile-first platform for clinics and patients. 2nd place at FIAP Startup Challenge 2023. Focused on long-term care management.",
    caseStudyUrl: "./cases/fiap-healthhub.html",
    logo: "./assets/fiap/logo.png",
    logoAlt: "FIAP Logo",
    cover: "./assets/fiap/cover.png",
    coverAlt: "FIAP HealthHub",
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    designs: [
      { caption: 'Patient management interface with appointment scheduling', src: './assets/fiap/patientmenagement.png' },
      { caption: 'Doctor persona and workflow optimization', src: './assets/fiap/doctorpersona.png' },
      { caption: 'Patient persona research and insights', src: './assets/fiap/patientpersona.png' },
      { caption: 'Health information dashboard design', src: './assets/fiap/healthinformation.png' },
      { caption: 'Appointment history and tracking system', src: './assets/fiap/appointmenthistory.png' }
    ],
    caseStudy: {
      context: { team: 'Team of 4', timeline: '3 months', role: 'Lead Product Designer & Frontend Developer' },
      problem: 'Healthcare clinics struggled with patient management and long-term care coordination. Existing solutions were either too complex or lacked mobile optimization for both patients and healthcare providers.',
      process: 'We conducted interviews with healthcare professionals and patients, analyzed existing workflows, created user personas, and developed a mobile-first platform that streamlined clinic operations while improving patient engagement.',
      impact: 'Achieved 2nd place at FIAP Startup Challenge 2023. The platform reduced appointment scheduling time by 60% and improved patient engagement scores by 40% during beta testing with partner clinics.'
    },
    detailedCaseStudy: {
      subtitle: "A mobile-first ecosystem connecting long-term patients with clinics, reducing appointment absences by 40%.",
      caseNumber: "002",
      meta: {
        role: "Product Designer",
        timeline: "3 Weeks (Sprint)",
        team: "2 Devs, 1 PM, 1 Designer",
        recognition: "2nd Place Startup Challenge"
      },
      heroImage: "./assets/fiap/cover.png",
      sections: [
        {
          id: "context",
          number: "01",
          title: "The Context",
          headline: "The Disconnection in Healthcare",
          content: `
            <p>In Brazil's public health system (SUS), scheduling appointments for long-term treatments is a bureaucratic nightmare. Patients often miss critical dates due to lack of reminders, while clinics suffer from high no-show rates.</p>
            <p class="mt-4">Our challenge during the FIAP Startup Challenge was to create a digital solution that bridged this gap within 3 weeks.</p>
          `,
          stats: [
            { value: "40%", label: "NO-SHOW RATE", description: "Clinics report high absenteeism due to forgotten dates." },
            { value: "72h", label: "WAIT TIME", description: "Average time to reschedule a missed appointment." }
          ]
        },
        {
          id: "discovery",
          number: "02",
          title: "Discovery",
          headline: "Mapping the Patient Journey",
          content: `
            <p>We interviewed 10 patients and 3 clinic administrators. The core insight was surprising: it wasn't that patients didn't <em>want</em> to go, it was that the physical appointment cards were often lost or damaged.</p>
          `,
          images: [
            { src: "./assets/fiap/patientpersona.png", caption: "FIG 1. THE PAIN POINTS IN THE CURRENT ANALOG JOURNEY" }
          ]
        },
        {
          id: "solution",
          number: "03",
          title: "The Solution",
          headline: "A Unified Digital Hub",
          content: `
            <p class="big-text">We designed HealthHub: a centralized app that digitizes the "Caderneta de Vacinação" (Vaccination Card) and automates reminders via WhatsApp integration.</p>
          `,
          features: [
            {
              title: "Automated Reminders",
              description: "Instead of relying on push notifications (which users often disable), we integrated with WhatsApp API to send reminders 24h before the appointment.",
              image: "./assets/fiap/appointmenthistory.png"
            },
            {
              title: "Digital History",
              description: "A permanent, cloud-based record of all procedures, accessible via QR Code for doctors, ensuring data portability.",
              image: "./assets/fiap/healthinformation.png"
            }
          ]
        },
        {
          id: "impact",
          number: "04",
          title: "The Impact",
          headline: "Results & Takeaways",
          content: `
            <p>The prototype was pitched to a panel of investors and health professionals, securing <strong>2nd place</strong> in the Startup Challenge. The feedback highlighted the scalability of the WhatsApp integration as a key differentiator.</p>
            <div class="mt-12 p-8 bg-gray-900 border-l-4 border-accent-color">
              <p class="font-mono text-accent-color text-sm mb-4">LESSON LEARNED</p>
              <p class="text-xl italic text-white">"Accessibility isn't just about contrast ratios; it's about meeting users where they already are. WhatsApp was a better channel than a standalone app notification."</p>
            </div>
          `
        }
      ],
      nextProject: {
        id: 3,
        title: "Nohs Somos",
        url: "#project-3"
      }
    }
  },
  {
    id: 3,
    title: "Nohs Somos: LGBTQ Community Safety App",
    shortTitle: "Nohs Somos",
    description: "Map-based app for LGBTQ community safety. Find and review safe spaces. Built for Nohs Somos, merged with TODXS.",
    caseStudyUrl: "./cases/nohs-somos.html",
    logo: "./assets/nohs-somos/logo.png",
    logoAlt: "Nohs Somos Logo",
    cover: "./assets/nohs-somos/cover.png",
    coverAlt: "TODXS & Nohs Somos",
    tech: ['Flutter', 'Firebase', 'Google Maps API', 'Node.js'],
    designs: [
      { caption: 'Neighborhood safety map with community reviews', src: './assets/nohs-somos/neighbourhoodmap.png' },
      { caption: 'In-app registration and onboarding flow', src: './assets/nohs-somos/inappregistration.png' },
      { caption: 'Community comments and review system', src: './assets/nohs-somos/comments.png' },
      { caption: 'Forbes feature article coverage', src: './assets/nohs-somos/forbes.png' }
    ],
    caseStudy: {
      context: { team: 'Team of 3', timeline: '4 months', role: 'UI/UX Designer & Frontend Developer' },
      problem: 'LGBTQ individuals lacked a reliable way to identify safe spaces and businesses that welcome their community. Existing solutions were limited and didn\'t provide real-time community feedback.',
      process: 'We partnered with LGBTQ advocacy groups to understand safety concerns, developed a map-based interface for location discovery, implemented a community review system, and ensured user privacy and security were prioritized.',
      impact: 'Successfully launched and later merged with TODXS, expanding reach across Brazil. Featured in Forbes for innovative approach to community safety. Helped over 10,000 users find safe spaces in their neighborhoods.'
    }
  },

  // iLog - HIDDEN (to be populated later)
  /*
  {
    id: 4,
    title: "iLog",
    shortTitle: "iLog",
    description: "Logistics platform for fleet operations. Automates route planning and real-time tracking. Used by major LATAM companies.",
    logo: "iL",
    logoAlt: null,
    cover: "https://placehold.co/600x400/1e1e1e/d3d3d3?text=iLog+Dashboard",
    coverAlt: "iLog Dashboard Preview",
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API', 'Real-time WebSockets'],
    designs: [
      { caption: 'Fleet management dashboard with real-time tracking', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Fleet+Dashboard' },
      { caption: 'Route optimization algorithm visualization', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Route+Optimization' },
      { caption: 'Driver mobile app interface design', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Driver+App' },
      { caption: 'Analytics and reporting system', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Analytics+Dashboard' }
    ],
    caseStudy: {
      context: { team: 'Team of 8', timeline: '12 months', role: 'Frontend Lead & UX Consultant' },
      problem: 'LATAM logistics companies relied on manual processes for fleet management, resulting in inefficient routes, high fuel costs, and poor visibility into operations.',
      process: 'We analyzed existing logistics workflows, designed an automated route planning system, developed real-time tracking capabilities, and created intuitive dashboards for fleet managers and drivers.',
      impact: 'Deployed across 15+ major LATAM companies. Reduced average delivery times by 25% and fuel costs by 30%. Platform now manages over 5,000 vehicles across the region.'
    }
  }
  */
];

// Helper functions for data access
export function getProjectById(id) {
  return projectsData.find(project => project.id === parseInt(id));
}

export function getAllProjects() {
  return projectsData;
}

export function getProjectsCount() {
  return projectsData.length;
}

// ---------------------------------------------------------------------------
// Normalization: ensure all projects have a FIAP-style detailedCaseStudy
// so every case page uses the same template + styling.
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildDetailedCaseStudyFromCaseStudy(project) {
  const context = project?.caseStudy?.context || {};
  const subtitle = project?.description || '';

  return {
    subtitle,
    caseNumber: String(project.id).padStart(3, '0'),
    meta: {
      role: context.role || 'Product Designer',
      timeline: context.timeline || '—',
      team: context.team || '—',
      recognition: ''
    },
    heroImage: project.cover,
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'The Context',
        headline: 'The Context',
        content: `<p>${escapeHtml(project?.caseStudy?.problem || project?.description || '')}</p>`
      },
      {
        id: 'discovery',
        number: '02',
        title: 'Discovery',
        headline: 'Discovery & Research',
        content: `<p>${escapeHtml(project?.caseStudy?.process || '')}</p>`,
        images: Array.isArray(project.designs) && project.designs[0]
          ? [{ src: project.designs[0].src, caption: project.designs[0].caption || 'FIG. Design artifact' }]
          : []
      },
      {
        id: 'solution',
        number: '03',
        title: 'The Solution',
        headline: 'The Solution',
        content: `<p class="big-text">${escapeHtml(project.shortTitle || project.title)}</p>`,
        features: Array.isArray(project.designs)
          ? project.designs.slice(1, 3).map((d, index) => ({
              title: index === 0 ? 'Key Screen' : 'Key Flow',
              description: d.caption || 'Design highlight',
              image: d.src
            }))
          : []
      },
      {
        id: 'impact',
        number: '04',
        title: 'The Impact',
        headline: 'Results & Takeaways',
        content: `<p>${escapeHtml(project?.caseStudy?.impact || '')}</p>`
      }
    ],
    nextProject: null
  };
}

(function normalizeProjectsData() {
  // Determine nextProject references in ID order
  const sorted = [...projectsData].sort((a, b) => a.id - b.id);

  sorted.forEach((p, idx) => {
    if (!p.detailedCaseStudy) {
      p.detailedCaseStudy = buildDetailedCaseStudyFromCaseStudy(p);
    }

    const next = sorted[idx + 1] || sorted[0];
    p.detailedCaseStudy.nextProject = {
      id: next.id,
      title: next.shortTitle || next.title,
      url: `#project-${next.id}`
    };
  });
})();
