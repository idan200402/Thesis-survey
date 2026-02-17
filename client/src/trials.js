import BASE from "./data/questions.json";

// deterministic PRNG (Mulberry32)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickByType(responses, type) {
  const entry = Object.entries(responses).find(([, v]) => v.type === type);
  if (!entry) throw new Error(`Missing response type: ${type}`);
  const [key, value] = entry;
  return { key, ...value }; // { key: "A"|"B"|"C", text, type }
}

/**
 * Build 10 trials from 5 base questions:
 * - pair1: appealing_truth vs appealing_false
 * - pair2: appealing_false vs boring_truth
 * Randomize trial order and option order within each trial.
 */
export function buildTrials(seed = Math.floor(Math.random() * 2 ** 31)) {
  const rand = mulberry32(seed);

  const trials = [];

  for (const q of BASE) {
    const appealingTruth = pickByType(q.responses, "appealing_truth");
    const appealingFalse = pickByType(q.responses, "appealing_false");
    const boringTruth = pickByType(q.responses, "boring_truth");

    trials.push({
      trialId: `${q.id}__AT_vs_AF`,
      baseId: q.id,
      userQuestion: q.userQuestion,
      pairType: "AT_vs_AF",
      options: [
        { optionId: "AT", label: "Option 1", type: "appealing_truth", text: appealingTruth.text },
        { optionId: "AF", label: "Option 2", type: "appealing_false", text: appealingFalse.text }
      ]
    });

    trials.push({
      trialId: `${q.id}__AF_vs_BT`,
      baseId: q.id,
      userQuestion: q.userQuestion,
      pairType: "AF_vs_BT",
      options: [
        { optionId: "AF", label: "Option 1", type: "appealing_false", text: appealingFalse.text },
        { optionId: "BT", label: "Option 2", type: "boring_truth", text: boringTruth.text }
      ]
    });
  }

  // Randomize option order inside each trial (left/right)
  const trialsWithShuffledOptions = trials.map((t) => ({
    ...t,
    options: shuffle(t.options, rand)
  }));

  // Randomize overall trial order
  const randomizedTrials = shuffle(trialsWithShuffledOptions, rand);

  return { seed, trials: randomizedTrials };
}
