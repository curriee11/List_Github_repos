
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
                // userNameDisplay.innerHTML = `<h2>${data.name}</h2>`;
                // image.innerHTML=`<img src="${data.avatar_url}" style="display: block; margin: 0 auto; border-radius: 50%; width: 100px; height: 100px;">`;
                userNameDisplay.innerHTML=` <div class="user-grid"><img src="${data.avatar_url}" alt="Profile Picture">
                
                <div>
                <h2>${data.name}</h2>
                ${data.bio ? `<h5 class="bio"> ${data.bio}</h5>` : ''}
                ${data.location ? `<div class="location"><i class="bi bi-geo-alt"></i><h5 class="location"> ${data.location}</h5></div>` : ''}
                <h5 class="twitter">Twitter: <a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a></h5>
               
                </div>

                <div>
                <h5 class="github"><a href="${data.html_url}" target="_blank"><i class="bi bi-link"></i>  Github</a></h5>
                 
              
              </div>
              </div>
                       `;
            
                // document.querySelector('#pagination button').classList.add('active');

                console.log(data.public_repos);
            });
        data.forEach(repo => {
            const repoEl = document.createElement('div');
            repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3>
             ${repo.description ? `<p>${repo.description}</p>` : ''}`;
            repoList.appendChild(repoEl);
        });
        renderPagination();
        loader.style.display = 'none'; // hide the loading button
    })
    .catch(error => {
    //     loader.style.display = 'none'; // hide the loading button
    //   repoList.innerHTML = ""; // clear the repo list
    //   totalPages = 0; // reset the total pages
    //     console.log(error);
        alert('Invalid username. Please try again.');
        loader.style.display = 'none';
        location.reload();
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
                        // if (currentPage === totalPages) {
                        //     nextButton.disabled = true;
                        //     // currentPage = 0;
                        // }
                        // added id to make css changes
                             nextButton.id="next";
                        nextButton.addEventListener('click', () => {
                            currentPage++;
                            // if (currentPage <= totalPages) {
                            //     getRepositories(username, currentPage);
                            // }
                            if (currentPage > totalPages) {
                                    // nextButton.disabled = true;
                                    currentPage = 1;
                                    
                                }
                                getRepositories(username, currentPage);
                        });
                        pagination.appendChild(nextButton);
                    }


                
              
                      githubForm.addEventListener('submit', handleFormSubmit);

