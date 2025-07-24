<script>
  export let traits = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];
  
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fixed job trait ranking (can be hardcoded or fetched from server)
  const jobRanking = [...traits];

  // Applicant ranking (mutable by user)
  let applicantRanking = [...traits];
  
  // Swap function for up/down buttons
  function moveUp(index) {
    if (index === 0) return;
    [applicantRanking[index - 1], applicantRanking[index]] = [applicantRanking[index], applicantRanking[index - 1]];
  }

  function moveDown(index) {
    if (index === applicantRanking.length - 1) return;
    [applicantRanking[index + 1], applicantRanking[index]] = [applicantRanking[index], applicantRanking[index + 1]];
  }

  // Submit function for calculating the score
  async function submitRanking() {
    try {
      const response = await fetch(`${apiUrl}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobTraitRanking: jobRanking,
          applicantTraitRanking: applicantRanking
        })
      });

      const result = await response.json();
      alert(`Your compatibility score: ${result.score}`);
    } catch (error) {
      console.error('Failed to submit ranking:', error);
    }
  }
</script>

<h3>Rank the traits:</h3>
<ul>
  {#each applicantRanking as trait, i}
    <li>
      {i + 1}. {trait} 
      <button on:click={() => moveUp(i)}>⬆️</button>
      <button on:click={() => moveDown(i)}>⬇️</button>
    </li>
  {/each}
</ul>

<p>Your ranking: {applicantRanking.join(', ')}</p>

<button on:click={submitRanking}>Submit Ranking</button>