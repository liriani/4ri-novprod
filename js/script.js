// ============================================================================
// CUSTOM CURSOR - Runs immediately
// ============================================================================
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');

// Initialize cursor position
let cursorMouseX = 0;
let cursorMouseY = 0;

// Only run if cursors exist (i.e., not on mobile)
if (cursorOuter && cursorInner) {
    document.addEventListener('mousemove', (e) => {
        cursorMouseX = e.clientX;
        cursorMouseY = e.clientY;

        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            cursorOuter.style.transform = `translate(${cursorMouseX - cursorOuter.clientWidth / 2}px, ${cursorMouseY - cursorOuter.clientHeight / 2}px)`;
            cursorInner.style.transform = `translate(${cursorMouseX - cursorInner.clientWidth / 2}px, ${cursorMouseY - cursorInner.clientHeight / 2}px)`;
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .page-link, .theme-toggle-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter.classList.add('link-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOuter.classList.remove('link-hover');
            });
        });
    });
}

// ============================================================================
// MAIN APPLICATION - Wait for DOM to be ready
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const projects = {
    '1': {
    title: 'Creators Fit (formerly Privi)',
    description: 'A comprehensive case study on a mobile banking app redesign, focusing on user-centered design and accessibility improvements.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Project+1',
    tech: ['Figma', 'User Research', 'Usability Testing'],
    designs: [
{ caption: 'The redesign of the app\'s main dashboard, focusing on a clean, card-based interface for easy information scanning.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Redesigned+Dashboard' },
{ caption: 'Before and After: A comparison of the old, cluttered navigation and the new, streamlined user flow.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Before+%26+After' },
{ caption: 'Detailed wireframes and prototypes showing the redesigned user flow for key banking tasks.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Wireframes' }
    ],
    caseStudy: {
    context: { team: 'Team of 5', timeline: '6 months', role: 'Lead UX/Product Designer' },
    problem: 'The original banking app suffered from a cluttered interface, difficult navigation, and a lack of accessibility. User ratings were consistently low (2.1 stars) and we found users often struggled to complete basic transactions mid-process. The app\'s outdated and information-heavy design made simple tasks like checking bank account balances or transferring funds unnecessarily difficult.',
    process: 'Our design methodology followed a comprehensive user-centered approach: We conducted sales and discovery interviews and ran surveys to identify customer pain points; we benchmarked our app against leading banking apps; and we created lo-fi and hi-fi prototypes and conducted usability testing.',
    solutions: 'The redesign focused on three key aspects: creating a scalable design system, simplifying user flows, and improving overall accessibility. The new design features a card-based interface that made information easily scannable, even on a small screen. It addressed key issues with both information architecture and visual design.',
    outcomes: [
    'User Rating: 2.1 → 4.0 stars',
    'Task Completion Rate: 67% → 85%',
    'Support Tickets: -65%',
    'User Engagement: +140%'
    ],
    improvements: 'Looking ahead, I would focus on implementing personalized dashboards to allow users to customize their views. I\'d also like to explore adding voice navigation and multi-currency account support for international users. Additionally, integrating financial literacy tools would provide even more value, empowering users to manage their financial health.'
}
},
    '2': {
    title: 'Creators Fit (formerly Privi)',
    description: 'A social platform for content creators and influencers to share exclusive, paid content with their audiences, targeting the Brazilian market.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Creators+Fit',
    tech: ['React', 'Node.js', 'Figma', 'MongoDB', 'AWS'],
    designs: [
{ caption: 'The redesign of the app\'s main dashboard, focusing on a clean, card-based interface for easy information scanning.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Redesigned+Dashboard' },
{ caption: 'Before and After: A comparison of the old, cluttered navigation and the new, streamlined user flow.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Before+%26+After' },
{ caption: 'Detailed wireframes and prototypes showing the redesigned user flow for key banking tasks.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Wireframes' }
    ],
    caseStudy: {
    context: { team: 'Founding member', timeline: '1 year', role: 'Product Design & Front-End Dev' },
    problem: `"How might we help Brazilian social media influencers monetize content with faster payouts and stronger audience engagement?"

Privi was founded with the mission of facilitating social media influencers into monetising their work effectively and hassle-free. The team had already done some market-opportunity mappings through initial interviews, and identified a viable entry-point with financial management of subscriptions and fast money-retrieval alternatives (in comparison to generic players on the market such as OnlyFans). Our goal was to find a way to viable penetration of the brazilian market specifically - focusing initially on the sensual content audience.`,
    process: `The product focused initially on the audience's biggest pain point: the means for the collection of subscriptions money and sharing of content through e-mails and private links. We were able to collect some clients with active engagement based on the initial model, and better understand the needs of the industry so we could aim at scalable growth. We ran multiple rounds of small iterations and sales interviews with the target audience to understand the general market, customer needs and where the product needed to go in order to find product market fit.

Our research approach included:
- Sales and discovery interviews with influencers to explore needs and market entry.
- Persona mapping (creators and subscribers) to better define user journeys.
- Surveys with content creator subscribers to understand content discovery and usability issues.
- Two rounds of moderated usability tests (5 sessions each) with pilot customers to validate navigation, clarity, and desirability of the new flows.`,
    solutions: `From research, we identified four core needs that shaped the product strategy:

1. Seamless financial management
Creators needed faster confirmation of subscriptions, transparent earnings, and instant withdrawals. This became a key differentiator of Privi.

2. Expansion into adjacent markets
While sensual content was the initial entry point, we discovered similar needs in fitness, nutrition, and lifestyle creators. This insight drove a rebranding effort to broaden appeal.

3. From selling to sharing
Creators wanted more than payment links—they needed a social space to share, interact, and receive feedback. This led us to expand into community and profiling features.

4. Subscriber experience
For audiences, the platform had to be more than just a payment gateway. Content discovery and influencer exploration were added to make Privi a place where fans could find and follow new creators.

After testing initial design alternatives, we refined the product through two iterative rounds of usability testing with pilot customers. These sessions ensured the experience was understandable, easy to navigate, and engaging before scaling to a wider audience.`,
    outcomes: [
    'Result numbers to be added here later (no need to add anything for now)'
    ],
    improvements: 'Looking ahead, I would focus on implementing personalized dashboards to allow users to customize their views. I\'d also like to explore adding voice navigation and multi-currency account support for international users. Additionally, integrating financial literacy tools would provide even more value, empowering users to manage their financial health.'
}
},
    '3': {
    title: 'Project Three',
    description: 'A detailed description for Project Three, including its purpose and key features.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Project+3',
    tech: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    caseStudy: {
    context: { team: 'Solo', timeline: '3 months', role: 'Full-Stack Developer' },
    problem: 'Placeholder for a problem statement.',
    process: 'Placeholder for the process.',
    solutions: 'Placeholder for solutions.',
    outcomes: ['Placeholder outcome 1', 'Placeholder outcome 2'],
    improvements: 'Placeholder for future improvements.'
}
},
    '4': {
    title: 'Project Four',
    description: 'A detailed description for Project Four, including its purpose and key features.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Project+4',
    tech: ['Python', 'Django', 'PostgreSQL'],
    caseStudy: {
    context: { team: 'Team of 2', timeline: '4 months', role: 'Backend Developer' },
    problem: 'Placeholder for a problem statement.',
    process: 'Placeholder for the process.',
    solutions: 'Placeholder for solutions.',
    outcomes: ['Placeholder outcome 1', 'Placeholder outcome 2'],
    improvements: 'Placeholder for future improvements.'
}
},
    '5': {
    title: 'FIAP Startup Challenge: HealthHub',
    description: 'A mobile-first platform for clinics and patients, designed and built for the FIAP Startup Challenge 2023. Our team earned 2nd place out of 50+ teams with a healthcare solution focused on long-term care management.',
    image: './assets/fiap/cover.png',
    tech: ['Figma', 'Vue.js', 'Node.js', 'UX Research', 'MVP', 'Healthcare', 'Mobile Design'],
    designs: [
{ caption: 'Patient persona research and journey mapping to understand healthcare needs and pain points.', src: './assets/fiap/patientpersona.png' },
{ caption: 'Doctor persona research and clinical workflow mapping for optimal care management.', src: './assets/fiap/doctorpersona.png' },
{ caption: 'Appointment scheduling and medical history tracking interface for patients.', src: './assets/fiap/appointmenthistory.png' },
{ caption: 'Patient management dashboard for doctors with prescriptions and document uploads.', src: './assets/fiap/patientmenagement.png' },
{ caption: 'Centralized health information system for secure document and treatment management.', src: './assets/fiap/healthinformation.png' }
    ],
    caseStudy: {
    context: { team: 'Team of 5', timeline: '1 semester', role: 'Product Design, UI, Front-end' },
    problem: `"How might we create a single tool that connects doctors and patients to improve long-term care management?"\n\nThe healthcare system was fragmented, especially for long-term conditions requiring multiple specialists and ongoing monitoring.\n\nKey challenges:\n\nFor Doctors:\n- Managing patient information across disconnected systems\n- Difficulty tracking upcoming appointments and follow-ups\n- No centralized clinic database for patient history\n- Time-consuming manual processes for prescriptions and documents\n\nFor Patients:\n- Fragmented access to diagnoses, lab results, and treatments\n- Lost or misplaced medical documents and prescriptions\n- Confusion tracking multiple specialists for chronic conditions (diabetes, hepatitis, HIV)\n- Lack of transparency in ongoing care plans\n\nWe needed a unified platform that would serve both healthcare providers and patients, making long-term care management seamless and transparent.`,
    process: `Our design process was rooted in empathy and real-world validation from healthcare professionals and patients.\n\nResearch methodology:\n\n• Community Surveys: Distributed through social media to gather broad perspectives on healthcare pain points and needs.\n\n• In-Depth Interviews: Conducted 7 detailed interviews with doctors and nurses from the university community to understand clinical workflows and challenges.\n\n• Persona Development: Created detailed patient and doctor personas based on research findings, focusing on long-term care scenarios.\n\n• Feedback Sessions: Regular validation sessions with healthcare professionals to refine requirements and ensure clinical accuracy.\n\n• User Journey Mapping: Mapped end-to-end journeys for both doctors and patients, identifying key touchpoints and friction areas.\n\nMy role and responsibilities:\n\n• UI/UX Design: Prepared comprehensive UI flows and interface designs for both mobile and web platforms.\n\n• Collaboration: Worked closely with the UX researcher to translate insights into actionable user journeys and wireframes.\n\n• Iteration: Multiple rounds of wireframe refinement based on stakeholder feedback and usability considerations.\n\n• Front-End Implementation: Built the web layer for the MVP using Vue.js, ensuring responsive design and accessibility.\n\n• Design System: Established consistent UI patterns for healthcare contexts (clear hierarchy, accessible colors, readable medical information).`,
    solutions: `HealthHub is a mobile-first platform designed to bridge the gap between clinics and patients, centralizing long-term care management.\n\nKey features for Clinics:\n\n• Doctor Management: Streamlined onboarding and profile management for healthcare providers.\n• Appointment System: Comprehensive scheduling tool with reminders and calendar integration.\n• Patient Records: Centralized database with complete medical history, treatments, and documents.\n• Prescription Tools: Digital prescription creation with secure sharing to patients.\n• Document Uploads: Easy upload and organization of lab results, diagnoses, and medical imaging.\n\nKey features for Patients:\n\n• Appointment Hub: View upcoming appointments across all specialists in one place.\n• Treatment Plans: Clear visualization of ongoing treatments and medication schedules.\n• Test Results: Instant access to lab results and medical documents as they're uploaded.\n• Medical History: Complete timeline of diagnoses, prescriptions, and specialist visits.\n• Document Management: Secure storage and download of all medical paperwork.\n• Multi-Specialist Coordination: Track care across different doctors for chronic conditions.\n\nCore Differentiators:\n\n• Dual-Sided Platform: Single tool serving both professionals and patients (not separate systems).\n• Long-Term Care Focus: Optimized for chronic conditions requiring ongoing monitoring.\n• User-Friendly Design: Healthcare-specific UI patterns with clear hierarchy and accessible information.\n• Data Centralization: All medical information in one secure, organized location.\n• Transparency: Patients have full visibility into their care plans and treatment progress.\n\nThe mobile-first approach ensures accessibility for patients on-the-go, while the web version provides clinics with comprehensive administrative tools.`,
    outcomes: [
    '🏆 2nd place in the FIAP Startup Challenge 2023 (out of 50+ competing teams)',
    'Strong validation from 7+ local doctors and clinics who participated in the co-design process',
    'Positive feedback on user experience, mobile-first approach, and dual-sided platform concept',
    'MVP successfully demonstrated appointment management, document storage, and patient-doctor communication',
    'Recognition for addressing real healthcare gaps in long-term care management',
    'Project concluded after graduation as team members pursued different career paths'
    ],
    improvements: `Building a healthcare solution taught me the critical importance of empathy, trust, and responsibility when designing for sensitive contexts.\n\nKey learnings:\n\n• Empathy in Healthcare: Working with vulnerable patients and busy healthcare providers requires deep understanding of their daily realities and constraints.\n\n• Trust is Everything: In healthcare, trust is earned through clear communication, data security, and reliable functionality—not just visual polish.\n\n• Simple > Smart: The best healthcare tools often aren't the most "innovative"—they're the ones that make complex workflows simpler and safer.\n\n• Dual-Sided Complexity: Balancing the needs of two very different user groups (doctors vs. patients) requires careful prioritization and clear use case separation.\n\n• Mobile-First Matters: Patients need access on-the-go, but clinics need administrative power—designing for both contexts is challenging.\n\n• Regulatory Awareness: Healthcare has unique compliance requirements (HIPAA, LGPD) that must be considered from day one.\n\nWhat I would do differently:\n\nIf the project had continued to market, I would have:\n\n• Pilot Program: Run 3-month pilot demos with 5 local clinic partners to test real-world usage and gather quantitative data.\n\n• Engagement Metrics: Track appointment booking rates, document upload frequency, and patient login patterns to identify friction points.\n\n• Iterative Refinement: Use pilot data to refine UI flows, simplify navigation, and optimize for actual clinical workflows.\n\n• Security Audit: Conduct thorough security review and compliance audit before scaling beyond pilot phase.\n\n• Patient Feedback: Implement in-app feedback mechanisms to continuously improve based on real patient needs.\n\n• Integration Planning: Explore integrations with existing clinic management systems to reduce adoption barriers.\n\nFuture enhancements would focus on:\n\n• Telemedicine integration for remote consultations\n• AI-powered appointment reminders and medication alerts\n• Family account linking for caregivers managing elderly patients\n• Multi-language support for diverse patient populations\n• Analytics dashboard for clinics to track patient engagement and outcomes`
}
},
    '6': {
    title: 'Nohs Somos: LGBTQ Community Safety App',
    description: 'A map-based platform to identify and review LGBTQ-friendly and safe spaces, built for Nohs Somos and later merged with TODXS. The app empowers vulnerable communities to find welcoming businesses and connect with others.',
    image: './assets/nohs-somos/cover.png',
    tech: ['React.js', 'JavaScript', 'Lottie', 'Design System', 'UX Research', 'Social Impact', 'Mobile & Web'],
    designs: [
{ caption: 'Interactive neighborhood map showing LGBTQ-friendly businesses and safe spaces with real-time reviews.', src: './assets/nohs-somos/neighbourhoodmap.png' },
{ caption: 'In-app registration flow designed for accessibility and user safety with clear privacy controls.', src: './assets/nohs-somos/inappregistration.png' },
{ caption: 'Community-driven comments and reviews system for sharing experiences and safety information.', src: './assets/nohs-somos/comments.png' },
{ caption: 'Forbes Brazil feature highlighting the app\'s national impact and recognition.', src: './assets/nohs-somos/forbes.png' }
    ],
    caseStudy: {
    context: { team: 'Cross-functional (UI Dev, UX, PM, Volunteers)', timeline: '6+ months', role: 'UI Developer, Design System, Front-end' },
    problem: `"How might we help LGBTQ people feel safer and more connected in their communities?"\n\nBrazil has one of the highest rates of violence against LGBTQ individuals globally. Many community members felt unsafe in public spaces, especially when traveling to unfamiliar neighborhoods or cities. The lack of a reliable, centralized resource to identify welcoming businesses and safe areas created constant anxiety and limited freedom of movement.\n\nKey challenges:\n\nSafety Concerns:\n- High risk of discrimination and violence in public spaces\n- Uncertainty about which businesses are LGBTQ-friendly\n- Lack of real-time information about safe areas\n- Difficulty planning routes in unfamiliar neighborhoods\n\nCommunity Isolation:\n- Limited visibility of nearby LGBTQ communities\n- Difficulty finding support networks while traveling\n- Lack of connection with local allies and safe spaces\n- Need for positive visibility and community building\n\nInformation Gap:\n- No centralized platform for safety information\n- Scattered, unreliable sources across social media\n- Outdated or incomplete business directories\n- Missing community-driven feedback and reviews\n\nWe needed a platform that would empower the LGBTQ community with reliable safety information while fostering connection and positive visibility.`,
    process: `The discovery and design process was led by LGBTQ individuals and allies, ensuring authentic representation and understanding of community needs.\n\nResearch & Discovery:\n\n• Community Interviews: In-depth conversations with LGBTQ individuals, activists, and collective organizers to understand daily safety challenges and needs.\n\n• Statistical Research: Analysis of national statistics and academic research on violence and discrimination against LGBTQ people in Brazil.\n\n• User Workshops: Collaborative sessions with community members to validate UI concepts and map functionalities.\n\n• Iterative Testing: Multiple rounds of prototype testing with real users to ensure usability and trustworthiness.\n\n• Stakeholder Alignment: Regular check-ins with LGBTQ collectives and activists to ensure the solution served genuine community needs.\n\nMy Role & Responsibilities:\n\n• UI Design Collaboration: Worked closely with UX designers to translate research insights into accessible, trustworthy interface designs.\n\n• Front-End Development: Built the app using React.js, ensuring responsive performance across mobile and web platforms.\n\n• Design System Creation: Developed a complete design system from scratch for both mobile and web, with components optimized for sensitive contexts.\n\n• Lottie Animation Implementation: Integrated Lottie animations to enhance user engagement while maintaining performance and accessibility.\n\n• Quality Assurance: Led QA practices to ensure reliability, security, and user trust in a high-risk context.\n\n• Cross-Functional Collaboration: Coordinated with PM, UX, and volunteer contributors to align on features and prioritization.\n\nDesign Principles:\n\n• Empathy First: Every design decision was made with deep respect for user vulnerability and safety.\n\n• Trust & Credibility: Clear, honest communication about data privacy and platform security.\n\n• Accessibility: Ensured the app was usable by people of all abilities and technical comfort levels.\n\n• Visual Polish: High-quality design to signal professionalism and trustworthiness in a sensitive domain.`,
    solutions: `Nohs Somos is a map-based safety platform designed to empower LGBTQ individuals with reliable information about welcoming spaces and community resources.\n\nCore Features:\n\n• Interactive Map: Real-time map interface showing LGBTQ-friendly businesses, safe spaces, and community resources by location.\n\n• Business Reviews: Community-driven rating and review system allowing users to share experiences and safety information.\n\n• Safety Indicators: Clear visual markers distinguishing between verified safe spaces, reported friendly businesses, and flagged areas.\n\n• Location Search: Advanced search and filtering to find specific types of businesses (restaurants, bars, hotels, healthcare, etc.).\n\n• User Contributions: Easy submission process for adding new locations and updating existing information.\n\n• Privacy Controls: Strong privacy features allowing anonymous reviews and selective profile sharing.\n\n• Community Comments: Discussion system for sharing tips, warnings, and support.\n\n• Neighborhood Safety: Area-level safety information based on aggregated community feedback.\n\nDesign System Components:\n\n• Accessible Color Palette: High contrast, colorblind-friendly colors ensuring readability in all conditions.\n\n• Clear Iconography: Intuitive icons for safety levels, business types, and user actions.\n\n• Responsive Grid: Fluid layouts adapting seamlessly between mobile and web.\n\n• Motion Design: Lottie animations for loading states, confirmations, and onboarding flows.\n\n• Component Library: Reusable React components for buttons, cards, forms, and navigation.\n\nTechnical Implementation:\n\n• React.js architecture for performant, component-based UI\n• Lottie integration for smooth, lightweight animations\n• Responsive design system built from scratch\n• Optimized for both mobile and web experiences\n• Focus on performance and accessibility\n\nKey Differentiators:\n\n• Community-Driven: Built by and for LGBTQ people, ensuring authentic understanding of needs.\n• Real-Time Updates: Dynamic information based on recent community feedback.\n• Trust & Safety: Robust moderation and verification processes to maintain data quality.\n• Empathy-Centered Design: Every feature designed with deep respect for user vulnerability.\n• National Impact: Positioned to serve LGBTQ communities across Brazil, not just major cities.`,
    outcomes: [
    '📰 National media coverage in mainstream Brazilian outlets including Forbes Brazil',
    '📱 Featured by major LGBTQ collectives and activist organizations across the country',
    '👥 10,000+ active collaborators contributing reviews and location data within the first 6 months',
    '🤝 Successful merger with TODXS, uniting technology teams and user bases',
    '🏆 Became the most recognized LGBTQ community safety app in Brazil post-merger',
    '💪 Demonstrated real-world social impact by helping vulnerable individuals navigate safely',
    '🔄 Contributed to smooth migration process, UI refinement, and user transition support during merger',
    '🎨 Design system adopted and expanded by the merged TODXS platform'
    ],
    improvements: `Working on Nohs Somos was one of the most meaningful experiences of my career, teaching me invaluable lessons about designing for social impact and vulnerable communities.\n\nKey Learnings:\n\n• Design System Mastery: Built a complete design system from scratch for both mobile and web, learning the importance of scalable, maintainable component architecture.\n\n• Motion Design Impact: Discovered how Lottie animations and thoughtful motion design can significantly enhance user engagement, especially in apps requiring frequent interaction.\n\n• Empathy in Design: Learned to design with deep respect for user vulnerability, where every interaction could impact someone's physical safety.\n\n• Performance Matters: In safety-critical contexts, app performance and reliability aren't just nice-to-haves—they're essential for user trust.\n\n• Community-Centered Approach: Experienced firsthand how involving the community in the design process leads to more authentic, effective solutions.\n\n• Social Impact Measurement: Understood that success metrics go beyond downloads and DAUs—real impact is measured in lives protected and communities strengthened.\n\n• Cross-Functional Leadership: Led QA practices and coordinated across diverse teams (developers, designers, activists, volunteers), learning how to align different perspectives toward a common goal.\n\n• Visual Quality in Sensitive Contexts: Discovered that high-quality visual design signals trustworthiness and professionalism, which is especially critical when users are making safety decisions.\n\nTechnical Growth:\n\n• Advanced React.js patterns for complex state management\n• Lottie animation integration and optimization techniques\n• Building accessible, responsive components from scratch\n• Performance optimization for mobile-first experiences\n• Git workflow and collaboration in distributed teams\n\nWhat Made This Project Special:\n\n• Purpose-Driven Work: Every line of code and every design decision had real-world impact on people's safety and wellbeing.\n\n• Authentic Collaboration: Working directly with LGBTQ activists and community members ensured we were solving real problems, not perceived ones.\n\n• National Recognition: Seeing the app featured in Forbes Brazil and adopted by major collectives validated our approach and impact.\n\n• Successful Scaling: The merger with TODXS proved the solution's value and allowed it to reach even more people.\n\nReflections on Social Impact Design:\n\nDesigning for vulnerable communities requires:\n- Humility to listen and learn from lived experiences\n- Responsibility to protect user privacy and safety\n- Commitment to accessibility for all abilities and contexts\n- Patience to iterate based on genuine community feedback\n- Courage to advocate for features that truly serve users, even when technically challenging\n\nThis project reinforced my belief that technology should serve humanity, and that the most rewarding work comes from using our skills to make the world safer and more inclusive for everyone.`
}
},
    '7': {
    title: 'Creators Fit (formerly Privi): Monetizing Content for Brazilian Influencers',
    description: 'A social platform for content creators and influencers to share exclusive, paid content with their audiences. Focused on the Brazilian market, supporting subscriptions, pay-per-view, and media uploads for communities in sensuality, fitness, and lifestyle.',
    image: './assets/creators-fit/cover.png',
    tech: ['React.js', 'Figma', 'Node.js', 'UX Research', 'Design System', 'MongoDB', 'AWS'],
    designs: [
{ caption: 'Creator persona mapping to understand user needs and pain points across different content categories.', src: './assets/creators-fit/creatorspersona.png' },
{ caption: 'Custom creator profile with social sharing and content management features.', src: './assets/creators-fit/customprofile.png' },
{ caption: 'Feed view showing content discovery and influencer exploration for subscribers.', src: './assets/creators-fit/privifeed.png' },
{ caption: 'Instagram-style interface for seamless social interaction and content sharing.', src: './assets/creators-fit/priviinstagram.png' }
    ],
    caseStudy: {
    context: { team: 'Founding team member', timeline: '1+ year', role: 'Product Design & Front-End Dev' },
    problem: `"How might we help Brazilian social media influencers monetize content with faster payouts and stronger audience engagement?"\n\nPrivi was founded with the mission of helping influencers monetize their work easily and reliably, addressing a gap in the market left by larger players like OnlyFans. The team identified a key entry point: better financial management of subscriptions and faster payouts, which were major pain points for Brazilian creators.\n\nWe needed to:\n- Validate product-market fit for subscription-based content monetization.\n- Identify opportunities to differentiate in the Brazilian market.\n- Find and execute viable growth opportunities on top of the acquired initial user activity.\n- Build a scalable platform that could expand beyond the initial sensual content niche.`,
    process: `The product focused initially on the audience's biggest pain point: the collection of subscriptions money and sharing of content through emails and private links. We were able to collect some clients with active engagement based on the initial model, and better understand the needs of the industry so we could aim at scalable growth.\n\nOur research approach included:\n- Sales and discovery interviews with influencers to explore needs and market entry.\n- Persona mapping (creators and subscribers) to better define user journeys.\n- Surveys with content creator subscribers to understand content discovery and usability issues.\n- Two rounds of moderated usability tests (5 sessions each) with pilot customers to validate navigation, clarity, and desirability of the new flows.\n- Continuous iteration through feedback loops with our initial user base.\n\nFrom research, we identified four core needs that shaped the product strategy:\n\n1. Seamless financial management: Creators needed faster confirmation of subscriptions, transparent earnings, and instant withdrawals. This became a key differentiator of Privi.\n\n2. Expansion into adjacent markets: While sensual content was the initial entry point, we discovered similar needs in fitness, nutrition, and lifestyle creators. This insight drove a rebranding effort to broaden appeal and scale the platform.\n\n3. From selling to sharing: Creators wanted more than payment links—they needed a social space to share, interact, and receive feedback. This led us to expand into community and profiling features with an Instagram-like experience.\n\n4. Subscriber experience: For audiences, the platform had to be more than just a payment gateway. Content discovery and influencer exploration were added to make Privi a place where fans could find and follow new creators.`,
    solutions: `To refine the solution, we collected further feedback through two iterative rounds of usability testing with pilot customers. These sessions ensured the experience was understandable, easy to navigate, and engaging before scaling to a wider audience.\n\nKey features developed:\n\n• Financial Dashboard: Complete financial management system with instant balance redemption and transparent earnings tracking.\n• Social Feed: Instagram-style feed for content sharing, likes, comments, and real-time feedback.\n• Custom Profiles: Personalized creator profiles with branding, bio, and media gallery management.\n• Subscription Management: Simplified subscription flow for users with multiple payment options and content tiers.\n• Content Discovery: Advanced search and recommendation system for finding creators by category.\n• Multi-Category Support: Expanded from sensual content to fitness, nutrition, lifestyle, and more.\n• Responsive Design System: Built scalable component library for rapid iteration across web and mobile.\n\nThe design system was carefully crafted to maintain consistency while allowing flexibility for different content categories. I worked closely with the front-end team to implement React components and ensure pixel-perfect UI across devices.`,
    outcomes: [
    '2,500+ content creators onboarded within the first year',
    '50,000+ active community users across multiple content categories',
    'Product evolved from MVP (Privi) to Creators Fit, expanding to new markets',
    'Strong product-market fit achieved through continuous user feedback and iteration',
    'Brand recognized as a comprehensive tool for Brazilian content creators across multiple industries',
    'Scalable design system enabled rapid feature development and platform expansion'
    ],
    improvements: `Building a product from scratch with full market launch required close relationships with pilot customers and constant iteration. Success in this space comes from balancing clean design, strong value proposition, and a high-quality design system.\n\nKey learnings:\n\n• Community management needs are surprisingly similar across different content categories (sensuality, fitness, lifestyle).\n• Product-market fit and scalable growth are achieved through deep user research, rapid prototyping, and responsive UI development.\n• Financial transparency and speed are critical trust factors for creator platforms.\n• Starting with a niche audience and expanding strategically proved more effective than launching broadly.\n• The importance of social features—creators valued community interaction as much as monetization.\n\nFuture improvements would focus on:\n\n• Advanced analytics dashboard for creators to track engagement metrics and earnings over time.\n• AI-powered content recommendations for subscribers based on viewing history and preferences.\n• Enhanced community moderation tools and automated content filtering.\n• International expansion with multi-currency support and localized payment methods.\n• Mobile-first native apps to improve accessibility and push notification engagement.\n• Creator collaboration tools for co-branded content and cross-promotion.`
}
},
    '8': {
    title: 'iLog (Konviva): Boosting Mandatory Course Completion for Enterprise Training',
    description: 'Konviva (formerly iLog Education) is an EdTech product delivering tailored employee training solutions for enterprise businesses across Latin America. Its core offering is an advanced LMS platform for field-worker training, tests, and certification, serving 300k+ monthly users at companies like Volkswagen, Santander, Zurich, and more.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=iLog+Dashboard',
    tech: ['UI/UX', 'HTML/CSS', 'JavaScript', 'User Research', 'LMS', 'EdTech'],
    caseStudy: {
    context: {
    team: 'Project & Technology team (8 full-stack engineers, 1 PM, 1 UI/UX & Web Designer)',
    timeline: '2019, 4+ months',
    role: 'UI/UX & Web Designer (user research, prototyping, UI design, HTML/CSS implementation)'
},
    problem: `How might we raise mandatory course completion from 40% to 60% for enterprise clients?\n\nDespite strong platform adoption, completion rates for mandatory training were inconsistent, ranging from 30–45%. With new high-volume clients joining, the business needed to raise completion to at least 60% for compliance-critical training.`,
    process: `Investigation methods included:\n- Heuristic analysis of the current platform flows and test functionalities.\n- Competitor benchmarking to identify industry best practices.\n- Database behavior analysis (e.g., course start rates, entry points, and common dropout reasons).\n- 5 interviews with managers and first-time employees to map pain points, focusing on their role, context, and challenges around mandatory training.\n- An internal workshop with designers, PMs, and stakeholders to synthesize findings and brainstorm ideas.\n\nKey insights:\n- Time Constraints: Employees often lacked dedicated time during work hours to complete courses.\n- User Experience Friction: Confusing UI and open-ended tests created friction and led to a high abandonment rate of approximately 30%.\n- Managerial Limitations: Managers lacked flexibility in setting test types and grading, which limited engagement and increased their administrative workload.\n- Systemic Issues: Enrollment and authentication issues affected non–tech-savvy users (handled by another squad).\n\nWe approached the redesign in two rounds of design work, each followed by structured review sessions with three senior designers, the project team, and stakeholders, ensuring feedback loops that helped us validate ideas, refine flows, and align on both user needs and technical feasibility before development.`,
    solutions: `The final solution focused on streamlining the experience for both employees and managers, introducing:\n- Clearer entry points to courses from the main dashboard.\n- Improved test-creation tools for managers, featuring automated grading and pass/fail settings to simplify the testing process.\n- Simplified completion flows for employees, with attractive, shareable certificates instantly added to their profiles for social visibility and motivation.\n\nOn the implementation side, I worked closely with engineers to translate the designs into production-ready UI, building the HTML/CSS layers and contributing to front-end components within the existing JavaScript framework.\n\n(Note: This is where you would insert visuals/flows/animations, including before-and-after mocks, to illustrate your contribution and impact).`,
    outcomes: [
    'The completion rate improved to 62%, successfully surpassing the 60% target.',
    'Abandonment dropped to 23% within six months.',
    'Managers’ workload was significantly reduced through test automation and clearer grading workflows.',
    'Certificates with social visibility successfully boosted employee motivation.'
    ],
    improvements: `While the solution was successful, with more time and resources, I would have invested in end-user usability testing on prototypes before implementation. Conducting this early-stage testing would have likely uncovered friction points sooner and potentially driven even higher engagement results from the outset.`
}
}
};

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
}

    themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
} else {
    localStorage.setItem('theme', 'light');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
}
});

    // Page Navigation Logic
    const pageLinks = document.querySelectorAll('.page-link');
    const pageContents = document.querySelectorAll('.page-content');

    function showPage(pageId) {
    // Hide all page sections
    pageContents.forEach(page => {
    page.classList.add('hidden');
    page.classList.remove('active');
});

    // Show the selected page section
    const activePage = document.getElementById(`${pageId}-page`);
    if (activePage) {
    activePage.classList.remove('hidden');
    activePage.classList.add('active');
    // Reset scroll position for new page
    window.scrollTo(0, 0);

    // --- Text Reveal Logic ---
    // Check if we are on the 'about' page to trigger text reveal
    if (pageId === 'about') {
    const highlights = activePage.querySelectorAll('.highlight-text');
    highlights.forEach((span, index) => {
    // Remove old class to allow re-triggering
    span.classList.remove('auto-reveal');

    // Force reflow to restart animation if user clicks back
    void span.offsetWidth;

    // Add class with a delay
    setTimeout(() => {
    span.classList.add('auto-reveal');
}, index * 200); // 200ms stagger
});
} else {
    // Clean up classes when leaving the page
    const aboutPage = document.getElementById('about-page');
    if (aboutPage) {
    aboutPage.querySelectorAll('.highlight-text').forEach(span => {
    span.classList.remove('auto-reveal');
});
}
}
    // --- End Text Reveal Logic ---
}
}

    // Expose global navigation helper for external scripts (hero pile cards)
    window.handlePageChange = function(pageId) {
        window.location.hash = pageId;
        showPage(pageId);
    };

    // Project Detail Page Logic
    const projectCards = document.querySelectorAll('.project-card');

    function showProjectDetails(projectId) {
    const projectData = projects[projectId];
    if (!projectData) {
    // Handle case where project data is not found
    showPage('projects'); // Go back to projects page
    return;
}

    // Update elements on the project detail page
    document.getElementById('project-title').textContent = projectData.title;
    document.getElementById('project-description').textContent = projectData.description;

    // Populate technology list
    const techList = document.getElementById('project-tech-list');
    techList.innerHTML = '';
    projectData.tech.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    // Use the tech-tag class from the design system
    li.className = 'tech-tag';
    techList.appendChild(li);
});

    // Populate case study content
    const caseStudyContent = document.getElementById('case-study-content');
    caseStudyContent.innerHTML = ''; // Clear previous content

    const caseStudy = projectData.caseStudy;
    let caseStudyHtml = '';

    // Context
    if (caseStudy.context) {
    caseStudyHtml += `
                            <h3 class="case-study-title">Project Overview</h3>
                            <div class="space-y-4 mb-8">
                                <div class="flex flex-col md:flex-row justify-between items-start pb-4 border-b border-gray-700 gap-4">
                                    <div class="w-full md:w-1/3 text-left">
                                        <p class="font-bold">Context</p>
                                        <p class="secondary-text">${caseStudy.context.team}</p>
                                    </div>
                                    <div class="w-full md:w-1/3 text-left md:text-center">
                                        <p class="font-bold">Timeline</p>
                                        <p class="secondary-text">${caseStudy.context.timeline}</p>
                                    </div>
                                    <div class="w-full md:w-1/3 text-left md:text-right">
                                        <p class="font-bold">Role</p>
                                        <p class="secondary-text">${caseStudy.context.role}</p>
                                    </div>
                                </div>
                            </div>
                        `;
}

    // Problem
    if (caseStudy.problem) {
    caseStudyHtml += `<h3 class="case-study-title">The Problem</h3><p class="body-text secondary-text mb-8">${caseStudy.problem.replace(/\n/g, '<br>')}</p>`;
}

    // Process with first image if available
    if (caseStudy.process) {
    caseStudyHtml += `<h3 class="case-study-title">Our Process</h3><p class="body-text secondary-text mb-8">${caseStudy.process.replace(/\n/g, '<br>')}</p>`;

    // Add first design image after process (persona/research)
    if (projectData.designs && projectData.designs[0]) {
        caseStudyHtml += `
            <div class="mb-8">
                <img src="${projectData.designs[0].src}" alt="${projectData.designs[0].caption}" class="w-full h-auto rounded-lg mb-2">
                <p class="secondary-text text-sm text-center">${projectData.designs[0].caption}</p>
            </div>
        `;
    }
}

    // Solutions & remaining Designs
    if (caseStudy.solutions) {
    caseStudyHtml += `<h3 class="case-study-title">Design & Solutions</h3><p class="body-text secondary-text mb-8">${caseStudy.solutions.replace(/\n/g, '<br>')}</p>`;

    if (projectData.designs && projectData.designs.length > 1) {
        caseStudyHtml += `
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                ${projectData.designs.slice(1).map(design => `
                    <div class="text-center">
                        <img src="${design.src}" alt="${design.caption}" class="w-full h-auto rounded-lg mb-2">
                        <p class="secondary-text text-sm">${design.caption}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

    // Outcomes
    if (caseStudy.outcomes && caseStudy.outcomes.length > 0) {
    caseStudyHtml += `<h3 class="case-study-title">Final Outcomes & Reflection</h3><ul class="list-disc list-inside space-y-2 body-text secondary-text">${caseStudy.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}</ul>`;
}

    // Improvements
    if (caseStudy.improvements) {
    caseStudyHtml += `<h3 class="case-study-title mt-8">What I'd Improve</h3><p class="body-text secondary-text mb-8">${caseStudy.improvements.replace(/\n/g, '<br>')}</p>`;
}

    caseStudyContent.innerHTML = caseStudyHtml;

    // Switch to the project detail page
    showPage('project-detail');
}

    // Add event listeners for navigation and project cards
    pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;
    // Update URL hash
    window.location.hash = pageId;
    showPage(pageId);
});
});

    projectCards.forEach(card => {
    // Only add click listeners to cards that have a data-project-id
    if (card.dataset.projectId) {
    card.addEventListener('click', () => {
    const projectId = card.dataset.projectId;
    // Update URL hash for project
    window.location.hash = `project-${projectId}`;
    showProjectDetails(projectId);
});
}
});

    // Contact Form Submission Logic
    // FIX: Comment out this block to prevent the error
    /*
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { // Add a check to prevent errors if form doesn't exist
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            setTimeout(() => {
                showModal('Message Sent!', 'Thanks for reaching out! I will get back to you as soon as possible.');
                contactForm.reset();
            }, 1000);
        });
    }
    */

    // Modal Logic
    const messageModal = document.getElementById('message-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseButton = document.getElementById('modal-close');

    function showModal(title, content) {
    modalTitle.textContent = title;
    modalContent.textContent = content;
    messageModal.classList.remove('hidden');
}

    modalCloseButton.addEventListener('click', () => {
    messageModal.classList.add('hidden');
});

    // Close modal on outside click
    messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
    messageModal.classList.add('hidden');
}
});


    // Initial page load based on URL hash
    function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('project-')) {
    const projectId = hash.split('-')[1];
    showProjectDetails(projectId);
} else {
    const pageId = hash || 'home';
    showPage(pageId);
}
}

    // Listen for hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', handleHashChange);

    // Initial load
    handleHashChange();


    // Interactive SVG animation logic for the hero section
    const svg = document.getElementById('hero-svg');
    const svgContainer = document.getElementById('hero-svg-container');
    let mouseX = 0;
    let mouseY = 0;

    // Generate some random shapes
    function createShape(type, count) {
    const shapes = [];
    for (let i = 0; i < count; i++) {
    const shape = document.createElementNS('http://www.w3.org/2000/svg', type);
    shapes.push(shape);
    svg.appendChild(shape);
}
    return shapes;
}

    const circles = createShape('circle', 10);
    // const lines = createShape('line', 5); // Lines are static, let's focus on interactive circles

    circles.forEach(circle => {
    circle.setAttribute('r', Math.random() * 20 + 5);
    circle.setAttribute('fill', `rgba(255, 107, 0, ${Math.random() * 0.4 + 0.1})`);
    const x = Math.random() * 600;
    const y = Math.random() * 400;
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.dataset.initialX = x;
    circle.dataset.initialY = y;
    circle.dataset.vx = 0; // Velocity x
    circle.dataset.vy = 0; // Velocity y
});

    if(svgContainer) {
    svgContainer.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
    mouseX = (e.clientX - rect.left) * (600 / rect.width);
    mouseY = (e.clientY - rect.top) * (400 / rect.height);
}
});

    svgContainer.addEventListener('mouseleave', () => {
    mouseX = -9999; // Move mouse "off-screen"
    mouseY = -9999;
});
}

    function animate() {
    circles.forEach(circle => {
    const initialX = parseFloat(circle.dataset.initialX);
    const initialY = parseFloat(circle.dataset.initialY);
    let cx = parseFloat(circle.getAttribute('cx'));
    let cy = parseFloat(circle.getAttribute('cy'));
    let vx = parseFloat(circle.dataset.vx);
    let vy = parseFloat(circle.dataset.vy);

    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Repulsion force from mouse
    let repelForce = 0;
    if (dist < 150) { // Repel radius
    repelForce = (150 - dist) * 0.01;
}
    const angle = Math.atan2(dy, dx);
    vx -= Math.cos(angle) * repelForce;
    vy -= Math.sin(angle) * repelForce;

    // Spring force to return to origin
    const springForce = 0.01;
    vx += (initialX - cx) * springForce;
    vy += (initialY - cy) * springForce;

    // Damping
    const damping = 0.95;
    vx *= damping;
    vy *= damping;

    // Update position
    cx += vx;
    cy += vy;

    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.dataset.vx = vx;
    circle.dataset.vy = vy;
});
    requestAnimationFrame(animate);
}

    animate();

    // Hamburger Menu Toggle Logic
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener('click', () => {
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
    mainNav.classList.toggle('open');
    hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    // Toggle body scroll
    body.style.overflow = isExpanded ? '' : 'hidden';
});
    // Close menu when a nav link is clicked (for better mobile UX)
    mainNav.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
});
});
}
});
