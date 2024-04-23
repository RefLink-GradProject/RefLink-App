import { Question, Response, Candidate, Referencer, Posting } from './Types';


const response7: Response = { guid: 701, content: "She has strong problem-solving skills." };
const response8: Response = { guid: 702, content: "She is a quick learner." };
const response9: Response = { guid: 801, content: "He has excellent communication skills." };
const response10: Response = { guid: 802, content: "He is very detail-oriented." };
const response11: Response = { guid: 901, content: "She is highly organized." };
const response12: Response = { guid: 902, content: "She is a team player." };

const referencer3: Referencer = { guid: 203, name: "Michael Johnson", email: "michael@example.com", responses: [response7, response8] };
const candidate3: Candidate = { guid: 103, name: "Emily Brown", email: "emily@example.com", referencers: [referencer3] };
const candidate4: Candidate = { guid: 104, name: "David Smith", email: "david@example.com", referencers: [] };

referencer3.responses.push(response9, response10);
const referencer4: Referencer = { guid: 204, name: "Sara Miller", email: "sara@example.com", responses: [response11, response12] };
candidate4.referencers.push(referencer4);

const question3: Question = { guid: 403, content: "What projects have you worked on in the past?" };
const question4: Question = { guid: 404, content: "How do you handle conflicts in a team?" };

const posting1: Posting = {
    guid: 2,
    title: "Data Analyst Position",
    description: "We are looking for a data analyst to join our analytics team.",
    candidates: [candidate3, candidate4],
    questions: [question3, question4]
};

const posting2: Posting = {
    guid: 3,
    title: "Marketing Manager Position",
    description: "We are hiring a marketing manager to lead our marketing team.",
    candidates: [],
    questions: []
};

console.log(posting1);
console.log(posting2);
