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

if (window.location.pathname === '/') {
  homeModal = document.querySelector("#home-modal");
  postModalCloseButtons = document.querySelectorAll('.post-modal-close');
  postElements = document.querySelectorAll('.post-list-item');
  postTitle = document.querySelector('#post-title');
  postContent = document.querySelector('#post-content');
  postAuthor = document.querySelector('#post-author');
  postDate = document.querySelector('#post-date');

  addComment = document.querySelector('#add-comment')
  addCommentContainer = document.querySelector('#add-comment-container')
  addCommentText = document.querySelector('#add-comment-text')
  addCommentSubmit = document.querySelector('#comment-submit')

  currentUserName = document.querySelector('#current-user-name')
  
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
  if (loggedIn) {
    addCommentText.value = '';
    addCommentText.style.display = 'none';
    addCommentSubmit.style.display = 'none';
  }
  homeModal.style.display = "none";
}

const newCommentHandler = async (event) => {
  event.preventDefault();
  if (addCommentText.value === '') {
    alert('Please enter a comment');
    return;
  }
  if (loggedIn) {
    const newComment = {
      comment_content: addCommentText.value,
      user_id: currentUserName.getAttribute('data-id'),
      post_id: currentPostId,
    };
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const post = await getPost(currentPostId);
      currentPost = await post.json();
      postCommentHandler(currentPost);
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


postElements.forEach((postElement) => {
  postElement.addEventListener('click', async function(event) {
    currentPostId = event.currentTarget.getAttribute('data-id');
    await handlePostClick(currentPostId);
  });
});

if (loggedIn) {
  addComment.addEventListener('click', function() {
      addCommentText.style.display = 'block';
      addCommentSubmit.style.display = 'block';
  });
}

if (loggedIn) {
  addCommentSubmit.addEventListener('click', newCommentHandler);
}

postModal = document.querySelector("#post-modal");
if (postModal !== null) {
  clearModal();
}

postModalCloseButtons.forEach(button => {
  button.addEventListener('click', clearModal);
});

window.onclick = function(event) {
  if (event.target == homeModal) {
    clearModal();
  } 

}
