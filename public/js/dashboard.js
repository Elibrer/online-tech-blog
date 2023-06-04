let homeModal;
let postModalCloseButtons;
let posts;
let postElements;
let postTitle;
let postContent;
let postAuthor;
let postDate;
let addComment;
let addCommentContainer;
let addCommentText;
let addCommentSubmit;
let loggedIn;
let currentUserName;
let currentPostId;
let currentPost;
let postSubmit;
let createPostText;
let createPostTitle;

if (window.location.pathname === '/dashboard') {
  homeModal = document.querySelector("#home-modal");
  dashModalCloseButtons = document.querySelectorAll('.dash-modal-close');
  postElements = document.querySelectorAll('.post-list-item');
  postTitle = document.querySelector('#post-title');
  postContent = document.querySelector('#post-content');
  postAuthor = document.querySelector('#post-author');
  postDate = document.querySelector('#post-date');
  postSubmit = document.querySelector('#post-submit');
  createPostText = document.querySelector('#create-post-text');
  currentUserName = document.querySelector('#current-user-name');
  createPostTitle = document.querySelector('#create-post-title');
  
  loggedIn = document.getElementById('logged-in')
  if (loggedIn.innerHTML === 'true') {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
}


// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};


const getPost = async (currentPostId) => {
  return fetch(`/api/posts/${currentPostId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

handlePostClick = async (currentPostId) => {
  event.preventDefault();

  const response = await getPost(currentPostId);
  if (response.ok) {
    homeModal.style.display = "block";
    currentPost = await response.json();

    postTitle.innerHTML = currentPost.post_name;
    postContent.innerHTML = currentPost.post_content;
    postAuthor.innerHTML = currentPost.user.username;
    postDate.innerHTML = currentPost.post_date;

    if (currentPost.comments.length > 0) {
      postCommentHandler(currentPost);
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

const newPostHandler = async (event) => {
  event.preventDefault();
  if (createPostText.value === '') {
    alert('Please enter new post content.');
    return;
  }
  if (loggedIn) {
    currentPostId = currentUserName.getAttribute('data-id');

    const newPostData = {
      post_name: createPostTitle.value,
      post_content: createPostText.value,
      user_id: currentUserName.getAttribute('data-id'),
    };
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const post = await getPost(currentPostId);
      let newPost = await post.json();
      console.log(newPost);
      newPostAppend(newPost);
    } else {
      alert('Failed to add comment');
    }
  }
}

const postCommentHandler = async (currentPost) => {
    const commentList = document.querySelector('.comment-id');
    commentList.innerHTML = '';
    currentPost.comments.forEach((comment) => {
  
      const commentContainer = document.createElement('li');
      commentContainer.setAttribute('class', 'list-group-modal list-group-item comment-group rounded');
  
      const userContainer= document.createElement('div');
      userContainer.setAttribute('class', 'user-container border-bottom blog-post justify-content-between p-2');
  
      const commentAuthor = document.createElement('h5');
      const commentDate = document.createElement('p');
      commentAuthor.setAttribute('class', 'comment-display');
      commentDate.setAttribute('class', 'comment-display');
  
      const commentContentContainer = document.createElement('div');
      const commentContent = document.createElement('p');
      commentContent.setAttribute('class', 'border-top p-2 m-0');
  
  
      commentContent.innerHTML = comment.comment_content;
      commentAuthor.innerHTML = comment.user.username;
      commentDate.innerHTML = comment.comment_date;
  
      commentList.appendChild(commentContainer);
      commentContainer.appendChild(userContainer);
      userContainer.appendChild(commentAuthor);
      userContainer.appendChild(commentDate);
      commentContainer.appendChild(commentContentContainer);
      commentContentContainer.appendChild(commentContent);
    });
  }

const newPostAppend = async (newPost) => {
  const commentList = document.querySelector('.comment-id');

//   currentPost.forEach((post) => {

    const postContainer = document.createElement('li');
    postContainer.setAttribute('class', 'blog-post list-group-item post-list-item rounded');
    postContainer.setAttribute('data-id', newPost.id);
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'd-flex flex-row justify-content-between align-items-center p-2');
    const postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'mb-0');
    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'd-flex flex-row justify-content-between align-items-center p-2');
    const postAuthor = document.createElement('p');
    postAuthor.setAttribute('class', 'font-weight-bold');
    const postSeparator = document.createElement('p');
    postSeparator.setAttribute('style', 'color: var(--white);');
    postSeparator.setAttribute('class', 'mx-3');
    const postDate = document.createElement('p');
    postDate.setAttribute('class', 'font-weight-bold');
    const containerSeparator = document.createElement('div');
    containerSeparator.setAttribute('class', 'm-2');

    postTitle.innerHTML = newPost.post_name;
    postAuthor.innerHTML = newPost.user.username;
    postSeparator.innerHTML = '|';
    postDate.innerHTML = newPost.post_date;

    commentList.appendChild(postContainer);
    postContainer.appendChild(postDiv);
    postDiv.appendChild(postTitle);
    postDiv.appendChild(nameDiv);
    nameDiv.appendChild(postAuthor);
    nameDiv.appendChild(postSeparator);
    nameDiv.appendChild(postDate);
    postContainer.parentElement.appendChild(containerSeparator);

    
//   });
}


postElements.forEach((postElement) => {
  postElement.addEventListener('click', async function(event) {
    currentPostId = event.currentTarget.getAttribute('data-id');
    await handlePostClick(currentPostId);
  });
});

postSubmit.addEventListener('click', newPostHandler);

dashModal = document.querySelector("#dash-modal");
if (dashModal !== null) {
  clearModal();
}

dashModalCloseButtons.forEach(button => {
  button.addEventListener('click', clearModal);
});

window.onclick = function(event) {
  if (event.target == homeModal) {
    clearModal();
  } 

}
