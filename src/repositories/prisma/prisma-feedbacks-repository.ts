import { prisma } from "../../prisma";
import {
  IFeedbackCreateData,
  IFeedbacksRepository,
} from "../feedbacks-repositories";

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, type, screenshot }: IFeedbackCreateData) {
    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return feedback;
  }
}
