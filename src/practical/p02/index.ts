import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserPost {
  id: number;
  title: string;
}

/**
 * Subject 2 — Filter Posts By User
 * @param userId
 */
export async function getPostsByUser(userId: number): Promise<UserPost[]> {
  try {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    if (!posts || posts.length === 0) {
      return [];
    }

    const filteredPosts = posts
      .filter((post: Post) => post.userId === userId)
      .map((post: Post): UserPost => ({
        id: post.id,
        title: post.title,
      }));

    return filteredPosts;
  } catch (error) {
    return [];
  }
}