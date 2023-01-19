const githubForm = document.getElementById('github-form');
const repoList = document.getElementById('repo-list');
const pagination = document.getElementById('pagination');
const loader = document.getElementById('loader');

let currentPage = 1;
let totalPages = 0;

const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    getRepositories(username, currentPage);
}

const getRepositories = (username, page) => {
    loader.style.display = 'block';
    fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${page}`)
    .then(response => response.json())
    .then(data => {
        repoList.innerHTML = "";
        data.forEach(repo => {
            const repoEl = document.createElement('div');
            repoEl.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3><p>${repo.description}</p>`;
            repoList.appendChild(repoEl);
        });
        totalPages = Math.ceil(data.length/10);
        renderPagination();
        loader.style.display = 'none';
    })
    .catch(error => {
        console.log(error);
    });
}

const renderPagination = () => {
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerHTML = i;
        if(i === currentPage) {
            btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
            currentPage = i;
            const username = document.getElementById('username').value;
            getRepositories(username, currentPage);
        });
        pagination.appendChild(btn);
    }
}

githubForm.addEventListener('submit', handleFormSubmit);
