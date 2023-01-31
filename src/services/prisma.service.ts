import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { tagsData } from './constants/tags.constants';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const tagsCount = await this.tag.count();
    if (!tagsCount) {
      const createTagsData = tagsData.map((tag) => ({ tag_name: tag.label }));
      await this.tag.createMany({
        data: createTagsData,
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
