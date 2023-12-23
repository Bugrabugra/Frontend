import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId
      }
    });
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        id: bookmarkId
      }
    });

    return bookmark;
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto
      }
    });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException("Access to resources denied");
    }

    return this.prisma.bookmark.update({
      where: {
        userId,
        id: bookmarkId
      },
      data: {
        ...dto
      }
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException("Access to resources denied");
    }

    return this.prisma.bookmark.delete({
      where: {
        userId,
        id: bookmarkId
      }
    });
  }
}
