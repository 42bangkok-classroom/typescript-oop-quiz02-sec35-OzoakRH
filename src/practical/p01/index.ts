import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface EdgePost {
  id: number;
  title: string;
}

async function getEdgePosts(): Promise<EdgePost[]> {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const response = await axios.get<Post[]>(url);
    const data = response.data;

    if (data.length === 0) return [];
    
    const firstPost = data[0];
    const lastPost = data[data.length - 1];

    return [firstPost, lastPost].map(({ id, title }) => ({
      id,
      title,
    }));
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
}