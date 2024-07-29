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


  it('should return all posts if no limit and skip are provided', () => {
    const foundPosts = postsService.findMany();
    expect(foundPosts).toBeDefined();
  });

  it('should return the limited number of posts', () => {
    const totalPosts = postsService.findMany();
    const foundPosts = postsService.findMany({ limit: 2 });
    if(totalPosts.length > 2) {
      expect(foundPosts.length).toBe(2);
    } else {
      expect(foundPosts.length).toBe(totalPosts.length);
    }
  });

  it('should skip the specified number of posts', () => {
    const totalPosts = postsService.findMany();
    const foundPosts = postsService.findMany({ skip: 1 });
    expect(foundPosts.length).toBe(totalPosts.length - 1);
  });

  it('should skip and limit the posts', () => {
    const totalPosts = postsService.findMany();
    const foundPosts = postsService.findMany({ skip: 1, limit: 1 });

    if(totalPosts.length > 2) {
      expect(foundPosts.length).toBe(1);
    } else {
      expect(foundPosts.length).toBe(0);
    }

  });

  it('should return an empty array if skip is greater than the number of posts', () => {
    const totalPosts = postsService.findMany();
    const foundPosts = postsService.findMany({ skip: 10 });

    if (totalPosts.length > 10) {
      expect(foundPosts.length).toBe(totalPosts.length - 10);
    }
    else {
      expect(foundPosts.length).toBe(0);
    }
    
  });

  it('should return the remaining posts if limit exceeds the number of remaining posts after skip', () => {
    const totalPosts = postsService.findMany();
    const skip = 2;
    const limit = 5;
    const foundPosts = postsService.findMany({ skip, limit });
  
    if (totalPosts.length <= skip) {
      expect(foundPosts.length).toBe(0);
    } else {
      const remainingPostsAfterSkip = totalPosts.length - skip;
      const expectedPosts = remainingPostsAfterSkip < limit ? remainingPostsAfterSkip : limit;
      expect(foundPosts.length).toBe(expectedPosts);
    }
  });

});