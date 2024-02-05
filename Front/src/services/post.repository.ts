import { Post, PostNoId } from '../models/post';
import { Repository } from './repository';

export class ApiPostRepository implements Repository<Post> {
  urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async create(item: PostNoId, token: string): Promise<Post> {
    const response = await fetch(`${this.urlBase}/post/create`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async getUserPosts(id: string, token: string): Promise<Post[]> {
    const response = await fetch(`${this.urlBase}/post/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async delete(id: string, token: string): Promise<string> {
    const response = await fetch(`${this.urlBase}/post/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    return id;
  }

  async update(
    newData: Partial<Post>,
    id: string,
    token: string
  ): Promise<Post> {
    const response = await fetch(`${this.urlBase}/post/patch/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }
}
