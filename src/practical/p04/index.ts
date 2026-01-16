import axios from 'axios';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

async function countCommentsByPost(): Promise<{ [key: number]: number }> {
  try {
    const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;

    if (!comments || comments.length === 0) {
      return {};
    }

    const result = comments.reduce((acc: { [key: number]: number }, comment) => {
      const postId = comment.postId;

      if (postId !== null && postId !== undefined) {
        acc[postId] = (acc[postId] || 0) + 1;
      }

      return acc;
    }, {});

    return result;
  } catch (error) {
    return {};
  }
}