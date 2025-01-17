import { Injectable } from '@nestjs/common';

export interface Post {
  id: string;
  text: string;
  date: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private lastPostId = 1;

  create(post: Omit<Post, 'id' | 'date'>) {
    const postWithIdAndDate: Post = {
      ...post,
      id: this.lastPostId.toString(),
      date: new Date().toISOString(),
    };

    this.lastPostId++;

    this.posts.push(postWithIdAndDate);

    return postWithIdAndDate;
  }

  find(postId: string) {
    return this.posts.find(({ id }) => id === postId);
  }

  findMany(options?: { limit?: number; skip?: number }) {
    const { limit, skip } = options || {};
    return this.posts.slice(skip || 0, (skip || 0) + (limit || this.posts.length));
  }
}