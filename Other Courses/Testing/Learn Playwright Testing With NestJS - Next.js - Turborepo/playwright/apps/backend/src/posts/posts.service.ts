import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;
  
  findAll() {
    return this.posts;
  }

  createPost(createPostDto: CreatePostDto) {
    const newPost: Post = {
      id: this.idCounter++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }
}
