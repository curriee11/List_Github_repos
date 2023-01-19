const form = document.getElementById('github-username-form');
const loader = document.getElementById('loader');
const repositoriesContainer = document.getElementById('repositories-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let currentPage = 1;
let totalPages = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the entered username
  const username = document.getElementById('username').value;
  // Validate the entered username
  if (!username) {
    alert("Please enter a valid username");
    return;
  }
  // Show loading spinner and hide other elements
  loader.style.display = "block";
  repositoriesContainer.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";

  // Call the function to fetch the repositories
  getRepositories(username);
});

prevButton.addEventListener('click', () => {
    currentPage--;
    getRepositories(document.getElementById('username').value);
});

nextButton.addEventListener('click', () => {
    currentPage++;
    getRepositories(document.getElementById('username').value);
});

const getRepositories = (username) => {
    // API endpoint to fetch the repositories
    const endpoint = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=10`;
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        totalPages = Math.ceil(data.length / 10);
        renderRepositories(data);
        loader.style.display = "none";
        repositoriesContainer.style.display = "block";
        handlePagination();
      })
      .catch((error) => {
        console.error(error);
        alert("Error occured while fetching the repositories. Please check the entered username and try again.");
        loader.style.display = "none";
      });
  }
  const renderRepositories = (data) => {
    // Clear previous repositories
    repositoriesContainer.innerHTML = "";
    // Loop through the repositories and create elements to display them
    for (let repo of data) {
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.textContent = repo.name;
  
      const repoName = document.createElement('h3');
      repoName.appendChild(repoLink);
  
      const repoDescription = document.createElement('p');
      repoDescription.textContent = repo.description;
  
      const repoLanguages = document.createElement('p');
      repoLanguages.textContent = `Languages: ${repo.language}`;
  
      const repoItem = document.createElement('div');
      repoItem.classList.add('repo-item');
      repoItem.appendChild(repoName);
      repoItem.appendChild(repoDescription);
      repoItem.appendChild(repoLanguages);
  
      repositoriesContainer.appendChild(repoItem);
    }
  }
  const handlePagination = () => {
    if (currentPage === 1) {
      prevButton.disabled = true;
      prevButton.style.display = "none";
    } else {
      prevButton.disabled = false;
      prevButton.style.display = "inline-block";
    }
  
    if (currentPage === totalPages) {
      nextButton.disabled = true;
      nextButton.style.display = "none";
    } else {
      nextButton.disabled = false;
      nextButton.style.display = "inline-block";
    }
  }
      