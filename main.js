
const githubForm = document.getElementById('github-form');
const repoList = document.getElementById('repo-list');
const pagination = document.getElementById('pagination');
const loader = document.getElementById('loader');
const userNameDisplay = document.getElementById('userNameDisplay');

let currentPage = 0;
let totalPages = 0;
let totalRepos=0;
let username = "";

setTimeout(() => {
    loader.style.display = 'none';
  }, 2000); // 2 seconds
  
const handleFormSubmit = (event) => {
    event.preventDefault();
    username = document.getElementById('username').value;
    
    currentPage = 1;
    loader.style.display = 'block';
    getRepositories(username, currentPage);
}
 
  
const getRepositories = (username, page) => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
        headers: {
            'Accept': 'application/vnd.github+json'
        }
    })

    
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const linkHeader = response.headers.get("Link");
        if (linkHeader) {
            const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
            totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
        }
        return response.json();
    })
    .then(data => {
        repoList.innerHTML = "";
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                totalRepos = data.public_repos;
                // totalPages = Math.ceil(totalRepos/10);
                totalPages = Math.ceil(totalRepos/10); // added this line
                renderPagination(); 
                userNameDisplay.innerHTML = `<h2>${data.name}</h2>`;
                // document.querySelector('#pagination button').classList.add('active');

                console.log(data.public_repos);
            });
        data.forEach(repo => {
            const repoEl = document.createElement('div');
            repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
            repoList.appendChild(repoEl);
        });
        renderPagination();
        loader.style.display = 'none'; // hide the loading button
    })
    .catch(error => {
        console.log(error);
    });
}



// // shows 1 to 10 and next
                      const renderPagination = () => {
                        pagination.innerHTML = '';
                        // totalPages=totalRepos/10+1;
                        console.log(totalPages);
                       

                        for (let i = 1; i <= totalPages; i++) {
                            const button = document.createElement('button');
                            button.innerText = i;
                            if (i === currentPage) {
                                button.classList.add('active');
                            }
                            button.addEventListener('click', () => {
                                currentPage = i;
                                getRepositories(username, currentPage);
                            });
                            pagination.appendChild(button);
                        }
                        const nextButton = document.createElement('button');
                        nextButton.innerText = 'Next';
                        if (currentPage === totalPages) {
                            nextButton.disabled = true;
                        }
                             nextButton.id="next";
                        nextButton.addEventListener('click', () => {
                            currentPage++;
                            if (currentPage <= totalPages) {
                                getRepositories(username, currentPage);
                            }
                        });
                        pagination.appendChild(nextButton);
                    }


                
              
                      githubForm.addEventListener('submit', handleFormSubmit);

