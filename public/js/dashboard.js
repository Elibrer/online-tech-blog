
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
let postList;
let deletePost;
let editPost;

if (window.location.pathname === "/dashboard") {
  homeModal = document.querySelector("#home-modal");
  dashModalCloseButtons = document.querySelectorAll(".dash-modal-close");
  postElements = document.querySelectorAll(".post-list-item");
  postTitle = document.querySelector("#post-title");
  postContent = document.querySelector("#post-content");
  postAuthor = document.querySelector("#post-author");
  postDate = document.querySelector("#post-date");
  postSubmit = document.querySelector("#post-submit");
  createPostText = document.querySelector("#create-post-text");
  currentUserName = document.querySelector("#current-user-name");
  createPostTitle = document.querySelector("#create-post-title");
  postList = document.querySelector("#post-list");
  loggedIn = document.getElementById("logged-in");
  editPost = document.querySelector("#edit-post");
  deletePost = document.querySelector("#delete-post");
  if (loggedIn.innerHTML === "true") {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
}

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

const getPost = async (currentPostId) => {
  return fetch(`/api/posts/${currentPostId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

handlePostClick = async (event, currentPostId) => {
  event.preventDefault();

  const response = await getPost(currentPostId);
  if (response.ok) {
    deletePost.addEventListener("click", async function (event) {
      confirm("Are you sure you want to delete this post?");

      const response = await fetch(`/api/posts/${currentPostId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        clearModal();
        location.reload();
      } else {
        alert("Failed to delete post");
      }
    });

    homeModal.style.display = "block";
    currentPost = await response.json();

    const currentPostContent = currentPost.post_content.replace(/\n/g, "<br>");

    postTitle.value = currentPost.post_name;
    postContent.innerHTML = currentPostContent;
    postAuthor.innerHTML = currentPost.user.username;
    postDate.innerHTML = currentPost.post_date;

    if (currentPost.comments.length > 0) {
      postCommentHandler(currentPost);
    }
  } else {
    return;
  }
};

const clearModal = () => {
  postTitle.innerHTML = "";
  postContent.innerHTML = "";
  postAuthor.innerHTML = "";
  postDate.innerHTML = "";
  homeModal.style.display = "none";
};

const newPostHandler = async (event) => {
  event.preventDefault();
  if (createPostText.value === "") {
    alert("Please enter new post content.");
    return;
  }
  if (createPostTitle.value === "") {
    alert("Please enter new post title.");
    return;
  }
  if (loggedIn) {
    const newPostData = {
      post_name: createPostTitle.value,
      post_content: createPostText.value,
      user_id: currentUserName.getAttribute("data-id"),
    };
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(newPostData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      //const post = await getPost(currentPostId);
      let newPost = await response.json();
      location.reload();
    } else {
      alert("Failed to add comment");
    }
  }
};

const editPostHandler = async (event) => {
    event.preventDefault();

    if (postTitle.value === "") {
        alert("Please enter a post title.");
        clearModal();
        handlePostClick(event, currentPostId);
        return;;
    }
    if (postContent.innerHTML === "") {
        alert("Please enter post content.");
        clearModal();
        handlePostClick(event, currentPostId);
        return;
    }

    if (postContent.innerHTML === currentPost.post_content && postTitle.value === currentPost.post_name) {
        alert("Please make changes to post before submitting.");
        clearModal();
        handlePostClick(event, currentPostId);
        return;
    }

    const updatePostData = {
        post_name: postTitle.value,
        post_content: postContent.innerHTML,
    };
    const response = await fetch(`/api/posts/${currentPostId}`, {
        method: "PUT",
        body: JSON.stringify(updatePostData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        clearModal();
        location.reload();
    } else {
        alert("Failed to update post");
    }
};

const postCommentHandler = async (currentPost) => {
  const commentList = document.querySelector(".comment-id");
  commentList.innerHTML = "";
  currentPost.comments.forEach((comment) => {
    const commentContainer = document.createElement("li");
    commentContainer.setAttribute(
      "class",
      "list-group-modal list-group-item comment-group rounded"
    );

    const userContainer = document.createElement("div");
    userContainer.setAttribute(
      "class",
      "user-container border-bottom blog-post justify-content-between p-2"
    );

    const commentAuthor = document.createElement("h5");
    const commentDate = document.createElement("p");
    commentAuthor.setAttribute("class", "comment-display");
    commentDate.setAttribute("class", "comment-display");

    const commentContentContainer = document.createElement("div");
    const commentContent = document.createElement("p");
    commentContent.setAttribute("class", "border-top p-2 m-0");

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
};

postElements.forEach((postElement) => {
  postElement.addEventListener("click", async function (event) {
    currentPostId = event.currentTarget.getAttribute("data-id");
    await handlePostClick(event, currentPostId);
  });
});

postSubmit.addEventListener("click", newPostHandler);

dashModal = document.querySelector("#dash-modal");
if (dashModal !== null) {
  clearModal();
}

dashModalCloseButtons.forEach((button) => {
  button.addEventListener("click", clearModal);
});

window.onclick = function (event) {
  if (event.target == homeModal) {
    clearModal();
  }
};

editPost.addEventListener("click", editPostHandler);

