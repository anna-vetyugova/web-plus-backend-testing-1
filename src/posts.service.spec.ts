import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // реализуйте тест-кейс
    const newPost =  postsService.create(post);

    expect(newPost).toBeDefined();
   
    expect(newPost).toEqual(expect.objectContaining({
      id: expect.any(String),
      date: expect.any(String),
      text: post.text
    }))
    
  });

  it('should find a post', () => {
    // реализуйте тест-кейс
    const newPost =  postsService.create(post);
    expect(newPost).toBeDefined();

    const foundPost = postsService.find(newPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(newPost.id);
    expect(foundPost?.text).toBe(newPost.text);
    expect(foundPost?.date).toBe(newPost.date);
  });
});