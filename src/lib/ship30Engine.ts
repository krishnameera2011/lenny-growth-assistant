import { TranscriptChunk } from '../types';

export interface Ship30Essay {
  title: string;
  hook: string;
  oneIdea: string;
  pillars: {
    heading: string;
    explanation: string;
    actionableTip: string;
  }[];
  conclusion: string;
  wordCount: number;
}

/**
 * Transforms grounded transcript insights into a high-leverage "Ship 30 for 30" Atomic Essay.
 * Follows Nicolas Cole's framework:
 * 1. An eye-catching hook (Counterintuitive claim or strong problem statement)
 * 2. 1 Single Big Idea
 * 3. 3 Core Pillars with Action Steps
 * 4. 1 Punchy, memorable closing sentence
 */
export function generateShip30Essay(chunks: TranscriptChunk[]): Ship30Essay {
  if (chunks.length === 0) {
    return {
      title: 'The Modern Product Trap: Why Doing More Delivers Less',
      hook: '90% of product roadmaps are just glorified wishlists designed to make executives feel in control.',
      oneIdea: 'Great product teams do not execute tasks; they move uncomfortably close to the customer problem.',
      pillars: [
        {
          heading: '1. Kill the Feature Factory',
          explanation: 'Stop measuring velocity by how many Jira tickets get shipped. Measure by the needle moved.',
          actionableTip: 'Audit your current sprint: How many items directly reduce user churn?'
        },
        {
          heading: '2. Protect High-Leverage Bandwidth',
          explanation: 'Treat operational meetings as tax. Spend 80% of your cognitive energy on leverage points.',
          actionableTip: 'Block 2 hours of unscheduled thinking time every Tuesday and Thursday morning.'
        },
        {
          heading: '3. Verify Retention Before Scaling',
          explanation: 'Pouring ad spend into a leaky bucket is startup suicide. Flatten the retention curve first.',
          actionableTip: 'Calculate your Day 30 cohort retention before hiring your next sales rep.'
        }
      ],
      conclusion: 'If you want to build enduring products, stop asking what to build next. Ask what you must stop doing today.',
      wordCount: 220
    };
  }

  const primary = chunks[0];
  const guest = primary.guest;

  let title = `${guest}'s Playbook: The One Rule Top 1% Builders Never Break`;
  let hook = `Most companies fail not because they build too slowly, but because they build the wrong things with extreme precision.`;
  let oneIdea = `${guest} proved that exceptional product craft comes from extreme focus and ruthless elimination of fluff.`;

  if (primary.tags.includes('founder mode')) {
    title = `Brian Chesky’s "Founder Mode": The Death of Conventional PM Wisdom`;
    hook = `Conventional management tells you to hire people and get out of the way. Brian Chesky discovered that doing so almost killed Airbnb.`;
    oneIdea = `True leadership is not spreadsheet delegation—it is deep immersion in the details of the product craft.`;
  } else if (primary.tags.includes('lno framework')) {
    title = `Shreyas Doshi’s LNO Framework: How High-Agency PMs Escape Burnout`;
    hook = `You are not burned out from working too many hours. You are burned out from spending 10x energy on 1x tasks.`;
    oneIdea = `Categorize every task into Leverage, Neutral, or Overhead—and intentionally do Overhead work imperfectly.`;
  } else if (primary.tags.includes('plg') || primary.tags.includes('growth loops')) {
    title = `Elena Verna’s Growth Secret: Why Traditional Funnels Are Dead`;
    hook = `Every dollar you spend on top-of-funnel acquisition is getting more expensive by the month.`;
    oneIdea = `Stop building linear marketing funnels. Build self-sustaining product loops where usage creates the next user.`;
  } else if (primary.tags.includes('retention curves') || primary.tags.includes('pmf')) {
    title = `The Only PMF Metric That Matters (From YC Partner Gustaf Alströmer)`;
    hook = `Revenue going up and to the right can be a complete illusion if your cohort retention curve is heading toward zero.`;
    oneIdea = `Product-Market Fit has one objective mathematical signature: a cohort curve that flattens parallel to the x-axis.`;
  }

  const pillars = [
    {
      heading: `1. The Counter-Intuitive Truth`,
      explanation: primary.content.slice(0, 180) + '...',
      actionableTip: `Key rule from ${guest}: "${primary.keyTakeaway}"`
    },
    {
      heading: `2. The Operational Shift`,
      explanation: `Top-tier operators discard vanity metrics and align their entire calendar around one high-leverage lever at a time.`,
      actionableTip: `Identify the single lowest-converting step in your user journey and fix it before adding new features.`
    },
    {
      heading: `3. The Long-Term Compounding Loop`,
      explanation: `Consistent small gains compounded across cohorts generate an insurmountable moat against copycat competitors.`,
      actionableTip: `Measure your cohort retention at Day 14, 30, and 60 to verify your product loop is actually holding.`
    }
  ];

  const conclusion = `The difference between average builders and elite founders isn't intelligence. It's the courage to ignore conventional playbooks and obsess over the actual user experience.`;

  const totalWords = (title + hook + oneIdea + pillars.map(p => p.heading + p.explanation + p.actionableTip).join(' ') + conclusion).split(/\s+/).length;

  return {
    title,
    hook,
    oneIdea,
    pillars,
    conclusion,
    wordCount: totalWords
  };
}

export function formatEssayAsMarkdown(essay: Ship30Essay): string {
  return `### ✍️ **${essay.title}**
*(Ship 30 for 30 Atomic Essay • ~${essay.wordCount} words)*

---

**🪝 The Hook:**  
*${essay.hook}*

**💡 The 1 Big Idea:**  
${essay.oneIdea}

---

${essay.pillars.map(p => `#### **${p.heading}**\n${p.explanation}\n\n👉 **Action Step:** ${p.actionableTip}`).join('\n\n')}

---

**🎯 The Takeaway:**  
*${essay.conclusion}*`;
}