
export type Posting = {
    guid: number;
    title: string;
    description: string;
    candidates: Candidate[];
    questions: Question[];
}

export type Candidate = {
    guid: number;
    name: string;
    email: string;
    referencers: Referencer[];
}

export type Referencer = {
    guid?: number;
    name: string;
    email: string;
    responses?: Response[];
}

export type Response = {
    guid: number;
    content: string;
}

export type Question = {
    guid: number; 
    content: string;
    responses?: Response[];
}