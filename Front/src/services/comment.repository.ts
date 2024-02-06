import { Comment, CommentNoId } from '../models/comment';
import { Repository } from './repository';

export class ApiCommentRepository implements Repository<Comment> {
  urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async create(item: CommentNoId, token: string): Promise<Comment> {
    const response = await fetch(`${this.urlBase}/comment/create`, {
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

  async getByPost(id: string, token: string): Promise<Comment[]> {
    const response = await fetch(`${this.urlBase}/comment/search/${id}`, {
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
}
