/**
 * Projects Data Module
 * Contains all project information and data structures
 */

export const projectsData = [
  {
    id: 5,
    title: "FIAP Startup Challenge: HealthHub",
    shortTitle: "FIAP HealthHub",
    description: "Mobile-first platform for clinics and patients. 2nd place at FIAP Startup Challenge 2023. Focused on long-term care management.",
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
    }
  },
  {
    id: 6,
    title: "Nohs Somos: LGBTQ Community Safety App",
    shortTitle: "Nohs Somos",
    description: "Map-based app for LGBTQ community safety. Find and review safe spaces. Built for Nohs Somos, merged with TODXS.",
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
  {
    id: 7,
    title: "Creators Fit (formerly Privi): Monetizing Content for Brazilian Influencers",
    shortTitle: "Creators Fit (Privi)",
    description: "Platform for Brazilian creators to monetize exclusive content. Supports subscriptions, pay-per-view, and media uploads.",
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
    id: 8,
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
