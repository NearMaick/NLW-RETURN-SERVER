export interface IFeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

type Feedback = {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
};

export interface IFeedbacksRepository {
  create: (data: IFeedbackCreateData) => Promise<Feedback>;
}
