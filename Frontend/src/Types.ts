
export type Posting = {
    guidId: string;
    title: string;
    description: string;
    candidates?: Candidate[];
    questions?: Question[];
}

export type Candidate = {
    guidId: string;
    name: string;
    email: string;
    referencers: Referencer[];
}

export type CandidateWithDetails = {
    guidId?: string;
    name: string;
    email: string;
    referencers: ReferencerInCandidateDetails[];
}

export type ReferencerInCandidateDetails = {
    name: string;
    guidId?: string;
    responses: ResponseWithQuestionContent[];
}

export type ResponseWithQuestionContent = {
    questionContent: string;
    questionGuidId: string;
    responseContent: string;
    responseGuidId: string;
}


export type Referencer = {
    guidId?: string;
    name: string;
    email: string;
    responses?: Response[];
}

export type Response = {
    guidId: string;
    content: string;
}

export type Question = {
    guidId: string; 
    content: string;
    responses?: Response[];
}

export type Employer = {
    guidId: string;
    name: string;
    company: string;
    emial: string;
    postings: Posting[];
}