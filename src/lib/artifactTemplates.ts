import { Artifact } from '../types';

export function getIceScoreCalculatorArtifact(): Artifact {
  return {
    id: 'art-ice-calculator',
    title: 'Interactive ICE Experiment Prioritization Matrix',
    type: 'html',
    description: 'Calculate Impact, Confidence, and Ease scores dynamically for your growth roadmap.',
    language: 'html',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    input[type=range] { accent-color: #d97706; }
  </style>
</head>
<body class="p-6 bg-stone-900 text-stone-100 min-h-screen">
  <div class="max-w-xl mx-auto bg-stone-800 border border-stone-700 rounded-xl p-6 shadow-2xl">
    <div class="flex items-center justify-between border-b border-stone-700 pb-4 mb-5">
      <div>
        <h2 class="text-xl font-bold text-amber-400">Sean Ellis ICE Calculator</h2>
        <p class="text-xs text-stone-400">Prioritize growth tests by Impact, Confidence & Ease</p>
      </div>
      <div class="text-right">
        <span class="text-xs uppercase tracking-wider text-stone-400">Total ICE Score</span>
        <div id="totalScore" class="text-4xl font-extrabold text-amber-400">6.7</div>
      </div>
    </div>

    <div class="space-y-5">
      <div>
        <div class="flex justify-between text-sm mb-1">
          <label class="font-medium">Impact (1 = Minor, 10 = Game Changer)</label>
          <span id="valImpact" class="font-bold text-amber-400">7</span>
        </div>
        <input type="range" id="inpImpact" min="1" max="10" value="7" class="w-full h-2 bg-stone-700 rounded-lg cursor-pointer">
      </div>

      <div>
        <div class="flex justify-between text-sm mb-1">
          <label class="font-medium">Confidence (1 = Guess, 10 = Proven Data)</label>
          <span id="valConfidence" class="font-bold text-amber-400">6</span>
        </div>
        <input type="range" id="inpConfidence" min="1" max="10" value="6" class="w-full h-2 bg-stone-700 rounded-lg cursor-pointer">
      </div>

      <div>
        <div class="flex justify-between text-sm mb-1">
          <label class="font-medium">Ease of Execution (1 = Multi-Month, 10 = 1 Day)</label>
          <span id="valEase" class="font-bold text-amber-400">7</span>
        </div>
        <input type="range" id="inpEase" min="1" max="10" value="7" class="w-full h-2 bg-stone-700 rounded-lg cursor-pointer">
      </div>
    </div>

    <div class="mt-6 pt-5 border-t border-stone-700/80">
      <h4 class="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Recommendation:</h4>
      <div id="recText" class="text-sm bg-stone-900/80 p-3 rounded-lg border border-stone-700 text-stone-300">
        High priority candidate. High ease and solid impact justify scheduling this experiment into the upcoming sprint.
      </div>
    </div>
  </div>

  <script>
    const iI = document.getElementById('inpImpact');
    const iC = document.getElementById('inpConfidence');
    const iE = document.getElementById('inpEase');
    const vI = document.getElementById('valImpact');
    const vC = document.getElementById('valConfidence');
    const vE = document.getElementById('valEase');
    const score = document.getElementById('totalScore');
    const rec = document.getElementById('recText');

    function update() {
      const imp = parseFloat(iI.value);
      const conf = parseFloat(iC.value);
      const ease = parseFloat(iE.value);
      vI.innerText = imp;
      vC.innerText = conf;
      vE.innerText = ease;
      const avg = ((imp + conf + ease) / 3).toFixed(1);
      score.innerText = avg;

      if (avg >= 7.5) {
        rec.innerText = "🚀 Tier 1 Priority: High upside with low friction. Deploy this experiment immediately.";
      } else if (avg >= 5.5) {
        rec.innerText = "⚖️ Tier 2 Candidate: Solid potential. Refine hypothesis or validate ease before building.";
      } else {
        rec.innerText = "🛑 Low Leverage: Impact too low or engineering cost too high. Deprioritize or simplify scope.";
      }
    }

    iI.addEventListener('input', update);
    iC.addEventListener('input', update);
    iE.addEventListener('input', update);
    update();
  </script>
</body>
</html>`
  };
}

export function getLnoMatrixArtifact(): Artifact {
  return {
    id: 'art-lno-matrix',
    title: 'Shreyas Doshi LNO Task Matrix',
    type: 'html',
    description: 'Interactive planner to audit and categorize your weekly tasks into Leverage, Neutral, and Overhead.',
    language: 'html',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  </style>
</head>
<body class="p-6 bg-stone-900 text-stone-100 min-h-screen">
  <div class="max-w-2xl mx-auto">
    <div class="mb-5 text-center">
      <h2 class="text-2xl font-bold text-amber-400">Shreyas Doshi LNO Work Planner</h2>
      <p class="text-sm text-stone-400">Protect cognitive bandwidth for 10x leverage tasks</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-emerald-950/40 border border-emerald-700/60 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">L - Leverage (10x)</span>
          <span class="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">High Polish</span>
        </div>
        <p class="text-xs text-stone-300 mb-3">Tasks where extraordinary output yields disproportionate returns.</p>
        <ul class="text-xs space-y-2 text-stone-200">
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Defining 1-Year Strategy</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Pricing & Packaging Model</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Hiring Key Principal Lead</li>
        </ul>
      </div>

      <div class="bg-amber-950/40 border border-amber-700/60 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400">N - Neutral (1x)</span>
          <span class="text-xs bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded">Good Enough</span>
        </div>
        <p class="text-xs text-stone-300 mb-3">Tasks with linear returns where decent quality is sufficient.</p>
        <ul class="text-xs space-y-2 text-stone-200">
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Weekly Sprint Reviews</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Bug Triage Meetings</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Stakeholder Status Email</li>
        </ul>
      </div>

      <div class="bg-rose-950/40 border border-rose-700/60 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-rose-400">O - Overhead (<1x)</span>
          <span class="text-xs bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded">Ship Fast & Flawed</span>
        </div>
        <p class="text-xs text-stone-300 mb-3">Necessary chores. Strive to execute imperfectly to save energy.</p>
        <ul class="text-xs space-y-2 text-stone-200">
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Expense Reports</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Routine Calendar Invites</li>
          <li class="p-2 bg-stone-800/80 rounded border border-stone-700">Standard Form Filings</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>`
  };
}

export function getRetentionCurveArtifact(): Artifact {
  return {
    id: 'art-retention-curve',
    title: 'Gustaf Alströmer Retention Curve Analyzer',
    type: 'html',
    description: 'Visualize the difference between a leaky bucket and true product-market fit.',
    language: 'html',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="p-6 bg-stone-900 text-stone-100 min-h-screen">
  <div class="max-w-xl mx-auto bg-stone-800 border border-stone-700 rounded-xl p-6">
    <h2 class="text-lg font-bold text-amber-400 mb-1">Cohort Retention Curves (YC PMF Rule)</h2>
    <p class="text-xs text-stone-400 mb-4">A flat tail parallel to the X-axis indicates true Product-Market Fit.</p>
    <div class="bg-stone-900 p-3 rounded-lg border border-stone-700 mb-4">
      <canvas id="retentionChart" height="200"></canvas>
    </div>
    <div class="grid grid-cols-2 gap-3 text-xs">
      <div class="p-2 bg-emerald-950/40 border border-emerald-800 rounded">
        <span class="font-bold text-emerald-400">Green Curve (True PMF):</span>
        <p class="text-stone-300 mt-1">Flattens at ~40% at Day 30+. Users have formed an ongoing retention habit.</p>
      </div>
      <div class="p-2 bg-rose-950/40 border border-rose-800 rounded">
        <span class="font-bold text-rose-400">Red Curve (Leaky Bucket):</span>
        <p class="text-stone-300 mt-1">Decays toward zero. Adding top-of-funnel traffic will waste marketing budget.</p>
      </div>
    </div>
  </div>
  <script>
    const ctx = document.getElementById('retentionChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 7', 'Day 14', 'Day 30', 'Day 60', 'Day 90'],
        datasets: [
          {
            label: 'With PMF (Flat Tail)',
            data: [100, 62, 48, 42, 41, 40],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'No PMF (Leaky Bucket)',
            data: [100, 40, 22, 10, 4, 1],
            borderColor: '#f43f5e',
            borderDash: [5, 5],
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#d6d3d1', font: { size: 11 } } } },
        scales: {
          y: { min: 0, max: 100, ticks: { color: '#a8a29e', callback: v => v + '%' }, grid: { color: '#44403c' } },
          x: { ticks: { color: '#a8a29e' }, grid: { color: '#44403c' } }
        }
      }
    });
  </script>
</body>
</html>`
  };
}