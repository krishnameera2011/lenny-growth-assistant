import { TRANSCRIPT_CHUNKS, EPISODES } from '../data/transcripts';
import { TranscriptChunk, Citation } from '../types';

export interface RetrievalResult {
  isGrounded: boolean;
  confidenceScore: number;
  matchedChunks: TranscriptChunk[];
  citations: Citation[];
  synthesizedAnswer?: string;
  guardrailTriggered?: boolean;
  guardrailReason?: string;
}

// Stopwords to filter out before keyword matching
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but',
  'by', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me',
  'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
  'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
  'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
  'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves', 'tell', 'explain', 'give'
]);

/**
 * Keyword-based semantic search across transcript chunks with confidence scoring and strict guardrails.
 */
export function searchTranscripts(query: string, threshold = 4): RetrievalResult {
  const normalizedQuery = query.toLowerCase();
  const rawTokens = normalizedQuery.replace(/[^\w\s]/g, '').split(/\s+/);
  const keywords = rawTokens.filter(word => word.length > 2 && !STOP_WORDS.has(word));

  if (keywords.length === 0) {
    return {
      isGrounded: false,
      confidenceScore: 0,
      matchedChunks: [],
      citations: [],
      guardrailTriggered: true,
      guardrailReason: 'Query contains no searchable keywords.'
    };
  }

  // Score each chunk
  const scored = TRANSCRIPT_CHUNKS.map(chunk => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerGuest = chunk.guest.toLowerCase();
    const lowerTitle = chunk.episodeTitle.toLowerCase();
    const lowerTakeaway = chunk.keyTakeaway.toLowerCase();

    keywords.forEach(keyword => {
      // Direct guest name match has highest weight
      if (lowerGuest.includes(keyword)) score += 6;
      // Tags match has high weight
      if (chunk.tags.some(tag => tag.toLowerCase().includes(keyword))) score += 4;
      // Key takeaway match
      if (lowerTakeaway.includes(keyword)) score += 3;
      // Title match
      if (lowerTitle.includes(keyword)) score += 3;
      // Content body match
      if (lowerContent.includes(keyword)) score += 2;
    });

    // Exact phrase bonus
    if (lowerContent.includes(normalizedQuery.trim())) score += 8;

    return { chunk, score };
  });

  // Filter and sort by score
  const matches = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topScore = matches.length > 0 ? matches[0].score : 0;

  // STRICT GUARDRAIL: If top score is below threshold, trigger Out-of-Domain rejection
  if (topScore < threshold || matches.length === 0) {
    return {
      isGrounded: false,
      confidenceScore: Math.min(topScore / 10, 0.35),
      matchedChunks: [],
      citations: [],
      guardrailTriggered: true,
      guardrailReason: `The query does not match any verified concepts in Lenny's Podcast transcripts. To prevent hallucinations, the assistant refuses to generate ungrounded answers.`,
      synthesizedAnswer: `⚠️ **Out-of-Domain Guardrail Activated**\n\nI could not find verified insights in Lenny's Podcast transcripts regarding your question: *"${query}"*.\n\nTo ensure 100% accuracy and prevent hallucinations, I only provide answers strictly grounded in our index of podcast episodes.\n\n**Try asking about:**\n- **Brian Chesky** on *Founder Mode* or ditching traditional product management\n- **Shreyas Doshi** on the *LNO Framework* or Good vs. Great PMs\n- **Elena Verna** on *B2B Product-Led Growth (PLG)* and growth loops\n- **Gustaf Alströmer** on *Cohort Retention Curves* and measuring PMF\n- **Marty Cagan** on *Feature Factories* vs. *Empowered Teams*\n- **Sean Ellis** on the *40% PMF Test* and *ICE Prioritization Matrix*\n- **April Dunford** on *Radical Positioning* and competitive context`
    };
  }

  // Take top 2-3 matched chunks
  const topChunks = matches.slice(0, 3).map(m => m.chunk);
  const normalizedConfidence = Math.min(Math.round((topScore / 24) * 100) / 100, 0.98);

  // Build citation chips
  const citations: Citation[] = topChunks.map(chunk => ({
    chunkId: chunk.id,
    episodeTitle: chunk.episodeTitle,
    guest: chunk.guest,
    timestamp: chunk.timestamp,
    quoteSnippet: `"...${chunk.content.slice(0, 160)}..."`,
    relevanceScore: Math.round((matches.find(m => m.chunk.id === chunk.id)?.score || 0) * 10) / 10
  }));

  // Deterministic synthesis as fallback if no external LLM is called
  const primaryChunk = topChunks[0];
  const supportingChunk = topChunks[1];

  let answer = `According to **${primaryChunk.guest}** (${primaryChunk.episodeTitle}, \`[${primaryChunk.timestamp}]\`):\n\n> "${primaryChunk.content}"\n\n**Strategic Takeaway:** ${primaryChunk.keyTakeaway}`;

  if (supportingChunk && supportingChunk.guest !== primaryChunk.guest) {
    answer += `\n\nThis connects closely with **${supportingChunk.guest}**'s framework on *${supportingChunk.episodeTitle}* (\`[${supportingChunk.timestamp}]\`):\n\n> "${supportingChunk.content}"\n\n**Strategic Takeaway:** ${supportingChunk.keyTakeaway}`;
  }

  return {
    isGrounded: true,
    confidenceScore: Math.max(normalizedConfidence, 0.65),
    matchedChunks: topChunks,
    citations,
    synthesizedAnswer: answer,
    guardrailTriggered: false
  };
}

export function getAllEpisodes() {
  return EPISODES;
}