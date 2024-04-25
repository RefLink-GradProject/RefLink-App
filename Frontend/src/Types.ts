
export type Posting = {
    guidId: string;
    title: string;
    description: string;
    candidates: Candidate[];
    questions: Question[];
}

export type Candidate = {
    guid: string;
    name: string;
    email: string;
    referencers: Referencer[];
}

export type Referencer = {
    guid?: string;
    name: string;
    email: string;
    responses?: Response[];
}

export type Response = {
    guid: string;
    content: string;
    question: Question;
}

export type Question = {
    guid: string; 
    content: string;
    responses?: Response[];
}