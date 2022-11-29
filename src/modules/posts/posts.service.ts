import { UpdatePostDto } from './dto/update-post.dto';
import { PostFilter } from './dto/post-filter.dto';
import { PrismaService } from './../../services/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { apato, user, ROLE } from '@prisma/client';
import { CommentPost } from './dto/comment.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(
    input: CreatePostDto,
    user_id: number,
    filePaths: string[],
  ): Promise<apato> {
    const new_post = await this.prisma.apato.create({
      data: {
        user_id,
        title: input.title,
        price: +input.price,
        detail: input.detail,
        image: filePaths,
        address: input.address,
        area: +input.area,
      },
      include: {
        creator: true,
      },
    });
    delete new_post.creator.password;
    return new_post;
  }

  async getPostInfo(post_id: number): Promise<apato> {
    const response = await this.prisma.apato.findUnique({
      where: {
        id: post_id,
      },
      include: {
        creator: true,
        comments: true,
      },
    });
    const rating = await this.prisma.apato_comment.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        apatoId: post_id,
      },
    });
    delete response.creator.password;
    return {
      ...response,
      total_rating: rating._avg.rating,
    };
  }

  async getAllPosts(filter: PostFilter): Promise<apato[]> {
    const findFilter = {};
    if (filter.priceStart && filter.priceEnd) {
      findFilter['price'] = { gte: filter.priceStart, lte: filter.priceEnd };
    } else if (filter.priceStart) {
      findFilter['price'] = { gte: filter.priceStart };
    } else if (filter.priceEnd) {
      findFilter['price'] = { lte: filter.priceEnd };
    }
    if (filter.areaStart && filter.areaEnd) {
      findFilter['area'] = { gte: filter.areaStart, lte: filter.areaEnd };
    } else if (filter.areaStart) {
      findFilter['area'] = { gte: filter.areaStart };
    } else if (filter.areaEnd) {
      findFilter['area'] = { lte: filter.areaEnd };
    }
    if (filter.searchValue) {
      findFilter['OR'] = [
        {
          title: {
            contains: filter.searchValue,
          },
        },
        {
          address: {
            contains: filter.searchValue,
          },
        },
      ];
    }
    return await this.prisma.apato.findMany({
      where: findFilter,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            email: true,
          },
        },
      },
    });
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
    user: user,
    filePaths: string[],
  ): Promise<apato> {
    const post = await this.prisma.apato.findUnique({
      where: {
        id: postId,
      },
      include: {
        creator: true,
      },
    });
    if (user.id !== post.creator.id && user.role !== ROLE.ADMIN) {
      throw new ForbiddenException('ONLY ADMIN AND CREATOR CAN UPDATE');
    }
    const updateData = {};
    if (filePaths.length !== 0) {
      updateData['image'] = filePaths;
    }
    if (updatePostDto.address) {
      updateData['address'] = updatePostDto.address;
    }
    if (updatePostDto.area) {
      updateData['area'] = +updatePostDto.area;
    }
    if (updatePostDto.detail) {
      updateData['detail'] = updatePostDto.detail;
    }
    if (updatePostDto.price) {
      updateData['price'] = +updatePostDto.price;
    }
    if (updatePostDto.title) {
      updateData['title'] = updatePostDto.title;
    }
    const response = await this.prisma.apato.update({
      where: {
        id: postId,
      },
      data: updateData,
      include: {
        creator: true,
      },
    });
    delete response.creator.password;
    return response;
  }

  async deletePost(user: user, postId: number) {
    const post = await this.prisma.apato.findUnique({
      where: {
        id: postId,
      },
      include: {
        creator: true,
      },
    });
    if (user.id !== post.creator.id && user.role !== ROLE.ADMIN) {
      throw new ForbiddenException('ONLY ADMIN AND CREATOR CAN DELETE');
    }
    return await this.prisma.apato.delete({
      where: {
        id: postId,
      },
    });
  }

  async commentPost(userId: number, postId: number, commentPost: CommentPost) {
    return await this.prisma.apato_comment.create({
      data: {
        userId,
        apatoId: postId,
        comment: commentPost.comment,
        rating: commentPost.rating,
      },
    });
  }
}