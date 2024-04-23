import { Question, Response, Candidate, Referencer, Posting } from './Types';


export const response7: Response = { guid: 701, content: "She has strong problem-solving skills." };
export const response8: Response = { guid: 702, content: "She is a quick learner." };
export const response9: Response = { guid: 801, content: "He has excellent communication skills." };
export const response10: Response = { guid: 802, content: "He is very detail-oriented." };
export const response11: Response = { guid: 901, content: "She is highly organized." };
export const response12: Response = { guid: 902, content: "She is a team player." };

export const referencer3: Referencer = { guid: 203, name: "Michael Johnson", email: "michael@example.com", responses: [response7, response8] };
export const candidate3: Candidate = { guid: 103, name: "Emily Brown", email: "emily@example.com", referencers: [referencer3] };
export const candidate4: Candidate = { guid: 104, name: "David Smith", email: "david@example.com", referencers: [] };

referencer3.responses.push(response9, response10);
export const referencer4: Referencer = { guid: 204, name: "Sara Miller", email: "sara@example.com", responses: [response11, response12] };
candidate4.referencers.push(referencer4);

export const question3: Question = { guid: 403, content: "What projects have you worked on in the past?" };
export const question4: Question = { guid: 404, content: "How do you handle conflicts in a team?" };

export const posting1: Posting = {
    guid: 2,
    title: "Java frontend developer",
    description: "We are looking for a java developer to join our team.",
    candidates: [candidate3, candidate4],
    questions: [question3, question4]
};

export const posting2: Posting = {
    guid: 3,
    title: ".NET senior web app developer",
    description: "We are hiring a dotnet developer to lead our team.",
    candidates: [],
    questions: []
};

export const postings: Posting[] = [posting1, posting2]

