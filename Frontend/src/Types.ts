export type Posting = {
  guidId: string;
  title: string;
  description: string;
  candidates?: Candidate[];
  questions?: Question[];
};

export type PostingRequest = {
  employerGuid: string;
  title: string;
  description: string;
};

export type Candidate = {
  guidId: string;
  name: string;
  email: string;
  referencers: Referencer[];
};

export type CandidateWithDetails = {
  guidId?: string;
  name: string;
  email: string;
  referencers: ReferencerInCandidateDetails[];
};

export type ReferencerInCandidateDetails = {
  name: string;
  guidId?: string;
  responses: ResponseWithQuestionContent[];
};

export type ResponseWithQuestionContent = {
  questionContent: string;
  questionGuidId: string;
  responseContent: string;
  responseGuidId: string;
};

export type Referencer = {
  guidId?: string;
  name: string;
  email: string;
  responses?: Response[];
};

export type ReferencerRequest = {
  candidateGuid: string;
  name: string;
  email: string;
};

export type Response = {
  guidId: string;
  content: string;
};

export type Question = {
  guidId: string;
  content: string;
  responses?: Response[];
};

export type QuestionRequest = {
  postingGuid: string;
  content: string;
};

export type Employer = {
  guidId: string;
  name: string;
  company: string;
  email: string;
  postings: Posting[];
};
export type CreateEmployer = {
  name: string;
  email: string;
  company: string;
};
