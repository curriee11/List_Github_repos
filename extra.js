
const githubForm = document.getElementById('github-form');
const repoList = document.getElementById('repo-list');
const pagination = document.getElementById('pagination');
const loader = document.getElementById('loader');

let currentPage = 0;
let totalPages = 0;
let totalRepos=0;
let username = "";

// const handleFormSubmit = (event) => {
//     event.preventDefault();
//     username = document.getElementById('username').value;
//     getRepositories(username, currentPage);
// }
const handleFormSubmit = (event) => {
    event.preventDefault();
    username = document.getElementById('username').value;
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



// const getRepositories = (username, page) => {
//     loader.style.display = 'block';
//     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//         headers: {
//             'Accept': 'application/vnd.github+json'
//         }
//     })
    
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         const linkHeader = response.headers.get("Link");
//         if (linkHeader) {
//             const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//             totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//         }
//         return response.json();
//     })
  
    
    

//     .then(data => {
//         repoList.innerHTML = "";
//         fetch(`https://api.github.com/users/${username}`)
//     .then(response => response.json())
//     .then(data => {
//         totalRepos = data.public_repos;
//         console.log(data.public_repos);
//     });
//         data.forEach(repo => {
//             const repoEl = document.createElement('div');
//             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//             repoList.appendChild(repoEl);
//         });
//         renderPagination();
//         loader.style.display = 'none';
//     })
//     .catch(error => {
//                               console.log(error);
//                           });
//                       }
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
                        totalPages=totalRepos/10+1;
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



































<div id="loader" style="display:none">
  <img src="loader.gif" alt="Loading...">
</div>

<div id="repositories-container" style="display:none">
  <table id="repositories-table">
    <thead>
      <tr>
        <th>Repository Name</th>
        <th>Description</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody id="repositories-list">
    </tbody>
  </table>
  <div id="pagination-container">
    <button id="prev-button" style="display:none">Previous</button>
    <button id="next-button">Next</button>
  </div>
</div>
/* ul {
    list-style-type: none;
}

li {
    margin-bottom: 10px;
}

a {
    font-size: 18px;
    text-decoration: none;
    color: #0077b5;
} */



#repo-list {
    display: flex;
    flex-wrap: wrap;
}

#repo-list div {
    width: 30%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px #ccc;
}

#pagination {
    display: flex;
    justify-content: center;
}

#pagination button {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px #ccc;
}

#pagination button.active {
    background-color: #ccc;
}

#loader {
    display: none;
    text-align: center;
    font-size: 2em;
    margin: 50px;
}
<div id="github-profile">
      <form>
        <label>Enter Github username:</label>
        <input type="text" id="username" placeholder="Username">
        <button type="submit" id="submit-btn">Submit</button>
      </form>
      <div id="profile-info"></div>
      <div id="repositories"></div>
      <!-- <div id="pagination"></div> -->
      <div id="pagination">
        <button type="button" id="prev-btn" disabled>Previous</button>
        <button type="button" id="next-btn">Next</button>
      </div>
      
    </div>
    
    <!-- <form id="github-username-form">
      <input type="text" id="username" placeholder="Enter Github username">
      <button type="submit">Search</button>
  </form>
  
  <div id="loader" style="display: none;"></div>
  
  <div id="repositories-container" style="display: none;"></div>
  
  <button id="prev-button" style="display: none;">Previous</button>
  <button id="next-button" style="display: none;">Next</button>
  <div id="pagination-container" style="display: none;"></div> -->
  <!-- <form id="github-username-form">
    <label for="username">Enter Github username:</label>
    <input type="text" id="username" name="username">
    <button type="submit">Submit</button>
</form>
<div id="loader">Loading...</div>
<div id="repositories-container"></div>
<div id="pagination-container"></div>
<div id="profile-container">
  <img id="profile-picture" src="" alt="Profile picture">
  <div id="profile-info">
      <h2 id="profile-name"></h2>
      <p id="profile-repos"></p>
  </div>
</div> -->
// document.getElementById("github-form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     var username = document.getElementById("username").value;
//     var url = `https://api.github.com/users/${username}/repos?per_page=10`;

//     fetch(url)
//         .then(response => {
//             var linkHeader = response.headers.get("Link");
//             var links = {};
//             linkHeader.split(",").forEach(function(link) {
//                 var parts = link.split(";");
//                 var url = parts[0].slice(1, -1);
//                 var name = parts[1].slice(5, -1);
//                 links[name] = url;
//             });
//             return response.json().then(data => ({ data, links }));
//         })
//         .then(({ data, links }) => {
//             // Create and populate table or list with repository data
//             var repositoriesList = document.createElement("ul");
//             data.forEach(repo => {
//                 var listItem = document.createElement("li");
//                 var link = document.createElement("a");
//                 link.href = repo.html_url;
//                 link.textContent = repo.name;
//                 listItem.appendChild(link);
//                 repositoriesList.appendChild(listItem);
//             });
//             document.body.appendChild(repositoriesList);
            
//             // var previousButton = document.createElement("button");
//             // previousButton.textContent = "Previous";
//             // previousButton.disabled = !links.prev;
//             // previousButton.addEventListener("click", () => {
//             //     fetch(links.prev).then(response => {
//             //         var linkHeader = response.headers.get("Link");
//             //         var links = {};
//             //         linkHeader.split(",").forEach(function(link) {
//             //             var parts = link.split(";");
//             //             var url = parts[0].slice(1, -1);
//             //             var name = parts[1].slice(5, -1
//             .catch(error => console.log(error));
//             });


// let page = 1;
// let per_page = 10;

// function getRepositories(username, page, per_page) {
//   return fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`)
//     .then(response => response.json());
// }

// function displayRepositories(repositories) {
//   // Clear the existing repositories
//   document.getElementById("repositories-list").innerHTML = "";
  
//   // Create and populate table or list with repository data
//   repositories.forEach(repo => {
//     var listItem = document.createElement("li");
//     var link = document.createElement("a");
//     link.href = repo.html_url;
//     link.textContent = repo.name;
//     listItem.appendChild(link);
//     document.getElementById("repositories-list").appendChild(listItem);
//   });
// }

// document.getElementById("github-form").addEventListener("submit", function(event) {
//   event.preventDefault();
//   let username = document.getElementById("username").value;
//   getRepositories(username, page, per_page)
//     .then(data => {
//         displayRepositories(data);
//     })
//     .catch(error => console.log(error));
// });

// document.getElementById("prev-btn").addEventListener("click", function(event) {
//   event.preventDefault();
//   page = page - 1;
//   getRepositories(username, page, per_page)
//     .then(data => {
//       displayRepositories(data);
//     })
//     .catch(error => console.log(error));
// });

?extra

// // const githubForm = document.getElementById('github-form');
// // const repoList = document.getElementById('repo-list');
// // const pagination = document.getElementById('pagination');
// // const loader = document.getElementById('loader');

// // let currentPage = 1;
// // let totalPages = 0;

// // const handleFormSubmit = (event) => {
// //     event.preventDefault();
// //     const username = document.getElementById('username').value;
// //     getRepositories(username, currentPage);
// // }

// // const getRepositories = (username, page) => {
// //     loader.style.display = 'block';
// //     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`)
// //     .then(response => response.json())
// //     .then(data => {
// //         repoList.innerHTML = "";
// //         data.forEach(repo => {
// //             const repoEl = document.createElement('div');
// //             repoEl.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p>`;
// //             repoList.appendChild(repoEl);
// //         });
// //         totalPages = Math.ceil(data.length/10);
// //         renderPagination();
// //         loader.style.display = 'none';
// //     })
// //     .catch(error => {
// //         console.log(error);
// //     });
// // }

// // const renderPagination = () => {
// //     pagination.innerHTML = "";
// //     for (let i = 1; i <= totalPages; i++) {
// //         const btn = document.createElement('button');
// //         btn.innerHTML = i;
// //         if(i === currentPage) {
// //             btn.classList.add("active");
// //         }
// //         btn.addEventListener("click", () => {
// //             currentPage = i;
// //             const username = document.getElementById('username').value;
// //             getRepositories(username, currentPage);
// //         });
// //         pagination.appendChild(btn);
// //     }
// // }

// // githubForm.addEventListener('submit', handleFormSubmit);

























// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;

// // const handleFormSubmit = (event) => {
// //     event.preventDefault();
// //     const username = document.getElementById('username').value;
// //     getRepositories(username, currentPage);
// // }

// // const getRepositories = (username, page) => {
// //     loader.style.display = 'block';
// //     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`)
// //     .then(response => response.json())
// //     .then(data => {
// //         repoList.innerHTML = "";
// //         data.forEach(repo => {
// //             const repoEl = document.createElement('div');
// //             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
// //             repoList.appendChild(repoEl);
// //         });
// //         totalPages = Math.ceil(data.length/10);






// const handleFormSubmit = (event) => {
//   event.preventDefault();
//   const username = document.getElementById('username').value;
//   getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//   loader.style.display = 'block';
//   fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//       headers: {
//           'Accept': 'application/vnd.github+json'
//       }
//   })
//   .then(response => {
//       const linkHeader = response.headers.get("Link");
//       if (linkHeader) {
//           const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//           totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//       }
//       return response.json();
//   })
//   .then(data => {
//       repoList.innerHTML = "";
//       data.forEach(repo => {
//           const repoEl = document.createElement('div');
//           repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//           repoList.appendChild(repoEl);
//       });
//         renderPagination();
//         loader.style.display = 'none';
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }

// const renderPagination = () => {
//     pagination.innerHTML = "";
//     for (let i = 1; i <= totalPages; i++) {
//         const btn = document.createElement('button');
//         btn.innerHTML = i;
//         if(i === currentPage) {
//             btn.classList.add("active");
//         }
//         btn.addEventListener("click", () => {
//             currentPage = i;
//             const username = document.getElementById('username').value;
//             getRepositories(username, currentPage);
//         });
//         pagination.appendChild(btn);
//     }
// }

// githubForm.addEventListener('submit', handleFormSubmit);




















// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;

// const handleFormSubmit = (event) => {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//     loader.style.display = 'block';
//     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//         headers: {
//             'Accept': 'application/vnd.github+json'
//         }
//     })
//     .then(response => {
//       console.log(response);
//         const linkHeader = response.headers.get("Link");
//         if (linkHeader) {
//             const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//             totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//         }
//         totalRepos = response.meta.total_count;
//         totalPages = Math.ceil(totalRepos/10);
//         return response.json();
//     })
//     .then(data => {
//         repoList.innerHTML = "";
//         data.forEach(repo => {
//             const repoEl = document.createElement('div');
//             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//             repoList.appendChild(repoEl);
//         });
//         renderPagination();
//         loader.style.display = 'none';
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }
// const renderPagination = () => {
//   pagination.innerHTML = "";
//   for (let i = 1; i <= totalPages; i++) {
//       const button = document.createElement('button');
//       button.innerText = i;
//       if(i === currentPage) {
//           button.classList.add('active');
//       }
//       button.addEventListener('click', () => {
//           currentPage = i;
//           getRepositories(username, currentPage);
//       });
//       pagination.appendChild(button);
//   }
// }
// githubForm.addEventListener('submit',handleFormSubmit);





// const renderPagination = () => {
//   pagination.innerHTML = "";
//   for (let i = 1; i <= totalPages; i++) {
//       const button = document.createElement('button');
//       button.innerText = i;
//       button.addEventListener('click', () => {
//           currentPage = i;
//           getRepositories(username, currentPage);
//       });
//       pagination.appendChild(button);
//   }
// }



// githubForm.addEventListener('submit', handleFormSubmit);



// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;
// let username = "";

// const handleFormSubmit = (event) => {
//     event.preventDefault();
//     username = document.getElementById('username').value;
//     getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//     loader.style.display = 'block';
//     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//         headers: {
//             'Accept': 'application/vnd.github+json'
//         }
//     })
//     .then(response => {
//         const linkHeader = response.headers.get("Link");
//         if (linkHeader) {
//             const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//             totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//         }
//         totalRepos = response.meta.total_count;
//         totalPages = Math.ceil(totalRepos/10);
//         return response.json();
//     })
//     .then(data => {
//         repoList.innerHTML = "";
//         data.forEach(repo => {
//             const repoEl = document.createElement('div');
//             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//             repoList.appendChild(repoEl);
//         });
//         renderPagination();
//         loader.style.display = 'none';
//     })
   
  
//     .catch(error => {
//         console.log(error);
//     });
// }

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
// githubForm.addEventListener('submit',handleFormSubmit);








// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;
// let username = "";

// const handleFormSubmit = (event) => {
//     event.preventDefault();
//     username = document.getElementById('username').value;
//     getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//     loader.style.display = 'block';
//     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//         headers: {
//             'Accept': 'application/vnd.github+json'
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         repoList.innerHTML = "";
//         data.forEach(repo => {
//             const repoEl = document.createElement('div');
//             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//             repoList.appendChild(repoEl);
//         });
//         totalPages = Math.ceil(data.length / 10);
//         renderPagination();
//         loader.style.display = 'none';
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }

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
// githubForm.addEventListener('submit', handleFormSubmit);









// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;
// let username = "";

// const handleFormSubmit = (event) => {
//   event.preventDefault();
//   username = document.getElementById('username').value;
//   getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//   loader.style.display = 'block';
//   fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//       headers: {
//           'Accept': 'application/vnd.github+json'
//       }
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error(response.statusText);
//       }
//       const linkHeader = response.headers.get("Link");
//       if (linkHeader) {
//           const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//           totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//       }
//       return response.json();
//   })
//   .then(data => {
//       repoList.innerHTML = "";
//       data.forEach(repo => {
//           const repoEl = document.createElement('div');
//           repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//           repoList.appendChild(repoEl);
//       });
//       renderPagination();
//       loader.style.display = 'none';
//   })
//   .catch(error => {
//             console.log(error);
//         });
//     }
    
//     const renderPagination = () => {
//         pagination.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {
//             const button = document.createElement('button');
//             button.innerText = i;
//             if(i === currentPage) {
//                 button.classList.add('active');
//             }
//             button.addEventListener('click', () => {
//                 currentPage = i;
//                 getRepositories(username, currentPage);
//             });
//             pagination.appendChild(button);
//         }
//     }
//     githubForm.addEventListener('submit', handleFormSubmit);
    

// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let reposPerPage = 10;

// $(document).ready(function(){
//     loadRepos();
// });

// function loadRepos(){
//     $.ajax({
//         url: `https://api.github.com/users/{username}/repos`,
//         dataType: 'json',
//         success: function(data){
//             let repos = data;
//             let totalRepos = repos.length;
//             let totalPages = Math.ceil(totalRepos / reposPerPage);

//             $('#repo-list').empty();

//             for(let i=(currentPage-1)*reposPerPage; i<currentPage*reposPerPage; i++){
//                 if(repos[i]){
//                     $('#repo-list').append(`<div class="repo">
//                         <h2>${repos[i].name}</h2>
//                         <p>${repos[i].description}</p>
//                         <p>Stars: ${repos[i].stargazers_count}</p>
//                     </div>`);
//                 }
//             }
//             $('#pagination').empty();
//             for(let i=1; i<=totalPages; i++){
//                 $('#pagination').append(`<button class="page-btn ${i===currentPage ? 'active':''}" onclick="changePage(${i})">${i}</button>`);
//             }
//         }
//     });
// }

// function changePage(page){
//     currentPage = page;
//     loadRepos();
// }
// githubForm.addEventListener('submit', handleFormSubmit);



// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;
// let username = "";

// const handleFormSubmit = (event) => {
//   event.preventDefault();
//   username = document.getElementById('username').value;
//   getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//   loader.style.display = 'block';
//   fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//       headers: {
//           'Accept': 'application/vnd.github+json'
//       }
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error(response.statusText);
//       }
//       const linkHeader = response.headers.get("Link");
//       if (linkHeader) {
//           const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//           totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//       }
//       return response.json();
//   })
//   .then(data => {
//       repoList.innerHTML = "";
//       data.forEach(repo => {
//           const repoEl = document.createElement('div');
//           repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//           repoList.appendChild(repoEl);
//       });
//       renderPagination();
//       loader.style.display = 'none';
//   })
//   .catch(error => {
//             console.log(error);
//         });
//     }
    
//     const renderPagination = () => {
//         pagination.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {
//             const button = document.createElement('button');
//             button.innerText = i;
//             if(i === currentPage) {
//                 button.classList.add('active');
//             }
//             button.addEventListener('click', () => {
//                 currentPage = i;
//                 getRepositories(username, currentPage);
//             });
//             pagination.appendChild(button);
//         }
//     }
//     githubForm.addEventListener('submit', handleFormSubmit);


// const githubForm = document.getElementById('github-form');
// const repoList = document.getElementById('repo-list');
// const pagination = document.getElementById('pagination');
// const loader = document.getElementById('loader');

// let currentPage = 1;
// let totalPages = 0;
// let totalRepos = 0;
// let username = "";

// const handleFormSubmit = (event) => {
//     event.preventDefault();
//     username = document.getElementById('username').value;
//     getRepositories(username, currentPage);
// }

// const getRepositories = (username, page) => {
//     loader.style.display = 'block';
//     fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`, {
//         headers: {
//             'Accept': 'application/vnd.github+json'
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         const linkHeader = response.headers.get("Link");
//         if (linkHeader) {
//             const lastLink = linkHeader.split(", ").find(link => link.includes("rel=\"last\""));
//             totalPages = lastLink ? +lastLink.match(/page=(\d+)/)[1] : 1;
//         }
//         return response.json();
//     })
//     .then(data => {
//         repoList.innerHTML = "";
//         data.forEach(repo => {
//             const repoEl = document.createElement('div');
//             repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
//                       repoList.appendChild(repoEl);
//                   });
//                   renderPagination();
//                   loader.style.display = 'none';
//               })
//               .catch(error => {
//                         console.log(error);
//                     });
//                 }
//                 // totalPages=totalRepos/10+1;
//                 // console.log(totalPages);
//                 const renderPagination = () => {
//                     pagination.innerHTML = "";
//                     for (let i = 1; i <= totalPages; i++) {
//                         const button = document.createElement('button');
//                         button.innerText = i;
//                         if(i === currentPage) {
//                             button.classList.add('active');
//                         }
//                         button.addEventListener('click', () => {
//                             currentPage = i;
//                             getRepositories(username, currentPage);
//                         });
//                         pagination.appendChild(button);
//                     }
//                 }
//                 githubForm.addEventListener('submit', handleFormSubmit);



//////////// working

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
