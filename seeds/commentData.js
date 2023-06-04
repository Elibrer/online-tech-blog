const { Comment } = require('../models');

const commentData = [
  {
    comment_content: "This is a comment",
    comment_date: "2021/06/02",
    user_id: 1,
    post_id: 1
  },
  {
    comment_content: "This is another comment",
    comment_date: "2021/06/02",
    user_id: 2,
    post_id: 2
  },
  {
    comment_content: "This is a third comment",
    comment_date: "2021/06/02",
    user_id: 3,
    post_id: 3
  },
  {
    comment_content: "This is a fourth comment on post 3",
    comment_date: "2021/06/02",
    user_id: 4,
    post_id: 3
  },
  {
    comment_content: "This is a fifth comment on post 4",
    comment_date: "2021/06/02",
    user_id: 1,
    post_id: 4
  }
];

const seedComment = async () => {
  for (const comment of commentData) {
    await Comment.create(comment, {individualHooks: true});
  }
}

module.exports = seedComment;