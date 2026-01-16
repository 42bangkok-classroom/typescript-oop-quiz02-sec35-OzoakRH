import axios from 'axios';

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostWithCount {
  postId: number;
  title: string;
  totalComments: number;
}

export async function mapPostWithCommentCount(): Promise<PostWithCount[]> {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    if (!posts || posts.length === 0) {
      return [];
    }

    const result: PostWithCount[] = posts.map((post: Post) => {
      const commentCount = comments.filter((comment: Comment) => comment.postId === post.id).length;

      return {
        postId: post.id,
        title: post.title,
        totalComments: commentCount
      };
    });

    return result;
  } catch (error) {
    return [];
  }
}