import { TranscriptChunk } from '../types';

export interface EpisodeMetadata {
  id: string;
  episodeNumber: number;
  title: string;
  guest: string;
  guestRole: string;
  duration: string;
  topics: string[];
  summary: string;
}

export const EPISODES: EpisodeMetadata[] = [
  {
    id: 'ep-124',
    episodeNumber: 124,
    title: 'Brian Chesky on Founder Mode, ditching traditional PM, and designing Airbnb',
    guest: 'Brian Chesky',
    guestRole: 'Co-founder & CEO of Airbnb',
    duration: '1h 48m',
    topics: ['Founder Mode', 'Product Management', 'Design Leadership', 'Orchestration'],
    summary: 'Brian explains why Airbnb eliminated classic divisional product management, how Founder Mode works, and why executives must stay in the details of the product.'
  },
  {
    id: 'ep-89',
    episodeNumber: 89,
    title: 'Shreyas Doshi on the LNO Framework, PM Archetypes, and High-Agency Careers',
    guest: 'Shreyas Doshi',
    guestRole: 'Ex-Product Lead at Stripe, Twitter, Yahoo',
    duration: '1h 35m',
    topics: ['LNO Framework', 'Time Management', 'Product Sense', 'Career Strategy'],
    summary: 'Shreyas breaks down the LNO framework (Leverage, Neutral, Overhead tasks) to prevent burnout, and how top PMs move from reactive execution to high-leverage strategic thinking.'
  },
  {
    id: 'ep-102',
    episodeNumber: 102,
    title: 'Elena Verna on B2B Product-Led Growth, Product Loops, and Virality',
    guest: 'Elena Verna',
    guestRole: 'Head of Growth at Dropbox, Amplitude, Miro advisor',
    duration: '1h 22m',
    topics: ['PLG', 'Growth Loops', 'Pricing & Packaging', 'Retention'],
    summary: 'Elena reveals why funnels are dead, how self-reinforcing acquisition and retention loops drive enterprise growth, and when to layer sales on top of product-led motions.'
  },
  {
    id: 'ep-77',
    episodeNumber: 77,
    title: 'Gustaf Alströmer on How to Measure Product-Market Fit and Retention Curves',
    guest: 'Gustaf Alströmer',
    guestRole: 'Group Partner at Y Combinator, Ex-Head of Growth at Airbnb',
    duration: '1h 14m',
    topics: ['Retention Curves', 'Product-Market Fit', 'Cohort Analysis', 'YC Benchmarks'],
    summary: 'Gustaf explains why cohort retention curves that flatten parallel to the x-axis are the only true proof of PMF, and how founders fool themselves with vanity metrics.'
  },
  {
    id: 'ep-65',
    episodeNumber: 65,
    title: 'Marty Cagan on Feature Factories vs. Empowered Product Teams',
    guest: 'Marty Cagan',
    guestRole: 'Founder of Silicon Valley Product Group (SVPG)',
    duration: '1h 29m',
    topics: ['Empowered Teams', 'Feature Factory', 'Product Discovery', 'Tech Leadership'],
    summary: 'Marty highlights the difference between feature factories where PMs take orders from stakeholders versus truly empowered product teams given problems to solve.'
  },
  {
    id: 'ep-118',
    episodeNumber: 118,
    title: 'Sean Ellis on The 40% PMF Rule and the ICE Prioritization Matrix',
    guest: 'Sean Ellis',
    guestRole: 'Author of Hacking Growth, Former Growth at Dropbox & Eventbrite',
    duration: '1h 12m',
    topics: ['ICE Scoring', 'PMF Survey', 'Growth Hacking', 'Experimentation Cadence'],
    summary: 'Sean breaks down the canonical survey question ("How disappointed would you be without this product?") where 40%+ "Very Disappointed" indicates product-market fit.'
  },
  {
    id: 'ep-95',
    episodeNumber: 95,
    title: 'April Dunford on Radical Positioning and Ditching the Competitor Matrix',
    guest: 'April Dunford',
    guestRole: 'Author of Obviously Awesome, Positioning Expert',
    duration: '1h 05m',
    topics: ['Positioning', 'Sales Pitch', 'Competitive Differentiation', 'Enterprise Messaging'],
    summary: 'April outlines the five components of effective positioning and why standard 2x2 competitive quadrants confuse customers rather than clarify value.'
  },
  {
    id: 'ep-110',
    episodeNumber: 110,
    title: 'Lenny Rachitsky on Benchmark Retention Rates and Good vs. Great Growth',
    guest: 'Lenny Rachitsky',
    guestRole: 'Host of Lenny’s Podcast, Former Growth PM at Airbnb',
    duration: '58m',
    topics: ['Retention Benchmarks', 'Consumer vs B2B', 'Churn Rates', 'Growth Loops'],
    summary: 'Lenny summarizes data from over 100 high-growth companies detailing benchmark retention rates for B2B SaaS, consumer apps, marketplaces, and social networks.'
  }
];

export const TRANSCRIPT_CHUNKS: TranscriptChunk[] = [
  {
    id: 'chunk-chesky-1',
    episodeId: 'ep-124',
    episodeNumber: 124,
    episodeTitle: 'Brian Chesky on Founder Mode and Airbnb PM Strategy',
    guest: 'Brian Chesky',
    guestRole: 'Co-founder & CEO of Airbnb',
    timestamp: '14:20',
    content: 'When we hit the crisis in 2020, we realized the company had become completely fragmented. We had product managers operating like mini-CEOs of tiny fiefdoms, pulling the app in twenty different directions. I made the radical decision to get rid of the traditional product management function. We combined product management with product marketing. We said: you cannot build a feature if you cannot explain how to sell it and why customers care. We centralized roadmaps so that every single release is part of a cohesive shared release twice a year.',
    keyTakeaway: 'Eliminate mini-CEO product managers; merge PM with Product Marketing to ensure cohesive customer value.',
    tags: ['founder mode', 'product management', 'airbnb', 'roadmaps', 'centralization', 'organization']
  },
  {
    id: 'chunk-chesky-2',
    episodeId: 'ep-124',
    episodeNumber: 124,
    episodeTitle: 'Brian Chesky on Founder Mode and Airbnb PM Strategy',
    guest: 'Brian Chesky',
    guestRole: 'Co-founder & CEO of Airbnb',
    timestamp: '32:45',
    content: 'Founder Mode is fundamentally about rejecting the conventional wisdom that as you scale, you must simply delegate everything and manage through spreadsheets and OKRs. Traditional professional management tells you: hire good people and let them do their job. But if you are totally disconnected from the details of the product, quality decays. In Founder Mode, you dive directly into the design, the pixels, the copy, and the user flows. You are an orchestrator across every single discipline.',
    keyTakeaway: 'Founder Mode rejects blind delegation in favor of deep immersion in product quality and cross-functional orchestration.',
    tags: ['founder mode', 'delegation', 'leadership', 'craft', 'design', 'management']
  },
  {
    id: 'chunk-doshi-1',
    episodeId: 'ep-89',
    episodeNumber: 89,
    episodeTitle: 'Shreyas Doshi on the LNO Framework and High-Agency Careers',
    guest: 'Shreyas Doshi',
    guestRole: 'Ex-Product Lead at Stripe, Twitter, Yahoo',
    timestamp: '18:10',
    content: 'The LNO framework divides all work into three categories: Leverage tasks (L), Neutral tasks (N), and Overhead tasks (O). Leverage tasks are those where an extraordinary output creates a 10x or 100x return—such as defining product vision, pricing model, or high-stakes architecture. Neutral tasks have a 1x return where doing an okay job is sufficient. Overhead tasks have negligible leverage. The mistake most PMs make is treating all tasks with the same perfectionism. You should do Overhead work quickly and imperfectly so you preserve mental bandwidth for Leverage work.',
    keyTakeaway: 'Categorize work into Leverage (10x), Neutral (1x), and Overhead (<1x) to prevent burnout and maximize leverage.',
    tags: ['lno framework', 'productivity', 'time management', 'prioritization', 'leverage', 'shreyas doshi']
  },
  {
    id: 'chunk-doshi-2',
    episodeId: 'ep-89',
    episodeNumber: 89,
    episodeTitle: 'Shreyas Doshi on the LNO Framework and High-Agency Careers',
    guest: 'Shreyas Doshi',
    guestRole: 'Ex-Product Lead at Stripe, Twitter, Yahoo',
    timestamp: '44:15',
    content: 'Good PMs are masters of execution: they write great specs, run smooth standups, and ship on time. Great PMs possess product sense and strategic empathy. They understand the second and third-order consequences of decisions. They do not just ask users what they want; they understand the unspoken anxieties, cognitive load, and status incentives that drive user adoption.',
    keyTakeaway: 'Good PMs execute smoothly; great PMs anticipate second-order psychological and strategic consequences.',
    tags: ['product sense', 'good vs great pm', 'strategy', 'psychology', 'career growth']
  },
  {
    id: 'chunk-verna-1',
    episodeId: 'ep-102',
    episodeNumber: 102,
    episodeTitle: 'Elena Verna on B2B Product-Led Growth and Loops',
    guest: 'Elena Verna',
    guestRole: 'Head of Growth at Dropbox, Amplitude, Miro advisor',
    timestamp: '22:05',
    content: 'Linear marketing funnels are dead because acquisition costs continuously compound over time. In Product-Led Growth (PLG), your product itself must be the engine that acquires, activates, and retains users. A loop means that one cohort of users taking an action directly generates the next cohort. For example, in Miro or Figma, inviting a collaborator to a board creates a brand-new active user without any ad spend.',
    keyTakeaway: 'Replace linear funnels with self-sustaining growth loops where user engagement organically recruits the next cohort.',
    tags: ['plg', 'growth loops', 'virality', 'retention', 'b2b', 'elena verna']
  },
  {
    id: 'chunk-verna-2',
    episodeId: 'ep-102',
    episodeNumber: 102,
    episodeTitle: 'Elena Verna on B2B Product-Led Growth and Loops',
    guest: 'Elena Verna',
    guestRole: 'Head of Growth at Dropbox, Amplitude, Miro advisor',
    timestamp: '51:30',
    content: 'The most dangerous trap in PLG is confusing top-of-funnel signups with Product-Market Fit. If your users sign up, play for three days, and never return, you have a leaking bucket. True product-led monetization only occurs when the value realization happens before the paywall. Deliver the "aha" moment first, let them experience the habit loop, and only gate administrative, security, or enterprise team features.',
    keyTakeaway: 'Deliver value before monetization; gating features before the "aha" moment destroys PLG loops.',
    tags: ['paywall', 'monetization', 'aha moment', 'activation', 'retention']
  },
  {
    id: 'chunk-alstromer-1',
    episodeId: 'ep-77',
    episodeNumber: 77,
    episodeTitle: 'Gustaf Alströmer on PMF and Retention Curves',
    guest: 'Gustaf Alströmer',
    guestRole: 'Group Partner at Y Combinator, Ex-Head of Growth at Airbnb',
    timestamp: '12:40',
    content: 'At Y Combinator, whenever a founder presents their growth chart showing revenue going up and to the right, we immediately ask for their cohort retention curve. If the curve trends downward towards zero over 60 or 90 days, the company does not have Product-Market Fit. You are simply spending money or energy to fill a leaky bucket. Product-Market Fit is demonstrated when that curve flattens out and stays flat parallel to the x-axis forever.',
    keyTakeaway: 'A retention curve flattening parallel to the x-axis is the only objective mathematical proof of PMF.',
    tags: ['retention curves', 'product market fit', 'pmf', 'yc', 'cohort analysis', 'churn']
  },
  {
    id: 'chunk-cagan-1',
    episodeId: 'ep-65',
    episodeNumber: 65,
    episodeTitle: 'Marty Cagan on Feature Factories vs. Empowered Teams',
    guest: 'Marty Cagan',
    guestRole: 'Founder of Silicon Valley Product Group',
    timestamp: '19:50',
    content: 'In a feature factory, the business hands the product team a roadmap of features to build, and the PM acts as a project manager tracking dates and tickets. In an empowered product team, leadership provides the team with a business problem to solve—such as decreasing churn in onboarding from 30% to 15%—and the cross-functional team (PM, designer, engineers) is entrusted to discover and ship the best solution.',
    keyTakeaway: 'Give teams problems to solve and metrics to move, rather than feature roadmaps to blindly execute.',
    tags: ['feature factory', 'empowered teams', 'marty cagan', 'product discovery', 'leadership']
  },
  {
    id: 'chunk-ellis-1',
    episodeId: 'ep-118',
    episodeNumber: 118,
    episodeTitle: 'Sean Ellis on The 40% PMF Rule and ICE Prioritization',
    guest: 'Sean Ellis',
    guestRole: 'Author of Hacking Growth, Former Growth at Dropbox',
    timestamp: '15:15',
    content: 'The Sean Ellis PMF test asks existing users: "How would you feel if you could no longer use this product?" Options: Very Disappointed, Somewhat Disappointed, or Not Disappointed. Across hundreds of startups analyzed, companies that hit 40% or higher answering "Very Disappointed" almost invariably unlock sustainable scale. Below 40%, marketing investments are usually wasted because the core value proposition is still blurry.',
    keyTakeaway: '40%+ of users answering "Very Disappointed" on the survey signals strong product-market fit.',
    tags: ['sean ellis', 'pmf survey', '40 percent rule', 'growth', 'product market fit']
  },
  {
    id: 'chunk-ellis-2',
    episodeId: 'ep-118',
    episodeNumber: 118,
    episodeTitle: 'Sean Ellis on The 40% PMF Rule and ICE Prioritization',
    guest: 'Sean Ellis',
    guestRole: 'Author of Hacking Growth, Former Growth at Dropbox',
    timestamp: '38:00',
    content: 'The ICE scoring model evaluates growth and product experiments across three dimensions on a 1 to 10 scale: Impact (how much will this move the needle?), Confidence (how sure are we based on prior evidence?), and Ease (how simple is it to build and test?). Multiply or average the scores to prioritize experiments that offer high potential upside with low engineering friction.',
    keyTakeaway: 'Use ICE (Impact, Confidence, Ease) scoring to objectively prioritize growth experiments.',
    tags: ['ice matrix', 'prioritization', 'experimentation', 'growth hacking', 'scoring']
  },
  {
    id: 'chunk-dunford-1',
    episodeId: 'ep-95',
    episodeNumber: 95,
    episodeTitle: 'April Dunford on Radical Positioning',
    guest: 'April Dunford',
    guestRole: 'Author of Obviously Awesome, Positioning Expert',
    timestamp: '21:30',
    content: 'Positioning is not messaging, and it is not your tagline. Positioning is the context in which your product makes the most sense. If you describe yourself as an "email client", customers instantly compare you to Gmail and Superhuman. If you reposition as an "asynchronous executive briefing dashboard", the entire willingness to pay and evaluation criteria shift in your favor.',
    keyTakeaway: 'Positioning sets the cognitive context and competitors against which customers evaluate your product.',
    tags: ['positioning', 'marketing', 'messaging', 'differentiation', 'april dunford']
  },
  {
    id: 'chunk-rachitsky-1',
    episodeId: 'ep-110',
    episodeNumber: 110,
    episodeTitle: 'Lenny Rachitsky on Benchmark Retention Rates',
    guest: 'Lenny Rachitsky',
    guestRole: 'Host of Lenny’s Podcast, Former Growth PM at Airbnb',
    timestamp: '16:45',
    content: 'After studying dozens of benchmark reports: For B2B Enterprise SaaS, good net revenue retention (NRR) is 110% to 120%, and great is 130%+. For consumer social apps, good 30-day user retention is 25% and great is 40%+. For consumer marketplaces, good annual cohort retention is 30% and great is 50%+. Knowing your specific category benchmark prevents you from either over-optimizing too early or celebrating false positives.',
    keyTakeaway: 'Know your category benchmark: B2B Enterprise requires 110-130% NRR, whereas consumer social targets 25-40% 30-day retention.',
    tags: ['retention benchmarks', 'nrr', 'b2b saas', 'metrics', 'lenny rachitsky']
  }
];