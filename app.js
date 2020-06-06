const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

const limit = 5;
let page = 1;
let postsNum = 0;

// Get Posts Function
async function getPosts() {
  loading.classList.add('show');

  fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
    .then((response) => {
      postsNum = response.headers.get('x-total-count');
      return response.json();
    })
    .then((data) => {
      loading.classList.remove('show');

      data.forEach((post) => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <span class="number">${post.id}</span>
            <div class="post-info">
              <h2 class="post-title">${post.title}</h2>
              <div class="post-body">
                ${post.body}
              </div>
            </div>
        `;

        postContainer.appendChild(postEl);
      });
    });

  page++;
}

// Init getPosts Function
getPosts();

// Event Listeners
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    if (postsNum / limit > page) {
      setTimeout(() => {
        getPosts();
      }, 500);
    } else {
      loading.textContent = 'No More Data';
      setTimeout(() => {
        loading.classList.add('show');
        loading.style.position = 'static';
      }, 1500);
    }
  }
});
