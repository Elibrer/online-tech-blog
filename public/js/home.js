let recentPostEl;
let homeModal;
let postModalCloseButtons;
let posts;
let postElements;
let postTitle;
let postContent;
let postAuthor;
let postDate;

if (window.location.pathname === '/') {
  recentPostEl = document.querySelectorAll('.recent-posts');
  homeModal = document.querySelector("#home-modal");
  postModalCloseButtons = document.querySelectorAll('.post-modal-close');
  postElements = document.querySelectorAll('.post-list-item');
  postTitle = document.querySelector('#post-title');
  postContent = document.querySelector('#post-content');
  postAuthor = document.querySelector('#post-author');
  postDate = document.querySelector('#post-date');
}


// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};


handlePostClick = async (postId) => {
  event.preventDefault();
  console.log(postId)
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    homeModal.style.display = "block";
    const post = await response.json();
    console.log(post)
    postTitle.innerHTML = post.post_name;
    postContent.innerHTML = post.post_content;
    postAuthor.innerHTML = post.user.username;
    postDate.innerHTML = post.post_date;

    if (post.comments.length > 0) {
      const commentList = document.querySelector('.comment-id');
      commentList.innerHTML = ''; // Clear existing comments
      post.comments.forEach((comment) => {
        const commentContainer= document.createElement('li');
        const commentContent = document.createElement('p');
        const commentAuthor = document.createElement('h5');
        const commentDate = document.createElement('p');
        commentDate.setAttribute('class', 'border-bottom');
        commentContainer.setAttribute('class', 'comment-group p-2');
        commentContent.innerHTML = comment.comment_content;
        commentAuthor.innerHTML = comment.user.username;
        commentDate.innerHTML = comment.comment_date;
        commentList.appendChild(commentContainer);
        commentContainer.appendChild(commentAuthor);
        commentContainer.appendChild(commentDate);
        commentContainer.appendChild(commentContent);
       
      });
    }
  } else {
    alert('Failed to load post');
  }
};

const clearModal = () => {
  postTitle.innerHTML = '';
  postContent.innerHTML = '';
  postAuthor.innerHTML = '';
  postDate.innerHTML = '';
  homeModal.style.display = "none";
}

postElements.forEach((postElement) => {
  postElement.addEventListener('click', async function(event) {
    const postId = event.currentTarget.getAttribute('data-id');
    console.log(postId);
    await handlePostClick(postId);
  });
});






postModal = document.querySelector("#post-modal");
if (postModal !== null) {
  clearModal();
}

postModalCloseButtons.forEach(button => {
  button.addEventListener('click', clearModal);
});
