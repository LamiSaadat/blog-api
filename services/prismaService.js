const { PrismaClient } = require("@prisma/client");

class PrismaClass {
  static prisma = new PrismaClient()
}

class UserClass extends PrismaClass {
  static async findUser(email) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  static async createUser(firstName, lastName, email, hashedPassword) {
    return await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  }

  static async getUserProfile(userId) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        email: true,
        posts: true,
        followedBy: true,
        following: true,
      },
    });
  }

  static async getUserAccountDetails(userId) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        email: true,
        password: true,
        posts: true,
        followedBy: true,
        following: true,
        Like: true,
        Comment: true,
      },
    });
  }
}

class PostClass extends PrismaClass {
  static async getAllPosts() {
    return await this.prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
  }

  static async getSinglePostWithDetails(postId) {
    return await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
  }

  static async findUniquePost(userId) {
    return await this.prisma.post.findUnique({
      where: { id: userId },
    });
  }

  static async createPost(userId, title, content, published) {
    return await this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: userId,
          },
        },
        published,
      },
    });
  }

  static async editPost(userId, title, content) {
    return await this.prisma.post.update({
      where: { id: userId },
      data: {
        title,
        content,
        published: !postData.published,
      },
    });
  }

  static async deletePost(userId) {
    return await this.prisma.post.delete({
      where: { id: userId },
      include: {
        author: true,
      },
    });
  }

  static async getDrafts(userId) {
    return await this.prisma.post.findMany({
      where: {
        authorId: userId,
        published: false,
      },
      include: {
        author: true,
      },
    });
  }
}

class CommentClass extends PrismaClass {
  static async createComment(authorId, postId, comment) {
    return await this.prisma.comment.create({
      data: {
      userId: authorId,
      postId: Number(postId),
      content: comment,
    },
  })
  }
}

class FollowClass extends PrismaClass {
  static async createNewFollower(followerId, followingId) {
    return await this.prisma.user.update({
      where: {
        id: followerId,
      },
      data: {
        following: {
          create: [
            {
              following: {
                connect: {
                  id: followingId,
                },
              },
            },
          ],
        },
      },
    });
  }

  static async unfollow(followerId, followingId) {
    return await this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  static async getAllFollowers(userId) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followedBy: true,
      },
    });
  }
}

class LikeClass extends PrismaClass {
  static async createLike(userId, postId, like) {
    return await this.prisma.like.create({
      data: {
        userId,
        postId,
        like,
      },
    });
  }

  static async removeLike(userId, postId) {
    return await this.prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}

module.exports = {
  UserClass,
  PostClass,
  CommentClass,
  FollowClass,
  LikeClass
}