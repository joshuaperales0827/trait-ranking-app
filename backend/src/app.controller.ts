import { Controller, Post, Body } from '@nestjs/common';
import { computeScore }  from './computeScore';

@Controller()
export class AppController {
  @Post('score')
  calculateScore(@Body() body: { jobTraitRanking: string[]; applicantTraitRanking: string[] }) {
  return { score: computeScore(body.jobTraitRanking, body.applicantTraitRanking) };
}
}
