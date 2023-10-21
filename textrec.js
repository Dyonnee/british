let text = '';
let teams = [];

function guessWord() {
    const guess = document.getElementById("guess-input").value.toLowerCase(); // Convert the guess to lowercase
    const occurrences = (text.match(new RegExp(guess, 'g')) || []).length; // Count how many times the guess appears in the text
    const teamIndex = teams.findIndex(team => team.activeTurn);
    
    if (occurrences > 0 && teamIndex !== -1) {
        const score = occurrences * guess.length;
        teams[teamIndex].score += score; // Add the score to the team
        updateTeamsDisplay();
    }
    
    // Clear the guess input
    document.getElementById("guess-input").value = '';
}

function addTeam() {
    const teamName = document.getElementById("team-name").value;
    teams.push({ name: teamName, score: 0, activeTurn: false });
    document.getElementById("team-name").value = '';
    updateTeamsDisplay();
}

function updateTeamsDisplay() {
    const teamsDiv = document.getElementById("teams");
    teamsDiv.innerHTML = '';
    
    teams.forEach(team => {
        const teamElement = document.createElement("div");
        teamElement.textContent = `${team.name} - Score: ${team.score}`;
        teamsDiv.appendChild(teamElement);
    });
    
    // Toggle the active turn for teams
    const teamIndex = teams.findIndex(team => team.activeTurn);
    if (teamIndex !== -1) {
        teams[teamIndex].activeTurn = false;
    }
    if (teamIndex === teams.length - 1) {
        teams[0].activeTurn = true;
    } else {
        teams[teamIndex + 1].activeTurn = true;
    }
}

function seeText() {
    alert("Text: " + text);
}

document.getElementById("text-input").addEventListener("input", function() {
    text = this.value;
});

updateTeamsDisplay();
