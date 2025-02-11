// Define project details manually
const projects = [
    {
      name: "Project One",
      description: "This is a short description of Project One.",
      image: "https://via.placeholder.com/400x300?text=Project+One",
      link: "https://example.com/project-one",
      contributors: [
        "https://avatars.githubusercontent.com/u/1?v=4",
        "https://avatars.githubusercontent.com/u/2?v=4",
        "https://avatars.githubusercontent.com/u/3?v=4"
      ]
    },
    {
      name: "Project Two",
      description: "This is a short description of Project Two.",
      image: "https://via.placeholder.com/400x300?text=Project+Two",
      link: "https://example.com/project-two",
      contributors: [
        "https://avatars.githubusercontent.com/u/4?v=4",
        "https://avatars.githubusercontent.com/u/5?v=4"
      ]
    },
    
  ];


// Function to fetch project details from GitHub
async function fetchGitHubProjectDetails(repoUrl) {
  const apiBaseUrl = "https://api.github.com/repos/";
  
  // Extract owner and repo name from the GitHub URL
  const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");

  try {
    // Fetch repository details
    const repoResponse = await fetch(`${apiBaseUrl}${owner}/${repo}`);
    const repoData = await repoResponse.json();

    // Fetch contributors
    const contributorsResponse = await fetch(`${apiBaseUrl}${owner}/${repo}/contributors`);
    const contributorsData = await contributorsResponse.json();

    // Prepare project details
    const projectDetails = {
      name: repoData.name || "Unknown Project",
      description: repoData.description || "No description provided.",
      image: "https://via.placeholder.com/400x300?text=" + encodeURIComponent(repoData.name || "Project"),
      link: repoData.html_url,
      contributors: contributorsData.map(contributor => contributor.avatar_url)
    };

    // Push to projects array
    projects.push(projectDetails);
    console.log(`Project ${repoData.name} added successfully!`);
  } catch (error) {
    console.error("Error fetching project details:", error);
  }
}


  // Function to add project cards
  function addProjectCards() {
    const container = document.getElementById('projects-container');
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
      card.innerHTML = `
        <div class="card project-card" style="background-image: url('${project.image}');">
          <div class="hover-description">
            <div>
              <p>${project.description}</p>
              <a href="${project.link}" target="_blank" class="btn btn-light">Visit Project</a>
            </div>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">${project.name}</h5>
          </div>
          <div class="contributors-section">
            ${project.contributors.length > 0 
              ? project.contributors.map(contributor => `<img src="${contributor}" alt="Contributor">`).join('')
              : '<p class="text-muted">No contributors listed</p>'}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

// Fetch GitHub project details and add them dynamically
fetchGitHubProjectDetails("https://github.com/cetmca26/MCA-Laboratory").then(() => {
  // Add project cards after fetching data
  addProjectCards();
});
  
