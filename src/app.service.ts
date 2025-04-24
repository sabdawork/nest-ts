import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sabda Nest API';
  }

  healthCheck(): { message: string } {
    return { message: 'OK!' };
  }

  errorCheck() {
    try {
      throw new Error('error check');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new BadRequestException((error as any)?.message ?? '');
    }
  }
}
