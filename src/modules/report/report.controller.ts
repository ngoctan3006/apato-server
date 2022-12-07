import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Auth } from 'src/decorators/authentication.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ReportService } from './report.service';
interface CreateReportDto {
  commentId: number;
}
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Auth('ADMIN')
  @Get()
  async getListReport() {
    return await this.reportService.getListReport();
  }

  @Auth('ADMIN')
  @Get(':id')
  async getReportDetail(@Param('id') reportId: string) {
    return await this.reportService.getReportDetail(+reportId);
  }

  @Auth()
  @Post()
  async createReport(
    @Body() input: CreateReportDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.reportService.createReport(input.commentId, userId);
  }
}
