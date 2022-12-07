import { PrismaService } from 'src/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  async getListReport() {
    return await this.prisma.report_request.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async getReportDetail(reportId: number) {
    return await this.prisma.report_request.findUnique({
      where: {
        id: reportId,
      },
      include: {
        comment: {
          include: {
            user: true,
          },
        },
        reporter: true,
      },
    });
  }
  async createReport(commentId: number, userId: number) {
    return await this.prisma.report_request.create({
      data: {
        user_id: userId,
        apato_comment_id: commentId,
      },
    });
  }
}
