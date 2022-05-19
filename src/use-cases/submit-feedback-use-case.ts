import { IMailAdapter } from "../adapters/mail-adapter";
import { IFeedbacksRepository } from "../repositories/feedbacks-repositories";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    const feedback = await this.feedbacksRepository.create({
      comment,
      type,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 18px; color: #222">`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });

    return feedback;
  }
}
