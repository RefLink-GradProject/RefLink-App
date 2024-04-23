import { Question, Response, Candidate, Referencer, Posting } from './Types';

export const response1: Response = { guid: 301, content: "John is a skilled developer." };
export const response2: Response = { guid: 302, content: "John communicates well with the team." };
export const response3: Response = { guid: 501, content: "I have 3 years of experience with React." };
export const response4: Response = { guid: 502, content: "I am proficient in React and have built several projects." };
export const response5: Response = { guid: 503, content: "I prioritize tasks and communicate effectively to meet deadlines." };
export const response6: Response = { guid: 504, content: "I thrive under pressure and can efficiently manage my time." };
export const response7: Response = { guid: 701, content: "Strong problem-solving skills." };
export const response8: Response = { guid: 702, content: "A quick learner." };
export const response9: Response = { guid: 801, content: "Has excellent communication skills." };
export const response10: Response = { guid: 802, content: "Very detail-oriented." };
export const response11: Response = { guid: 901, content: "Highly organized." };
export const response12: Response = { guid: 902, content: "A team player." };

const referencer1: Referencer = { guid: 201, name: "Jane Smith", email: "jane@example.com", responses: [response1, response2] };
const candidate1: Candidate = { guid: 101, name: "John Doe", email: "john@example.com", referencers: [referencer1] };
const candidate2: Candidate = { guid: 102, name: "Alice Johnson", email: "alice@example.com", referencers: [] };

referencer1.responses!.push(response3, response4);
const referencer2: Referencer = { guid: 202, name: "Bob Brown", email: "bob@example.com", responses: [response5, response6] };
candidate2.referencers.push(referencer2);

export const referencer3: Referencer = { guid: 203, name: "Michael Johnson", email: "michael@example.com", responses: [response7, response8] };
export const candidate3: Candidate = { guid: 103, name: "Emby Brown", email: "emily@example.com", referencers: [referencer3, referencer2, referencer1] };
export const candidate4: Candidate = { guid: 104, name: "David Smith", email: "david@example.com", referencers: [] };


export const referencer4: Referencer = { guid: 204, name: "Sara Miller", email: "sara@example.com", responses: [response11, response12] };
candidate4.referencers.push(referencer4);

export const question1: Question = { guid: 401, content: "What experience do you have with React?", responses: [response3, response4] };
export const question2: Question = { guid: 402, content: "How do you handle tight deadlines?", responses: [response5, response6] };
export const question3: Question = { guid: 403, content: "What projects have you worked on in the past?" };
export const question4: Question = { guid: 404, content: "How do you handle conflicts in a team?" };

export const posting1: Posting = {
    guid: 2,
    title: "Java frontend developer",
    description: "We are looking for a java developer to join our team. Who can independently code and write tests",
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

export const posting3: Posting = {
    guid: 1,
    title: "Software Engineer Position",
    description: "We are hiring a software engineer to join our team.",
    candidates: [candidate1, candidate2],
    questions: [question1, question2]
};

export const postings: Posting[] = [posting1, posting2, posting3]

