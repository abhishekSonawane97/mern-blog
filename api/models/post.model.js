import mongoose from "mongoose";



const postSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.tvabjwNjlbY0mkD9OQbLZAHaE8&pid=Api&P=0&h=220",
      },
      category: {
        type: String,
        default: 'uncategorized',
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

const Post = mongoose.model('post', postSchema);

export default Post;

