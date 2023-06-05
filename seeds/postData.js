const { Post } = require("../models");

const postData = [
  {
    post_name: "No post for the wicked.",
    post_content:
      "Creating engaging blog posts is not an easy task, but it's a necessary one. In today's digital age, content is king, and maintaining an active blog is crucial for businesses and individuals alike. A well-crafted blog post has the power to captivate readers, share valuable insights, and leave a lasting impact.\n\nWhen it comes to writing compelling content, there are a few key elements to keep in mind. First and foremost, having a catchy title is essential. The title serves as a hook, enticing readers to click and delve into the post. In our case, \"No post for the wicked\" grabs attention, hinting at a unique perspective or intriguing topic.\n\nNext, the content itself should be informative, engaging, and well-structured. It's important to provide valuable information or offer a fresh perspective on a subject matter. Whether it's sharing personal experiences, providing expert advice, or analyzing current trends, the content should be relevant to the target audience.\n\nMoreover, the writing style should be clear, concise, and easy to follow. Break down complex ideas into digestible paragraphs and use headings, bullet points, and visuals to enhance readability. A reader-friendly format ensures that the audience stays engaged and can easily navigate through the post.\n\nAdditionally, incorporating a personal touch can make the blog post more relatable and authentic. Sharing personal anecdotes, opinions, or experiences can help establish a connection with the readers and make the content more memorable. It's the human element that adds depth and resonance to the words on the screen.\n\nLastly, don't forget the importance of proofreading and editing. A well-polished blog post demonstrates professionalism and attention to detail. Take the time to review the content for grammar, spelling, and coherence. A flawless piece of writing reflects positively on the author and enhances the overall reading experience.\n\nIn conclusion, crafting a captivating blog post requires careful consideration of the title, informative content, engaging writing style, personal touch, and meticulous editing. Remember, there's no post for the wicked; only those who put in the effort to create exceptional content will reap the rewards of an engaged and loyal audience. So, grab your keyboard, let your creativity flow, and start writing your next masterpiece.",
    post_date: "2023/06/05",
    user_id: 1,
  },
  {
    post_name: "The Importance of Regular Exercise!",
    post_content:
      "Regular exercise is crucial for maintaining a healthy lifestyle. It helps improve cardiovascular health, strengthen muscles, and enhance flexibility. Additionally, exercise releases endorphins, which are natural mood boosters. Whether it's going for a run, practicing yoga, or participating in team sports, finding an exercise routine that suits your preferences is key. Remember, consistency is key when it comes to reaping the benefits of exercise.",
    post_date: "2022/01/01",
    user_id: 2,
  },
  {
    post_name: "Beep Beep!",
    post_content:
      "Sick of seeing Max Verstappen win F1 Grand Prix's. Time for someone new!",
    post_date: "2023/05/01",
    user_id: 2,
  },
  {
    post_name: "The Benefits of Mindfulness and Meditation.",
    post_content:
      "Mindfulness and meditation have gained popularity for their positive impact on mental and emotional well-being. By practicing mindfulness, we learn to live in the present moment, cultivate self-awareness, and reduce stress. Meditation provides a space for relaxation, introspection, and mental clarity. Incorporating mindfulness and meditation into our daily routines can enhance our overall quality of life, promote a sense of calmness, and improve our ability to cope with challenges.",
    post_date: "2023/05/05",
    user_id: 2,
  },
  {
    post_name: "Exploring the Wonders of Nature.",
    post_content:
      "Nature has a way of captivating our senses and inspiring awe. From breathtaking landscapes to diverse wildlife, there is so much to explore and appreciate. Taking a hike through a scenic trail, going camping under the starry sky, or simply sitting by a serene lake can provide a much-needed break from our busy lives. Nature offers us tranquility, a chance to reconnect with ourselves, and a reminder of the beauty that surrounds us!",
    post_date: "2021/05/18",
    user_id: 3,
  },
  {
    post_name: "Mastering the Art of Time Management.",
    post_content:
      "Time management is an essential skill for achieving productivity and reducing stress. By prioritizing tasks, setting realistic goals, and avoiding procrastination, we can make the most of our time. Effective time management allows for better work-life balance, increased efficiency, and improved overall well-being. Whether it's using productivity apps or creating a daily schedule, finding a time management strategy that works for you can greatly enhance your productivity and satisfaction.",
    post_date: "2021/06/02",
    user_id: 4,
  },
  {
    post_name: "Unleashing Your Creativity Through Art!",
    post_content:
      "Artistic expression is a powerful outlet for creativity and self-discovery. Engaging in various art forms, such as painting, drawing, or playing a musical instrument, allows us to tap into our imagination and express our emotions. Art has the ability to evoke emotions, tell stories, and connect people across cultures. Whether you consider yourself an artist or not, exploring your creative side can be a fulfilling and enriching experience.",
    post_date: "2018/12/25",
    user_id: 5,
  },
];

const seedPost = async () => {
  for (const post of postData) {
    await Post.create(post, { individualHooks: true });
  }
};

module.exports = seedPost;
