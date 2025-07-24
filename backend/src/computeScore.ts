const allTraits = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];

export function computeScore(
  jobTraitRanking: string[],
  applicantTraitRanking: string[]
): number {
  let score = 0;

  for (const trait of allTraits) {
    const jobIndex = jobTraitRanking.indexOf(trait);
    const applicantIndex = applicantTraitRanking.indexOf(trait);

    if (jobIndex !== -1 && applicantIndex !== -1) {
      const diff = Math.abs(jobIndex - applicantIndex);
      
      score += (allTraits.length - diff); // Higher score for smaller differences
    }
  }

  return score;
}