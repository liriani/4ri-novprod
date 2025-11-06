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
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=FIAP+HealthHub',
    tech: ['Figma', 'Vue.js', 'Node.js', 'UX Research', 'MVP'],
    designs: [
{ caption: 'Patient persona research and journey mapping.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Patient+Persona' },
{ caption: 'Doctor persona research and workflow mapping.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Doctor+Persona' },
{ caption: 'Appointments & History: Patients can check and schedule appointments, download test results, and track ongoing treatments.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Appointments+%26+History' },
{ caption: 'Patient Management: Doctors can upload documents, register prescriptions, and view patient history.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Patient+Management' },
{ caption: 'Secure & Understandable Health Information: Centralized management of documents, prescriptions, and treatment notes.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Health+Info' }
    ],
    caseStudy: {
    context: { team: 'Team of 5', timeline: '1 semester', role: 'Product Design, UI, Front-end' },
    problem: 'How might we create a single tool that connects doctors and patients to improve long-term care management? Doctors needed better tools for managing their own information, clinic databases, and especially upcoming appointments. Patients struggled with fragmented access to diagnoses, documents, lab results, and ongoing treatments—especially in long-term conditions like diabetes, hepatitis, or HIV, where multiple specialists are involved.',
    process: `Research methods included:\n- Community surveys through social media to gather broad perspectives.\n- 7 in-depth interviews with doctors and nurses from the university community.\n- Feedback sessions with healthcare professionals to validate needs and refine requirements.\n\nI was responsible for preparing the UI flows, interface designs, and front-end implementation. Together with the UX researcher, I translated insights into user journeys, iterated on wireframes, and built the web layer for our MVP.`,
    solutions: `HealthHub is a mobile-first platform for both clinics and patients.\n\nFor clinics:\n- Streamlined management of doctors, appointments, and patient records.\n\nFor patients:\n- A central hub to view upcoming appointments, treatment plans, test results, and medical history.\n\nDifferentiator: A single, user-friendly platform serving both professionals and patients, designed to reduce friction, centralize data, and increase transparency in ongoing care.`,
    outcomes: [
    '2nd place in the FIAP Startup Challenge 2023 (out of 50+ teams)',
    'Strong validation and interest from local doctors and clinics who participated in the co-design process',
    'Project did not move to market as team members pursued other initiatives after graduation'
    ],
    improvements: `If continued, I would have run 3-month pilot demos with 5 local clinic partners, tracked engagement metrics, and refined the solution through iterative cycles.\n\nKey learnings:\n- The importance of empathy and trust when working with sensitive industries.\n- Balancing innovation with responsibility and core, simple management resources.\n- Success in healthcare often comes from making workflows simpler and safer, not just "smarter" or prettier.`
}
},
    '6': {
    title: 'Nohs Somos: LGBTQ Community Safety App',
    description: 'A map-based platform to identify and review LGBTQ-friendly and safe spaces, built for Nohs Somos and later merged with TODXS. The app empowers vulnerable communities to find welcoming businesses and connect with others.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Nohs+Somos',
    tech: ['React.js', 'JavaScript', 'Lottie', 'Design System', 'UX Research'],
    designs: [
{ caption: 'UI design collaboration and map-based MVP for Nohs Somos.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Map+UI' },
{ caption: 'Animated and accessible UI with Lottie integration.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Lottie+Animation' },
{ caption: 'Design system components for web and mobile.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Design+System' },
{ caption: 'Promotional video and app launch.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Promo+Video' },
{ caption: 'App featured in national media and LGBTQ collectives.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Media+Feature' }
    ],
    caseStudy: {
    context: { team: 'Cross-functional (UI Dev, UX, PM, Volunteers)', timeline: '6+ months', role: 'UI Developer, Design System, Front-end' },
    problem: 'How might we help LGBTQ people feel safer and more connected in their communities? Many felt unsafe in public spaces, especially when traveling or in unfamiliar neighborhoods. There was no reliable, centralized resource to identify welcoming businesses and safe areas. Beyond safety, people sought a sense of connection with nearby LGBTQ communities, both for support and for positive visibility.',
    process: `Discovery and design were led by LGBTQ individuals and allies.\n- Interviews with LGBTQ individuals, activists, and collectives.\n- National statistics and academic research on violence and discrimination.\n- Workshops and iterative testing to validate UI concepts and map functionalities.\n\nMy responsibilities included UI design collaboration, front-end development (React.js), building the design system, implementing Lottie animations, and leading QA practices.`,
    solutions: `- Map-based platform to identify and review friendly/safe spaces.\n- Community-driven feedback for real-time information.\n- Accessible, clear, and trustworthy design for a high-risk context.\n- Lottie animations and motion design for engagement and polish.`,
    outcomes: [
    'App gained national traction and was featured in mainstream Brazilian media and LGBTQ collectives',
    '10k+ collaborators in the first 6 months, validating community demand',
    'Nohs Somos merged with TODXS, uniting technology teams and becoming the most recognized LGBTQ community safety app in Brazil',
    'Contributed to migration, UI refinement, and user transition support'
    ],
    improvements: `Key learnings:\n- Building a full design system from scratch for both mobile and web.\n- The impact of visual quality and motion design in sensitive apps.\n- Designing with empathy and respect for user vulnerability.\n- High-performance UI delivery and real-world social impact.`
}
},
    '7': {
    title: 'Creators Fit (formerly Privi): Monetizing Content for Brazilian Influencers',
    description: 'A social platform for content creators and influencers to share exclusive, paid content with their audiences. Focused on the Brazilian market, supporting subscriptions, pay-per-view, and media uploads for communities in sensuality, fitness, and lifestyle.',
    image: 'https://placehold.co/600x400/1e1e1e/d3d3d3?text=Creators+Fit+Privi',
    tech: ['React.js', 'Figma', 'Node.js', 'UX Research', 'Design System'],
    designs: [
{ caption: 'Persona mapping and user journey research for creators and subscribers.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Persona+Mapping' },
{ caption: 'Financial management and instant payout screens.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Financial+Management' },
{ caption: 'Community and social sharing features for creators.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Social+Area' },
{ caption: 'Subscription flow and content discovery for users.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Subscription+Flow' },
{ caption: 'Comparison of initial MVP and new Creators Fit platform.', src: 'https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Before+%26+After' }
    ],
    caseStudy: {
    context: { team: 'Founding team', timeline: '1+ year', role: 'Product Design, Front-end, MVP Launch' },
    problem: `How might we help Brazilian social media influencers monetize content with faster payouts and stronger audience engagement?\n\nPrivi’s mission was to help influencers monetize their work easily and reliably, addressing a gap in the market left by larger players like OnlyFans. The team identified a key entry point: better financial management of subscriptions and faster payouts, which were major pain points for Brazilian creators.\n\We needed to:\n- Validate product-market fit for subscription-based content monetization.\n- Identify opportunities to differentiate in the Brazilian market.\n- Find and execute viable growth opportunities on top of the acquired initial user activity.`,
    process: `Our research approach included:\n- Sales and discovery interviews with influencers to explore needs and market entry.\n- Persona mapping (creators and subscribers) to better define user journeys.\n- Surveys with content creator subscribers to understand content discovery and usability issues.\n- Two rounds of moderated usability tests (5 sessions each) with pilot customers to validate navigation, clarity, and desirability of the new flows.\n\nFrom research, we identified four core needs that shaped the product strategy:\n1. Seamless financial management: Creators needed faster confirmation of subscriptions, transparent earnings, and instant withdrawals.\n2. Expansion into adjacent markets: Similar needs in fitness, nutrition, and lifestyle creators led to a broader opportunity.\n3. From selling to sharing: Creators wanted a social space to share, interact, and receive feedback, not just payment links.\n4. Subscriber experience: The platform needed to be more than a payment gateway—content discovery and influencer exploration were added.`,
    solutions: `To refine the solution, we collected further feedback through two iterative rounds of usability testing with pilot customers. These sessions ensured the experience was understandable, easy to navigate, and engaging before scaling to a wider audience.\n\nKey features included:\n- Complete financial management and instant redemption of balance.\n- Social area for content sharing and feedback.\n- Expansion to fitness, nutrition, and lifestyle creators.\n- Simplified subscription flow and content discovery for users.`,
    outcomes: [
    '2500+ content creators and a community of 50k users within the first year',
    'Product advanced from MVP to Creators Fit, expanding to new markets',
    'Strong product-market fit and scalable engagement through design system and user feedback',
    'Brand recognized as a one-stop tool for Brazilian content creators in multiple industries'
    ],
    improvements: `Learnings:\n- Building a product from scratch with full market launch required close relationships with pilot customers and constant iteration.\n- Success in this space comes from balancing clean design, strong value proposition, and a high-quality design system.\n- Working with sensitive topics (e.g., sensuality) revealed that community management needs are similar across industries.\n- Product-market fit and scalable growth are achieved through deep user research, rapid prototyping, and responsive UI development.\n\nResult numbers to be added here later.`
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

    // Process
    if (caseStudy.process) {
    caseStudyHtml += `<h3 class="case-study-title">Our Process</h3><p class="body-text secondary-text mb-8">${caseStudy.process.replace(/\n/g, '<br>')}</p>`;
}

    // Solutions & Designs
    if (caseStudy.solutions) {
    caseStudyHtml += `<h3 class="case-study-title">Design & Solutions</h3><p class="body-text secondary-text mb-8">${caseStudy.solutions.replace(/\n/g, '<br>')}</p>`;
}

    if (projectData.designs) {
    caseStudyHtml += `
                            <div class="grid md:grid-cols-2 gap-8 mb-8">
                                ${projectData.designs.map(design => `
                                    <div class="text-center">
                                        <img src="${design.src}" alt="${design.caption}" class="w-full h-auto rounded-lg mb-2"  onerror="this.src='https://placehold.co/1200x800/1e1e1e/d3d3d3?text=Image+Error'">
                                        <p class="secondary-text text-sm">${design.caption}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `;
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
