$(document).ready(function() {
  // Handle form submission
  $("#submit-btn").click(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    getUserProfile(username);
    getUserRepos(username);
  });
  
  // Get user profile info
  function getUserProfile(username) {
    $.get("https://api.github.com/users/" + username, function(data) {
      var profileInfo = "<h2>" + data.name + "</h2>" +
        "<img src='" + data.avatar_url + "'>" +
        "<p>" + data.bio + "</p>";
      $("#profile-info").html(profileInfo);
    });
  }
  
 
 // Get user repositories
function getUserRepos(username, page) {
  var per_page = 10;
  var url = "https://api.github.com/users/" + username + "/repos?per_page="+per_page+"&page="+page;
  $.get(url, function(data) {
    var repos = "<ul>";
    for (var i = 0; i < data.length; i++) {
      repos += "<li>" + data[i].name + "</li>";
    }
    repos += "</ul>";
    $("#repositories").html(repos);
  });
}

var currentPage = 1;

$("#prev-btn").click(function() {
  currentPage--;
  var username = $("#username").val();
  getUserRepos(username, currentPage);
  if (currentPage === 1) {
    $("#prev-btn").attr("disabled", true);
  }
  $("#next-btn").attr("disabled", false);
});

$("#next-btn").click(function() {
  currentPage++;
  var username = $("#username").val();
  getUserRepos(username, currentPage);
  if (currentPage > 1) {
    $("#prev-btn").attr("disabled", false);
  }
});








// const profileContainer = document.getElementById('profile-container');
// const profilePicture = document.getElementById('profile-picture');
// const profileName = document.getElementById('profile-name');
// const profileRepos = document.getElementById('profile-repos');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // Get the entered username
//     username = document.getElementById('username').value;
//     // Validate the entered username
//     if (!username) {
//         alert("Please enter a valid username");
//         return;
//     }
//     // Show loading spinner and hide other elements
//     loader.style.display = "block";
//     profileContainer.style.display = "none";
//     repositoriesContainer.style.display = "none";
//     paginationContainer.style.display = "none";
//     // Call the function to fetch the repositories and profile information
//     getRepositories();
//     getProfile();
// });

// const getProfile = () => {
//     // API endpoint to fetch the profile information
//     const endpoint = `https://api.github.com/users/${username}`;
//     fetch(endpoint)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             profilePicture.src = data.avatar_url;
//             profileName.textContent = data.name;
//             profileRepos.textContent = `Repositories: ${data.public_repos}`;
//             profileContainer.style.display = "block";
//         })
//         .catch((error) => {
//             console.error(error);
//             alert("Error occured while fetching the profile information. Please check the entered username and try again.");
//             loader.style.display = "none";
//         });
// }

// let currentPage = 1;
// let totalPages = 0;
// let username = "";
// const form = document.getElementById('github-username-form');
// const loader = document.getElementById('loader');
// const repositoriesContainer = document.getElementById('repositories-container');
// const paginationContainer = document.getElementById('pagination-container');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // Get the entered username
//     username = document.getElementById('username').value;
//     // Validate the entered username
//     if (!username) {
//         alert("Please enter a valid username");
//         return;
//     }
//     // Show loading spinner and hide other elements
//     loader.style.display = "block";
//     repositoriesContainer.style.display = "none";
//     paginationContainer.style.display = "none";
//     // Call the function to fetch the repositories
//     getRepositories();
// });

// const getRepositories = () => {
//     // API endpoint to fetch the repositories
//     const endpoint = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=10`;
//     fetch(endpoint)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             totalPages = Math.ceil(data.length / 10);
//             renderRepositories(data);
//             loader.style.display = "none";
//             repositoriesContainer.style.display = "block";
//             renderPagination();
//         })
//         .catch((error) => {
//             console.error(error);
//             alert("Error occured while fetching the repositories. Please check the entered username and try again.");
//             loader.style.display = "none";
//         });
// }
// const renderRepositories = (data) => {
//     // Clear previous repositories
//     repositoriesContainer.innerHTML = "";
//     // Loop through the repositories and create elements to display them
//     for (let repo of data) {
//         const repoLink = document.createElement('a');
//         repoLink.href = repo.html_url;
//         repoLink.target = "_blank";
//         repoLink.textContent = repo.name;

//         const repoName = document.createElement('h3');
//         repoName.appendChild(repoLink);

//         const repoDescription = document.createElement('p');
//         repoDescription.textContent = repo.description;

//         const repoLanguages = document.createElement('p');
//         repoLanguages.textContent = `Languages: ${repo.language}`;

//         const repoItem = document.createElement('div');
//         repoItem.classList.add('repo-item');
//         repoItem.appendChild(repoName);
//         repoItem.appendChild(repoDescription);
//         repoItem.appendChild(repoLanguages);

//         repositoriesContainer.appendChild(repoItem);
//     }
// }
// const renderPagination = () => {
//     paginationContainer.innerHTML = "";
//     for (let i = 1; i <= totalPages; i++) {
//       const pageButton = document.createElement('button');
//       pageButton.textContent = i;
//       pageButton.addEventListener('click', () => {
//           currentPage = i;
//           getRepositories();
//       });
//       paginationContainer.appendChild(pageButton);
//   }
//   const prevButton = document.createElement('button');
//   prevButton.textContent = "Previous";
//   prevButton.addEventListener('click', () => {
//       if (currentPage > 1) {
//           currentPage--;
//           getRepositories();
//       }
//   });
//   paginationContainer.appendChild(prevButton);

//   const nextButton = document.createElement('button');
//   nextButton.textContent = "Next";
//   nextButton.addEventListener('click', () => {
//       if (currentPage < totalPages) {
//           currentPage++;
//           getRepositories();
//       }
//   });
//   paginationContainer.appendChild(nextButton);
//   paginationContainer.style.display = "block";
// }













// // let currentPage = 1;
// // let totalPages = 0;
// // const form = document.getElementById('github-username-form');
// // const loader = document.getElementById('loader');
// // const repositoriesContainer = document.getElementById('repositories-container');
// // const paginationContainer = document.getElementById('pagination-container');
// // form.addEventListener('submit', (event) => {
// //     event.preventDefault();
// //     // Get the entered username
// //     const username = document.getElementById('username').value;
// //     // Validate the entered username
// //     if (!username) {
// //         alert("Please enter a valid username");
// //         return;
// //     }
// //     // Show loading spinner and hide other elements
// //     loader.style.display = "block";
// //     repositoriesContainer.style.display = "none";
// //     paginationContainer.style.display = "none";
// //     // Call the function to fetch the repositories
// //     getRepositories(username);
// // });

// // const getRepositories = (username) => {
// //     // API endpoint to fetch the repositories
// //     const endpoint = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=10`;
// //     fetch(endpoint)
// //         .then((response) => {
// //             if (!response.ok) {
// //                 throw new Error(response.statusText);
// //             }
// //             return response.json();
// //         })
// //         .then((data) => {
// //             totalPages = Math.ceil(data.length / 10);
// //             renderRepositories(data);
// //             loader.style.display = "none";
// //             repositoriesContainer.style.display = "block";
// //             renderPagination();
// //         })
// //         .catch((error) => {
// //             console.error(error);
// //             alert("Error occured while fetching the repositories. Please check the entered username and try again.");
// //             loader.style.display = "none";
// //         });
// // }
// // const renderRepositories = (data) => {
// //     // Clear previous repositories
// //     repositoriesContainer.innerHTML = "";
// //     // Loop through the repositories and create elements to display them
// //     for (let repo of data) {
// //         const repoLink = document.createElement('a');
// //         repoLink.href = repo.html_url;
// //         repoLink.target = "_blank";
// //         repoLink.textContent = repo.name;

// //         const repoName = document.createElement('h3');
// //         repoName.appendChild(repoLink);

// //           const repoDescription = document.createElement('p');
// //           repoDescription.textContent = repo.description;
      
// //           const repoLanguages = document.createElement('p');
// //           repoLanguages.textContent = `Languages: ${repo.language}`;
      
// //           const repoItem = document.createElement('div');
// //           repoItem.classList.add('repo-item');
// //           repoItem.appendChild(repoName);
// //           repoItem.appendChild(repoDescription);
// //           repoItem.appendChild(repoLanguages);
      
// //           repositoriesContainer.appendChild(repoItem);
// //         }
// //       }
// //       const renderPagination = () => {
// //           paginationContainer.innerHTML = "";
// //           for (let i = 1; i <= totalPages; i++) {
// //               const page = document.createElement('span');
// //               page.textContent = i;
// //               page.classList.add('page-number');
// //               if (i === currentPage) {
// //                   page.classList.add('active');
// //               }
// //               paginationContainer.appendChild(page);
// //           }
// //           const prevButton = document.createElement('button');
// //           prevButton.textContent = "Previous";
// //           prevButton.classList.add('prev');
// //           prevButton.addEventListener('click', () => {
// //               if (currentPage > 1) {
// //                   currentPage--;
// //                   getRepositories(username);
// //               }
// //           });
// //           paginationContainer.appendChild(prevButton);
      
// //           const nextButton = document.createElement('button');
// //           nextButton.textContent = "Next";
// //           nextButton.classList.add('next');
// //           nextButton.addEventListener('click', () => {
// //               if (currentPage < totalPages) {
// //                   currentPage++;
// //                   getRepositories(username);
// //               }
// //           });
// //           paginationContainer.appendChild(nextButton);
      
// //           paginationContainer.style.display = "block";
// //       }
      