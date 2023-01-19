const githubForm = document.getElementById('github-form');
const repoList = document.getElementById('repo-list');
const pagination = document.getElementById('pagination');
const loader = document.getElementById('loader');

let currentPage = 1;
let totalPages = 0;
let totalRepos=0;
let username = "";

const handleFormSubmit = (event) => {
    event.preventDefault();
    username = document.getElementById('username').value;
    getRepositories(username, currentPage);
}

const getRepositories = (username, page) => {
    loader.style.display = 'block';
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
        data.forEach(repo => {
            const repoEl = document.createElement('div');
            repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
            repoList.appendChild(repoEl);
        });
        renderPagination();
        loader.style.display = 'none';
    })
    .catch(error => {
                              console.log(error);
                          });
                      }
    //                   fetch(`https://api.github.com/users/${username}`)
    // .then(response => response.json())
    // .then(data => {
    //      totalRepos = data.public_repos;
    //     console.log(totalRepos);
    // });
                      //  shows 1 to 10
                      // const renderPagination = () => {
                      //     pagination.innerHTML = "";
                      //     for (let i = 1; i <= totalPages; i++) {
                      //         const button = document.createElement('button');
                      //         button.innerText = i;
                      //         if(i === currentPage) {
                      //             button.classList.add('active');
                      //         }
                      //         button.addEventListener('click', () => {
                      //             currentPage = i;
                      //             getRepositories(username, currentPage);
                      //         });
                      //         pagination.appendChild(button);
                      //     }
                      // }

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

                        nextButton.addEventListener('click', () => {
                            currentPage++;
                            if (currentPage <= totalPages) {
                                getRepositories(username, currentPage);
                            }
                        });
                        pagination.appendChild(nextButton);
                    }

// shows 1 and next
                  //   const renderPagination = () => {
                  //     pagination.innerHTML = '';
                  //     const prevButton = document.createElement('button');
                  //     prevButton.innerText = '1';
                  //     prevButton.addEventListener('click', () => {
                  //         currentPage = 1;
                  //         getRepositories(username, currentPage);
                  //     });
                  //     pagination.appendChild(prevButton);
                      
                  //     const nextButton = document.createElement('button');
                  //     nextButton.innerText = 'Next';
                  //     if (currentPage === totalPages) {
                  //         nextButton.disabled = true;
                  //     }
                  //     nextButton.addEventListener('click', () => {
                  //         currentPage++;
                  //         if (currentPage <= totalPages) {
                  //             getRepositories(username, currentPage);
                  //         }
                  //     });
                  //     pagination.appendChild(nextButton);
                  // }
                  // 1 st last with no repos and next
                //   const renderPagination = () => {
                //     pagination.innerHTML = '';
                //     const prevButton = document.createElement('button');
                //     prevButton.innerText = '1';
                //     prevButton.addEventListener('click', () => {
                //         currentPage = 1;
                //         getRepositories(username, currentPage);
                //     });
                //     pagination.appendChild(prevButton);
                    
                //     const lastPageButton = document.createElement('button');
                //     lastPageButton.innerText = `Last page with repos(${totalPages})`;
                //     lastPageButton.addEventListener('click', () => {
                //         currentPage = totalPages;
                //         getRepositories(username, currentPage);
                //     });
                //     pagination.appendChild(lastPageButton);
                
                //     const nextButton = document.createElement('button');
                //     nextButton.innerText = 'Next';
                //     if (currentPage === totalPages) {
                //         nextButton.disabled = true;
                //     }
                //     nextButton.addEventListener('click', () => {
                //         currentPage++;
                //         if (currentPage <= totalPages) {
                //             getRepositories(username, currentPage);
                //         }
                //     });
                //     pagination.appendChild(nextButton);
                // }
                
              
                      githubForm.addEventListener('submit', handleFormSubmit);