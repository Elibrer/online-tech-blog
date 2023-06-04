const { Post } = require('../models');

const postData = [
  {
    post_name: "This blog SUCKS!",
    post_content: "This blog is the worst blog I've ever read!",
    post_date: "2022/01/01",
    user_id: 2,
  },
  {
    post_name: "Love it dude!!",
    post_content: "Totally, like, the best blog ever!",
    post_date: "2021/05/18",
    user_id: 3,
  },
  {
    post_name: "xX_BlogDestroyer_Xx",
    post_content: "U hav been DESTROYED by the Blog Destroyer",
    post_date: "2021/06/02",
    user_id: 4,
  },
  {
    post_name: "Ssssssunlight!",
    post_content: "ssssssss I'm a lizard man sss",
    post_date: "2018/12/25",
    user_id: 5,
  }
];


const seedPost = async () => {
  for (const post of postData) {
    await Post.create(post, {individualHooks: true});
  }
}

module.exports = seedPost;