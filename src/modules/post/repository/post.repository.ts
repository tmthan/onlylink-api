import { BaseRepository } from 'src/database/repositories';
import { PostEntity, TagEntity } from '../entities';
import { EntityRepository, In, Like } from 'typeorm';
import { PostRequest } from '../dtos';
import { UserEntity } from 'src/modules/auth/entities';
import { POST_MODE_CONDITION } from '../constants';
import { hideLink } from '../helpers';

@EntityRepository(PostEntity)
export class PostRepository extends BaseRepository<PostEntity> {
  protected hideLinkResultList(result: PostEntity[], total: number) {
    return {
      data: result.map((post: PostEntity) => ({
        ...post,
        link: post.link ? hideLink(post.link) : post.link,
      })),
      total,
    };
  }

  async getPost(id: string) {
    return this.findOne(id, { relations: ['author', 'tags'] });
  }

  async getPosts(page: number = 1, perPage: number = 10) {
    const [result, total] = await this.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
      relations: ['author', 'tags'],
    });
    return this.hideLinkResultList(result, total);
  }

  async getPostByUser(
    userId: string,
    mode: POST_MODE_CONDITION,
    page: number = 1,
    perPage: number = 10,
  ) {
    if ((mode = POST_MODE_CONDITION.ALL)) {
      const [result, total] = await this.findAndCount({
        take: perPage,
        skip: perPage * (page - 1),
        where: {
          author: userId,
        },
        relations: ['author', 'tags'],
      });
      console.log(this.hideLinkResultList(result, total));
      return this.hideLinkResultList(result, total);
    }
    const [result, total] = await this.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        author: userId,
        mode,
      },
      relations: ['author', 'tags'],
    });
    return this.hideLinkResultList(result, total);
  }

  async getPostByTag(tag: TagEntity, page: number = 1, perPage: number = 10) {
    const [result, total] = await this.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        mode: POST_MODE_CONDITION.PUBLIC,
        tags: In([tag]),
      },
      relations: ['author', 'tags'],
    });
    return this.hideLinkResultList(result, total);
  }

  savePost(post: PostRequest, author: UserEntity, tags?: TagEntity[]) {
    return this.save({
      ...post,
      author,
      tags,
    });
  }

  deletePost(postId: string) {
    return this.softDelete(postId);
  }

  getLink(postId: string) {
    return this.findOne(postId, {
      select: ['link', 'author'],
      relations: ['author', 'tags'],
    });
  }
}
