import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,
    // Inject postsRepository
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    // Inject metaOptionsRepository
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    // Inject TagsService
    private readonly tagsService: TagsService,
  ) { }

  // Creating new posts
  public async create(createPostDto: CreatePostDto) {
    // Find author from database based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Handle case when author is not found
    if (!author) {
      throw new NotFoundException(`User with ID ${createPostDto.authorId} not found`);
    }

    // Find tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    // return the post
    return this.postsRepository.save(post);
  }
  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        // author: true,
        // tags: true,
      },
    });

    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find the Tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // Find the Post
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    // Handle case when post is not found
    if (!post) {
      throw new NotFoundException(`Post with ID ${patchPostDto.id} not found`);
    }

    // Update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign the new tags
    post.tags = tags;

    // Save the post and return
    return this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // Delete the post
    await this.postsRepository.delete(id);

    // Confirmation
    return { deleted: true, id };
  }
}
