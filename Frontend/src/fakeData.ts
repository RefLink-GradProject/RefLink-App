import { Question, Response, Candidate, Referencer, Posting, ReferencerWithQuestions} from './Types';

// Define questions
export const question1: Question = { guidId: "401", content: "What experience do you have with React?" };
export const question2: Question = { guidId: "402", content: "How do you handle tight deadlines?" };
export const question3: Question = { guidId: "403", content: "What projects have you worked on in the past?" };
export const question4: Question = { guidId: "404", content: "How do you handle conflicts in a team?" };

// Define responses with references to corresponding questions
export const response1: Response = { guidId: "301", content: "John is a skilled developer."};
export const response2: Response = { guidId: "302", content: "John communicates well with the team."};
export const response3: Response = { guidId: "501", content: "I have 3 years of experience with React." };
export const response4: Response = { guidId: "502", content: "I am proficient in React and have built se" };
export const response5: Response = { guidId: "503", content: "I prioritize tasks and communicate effectively to meet deadlines." };
export const response6: Response = { guidId: "504", content: "I thrive under pressure and can efficiently manage my time." };
export const response7: Response = { guidId: "701", content: "Strong problem-solving skills." };
export const response8: Response = { guidId: "702", content: "A quick learner." };
export const response9: Response = { guidId: "801", content: "Has excellent communication skills." };
export const response10: Response = { guidId: "802", content: "Very detail-oriented." };
export const response11: Response = { guidId: "901", content: "Highly organized." };
export const response12: Response = { guidId: "902", content: "A team player." };

// Define referencers with responses
export const referencer1: Referencer = {
    guidId: "201",
    name: "Jane Smith",
    email: "jane@example.com",
    responses: [response1, response5, response9]
};

const referencer2: Referencer = {
    guidId: "202",
    name: "Bob Brown",
    email: "bob@example.com",
    responses: [response2, response6, response10]
};

const referencer3: Referencer = {
    guidId: "203",
    name: "Michael Johnson",
    email: "michael@example.com",
    responses: [response3, response7, response11]
};

const referencer4: Referencer = {
    guidId: "204",
    name: "Sara Miller",
    email: "sara@example.com",
    responses: [response4, response8, response12]
};

// Define candidates with referencers
export const candidate1: Candidate = {
    guidId: "101",
    name: "John Doe",
    email: "john@example.com",
    referencers: [referencer1]
};

export const candidate2: Candidate = {
    guidId: "102",
    name: "Alice Johnson",
    email: "alice@example.com",
    referencers: [referencer2]
};

export const candidate3: Candidate = {
    guidId: "103",
    name: "Emby Brown",
    email: "emily@example.com",
    referencers: [referencer3, referencer2, referencer1]
};

export const candidate4: Candidate = {
    guidId: "104",
    name: "David Smith",
    email: "david@example.com",
    referencers: [referencer4]
};

// Define postings with candidates
export const posting1: Posting = {
    guidId: "2",
    title: "Java frontend developer",
    description: "We are looking for a Java developer to join our team. Who can independently code and write tests",
    candidates: [candidate3, candidate4],
    questions: [question3, question4]
};

export const posting2: Posting = {
    guidId: "3",
    title: ".NET senior web app developer",
    description: "We are hiring a .NET developer to lead our team.",
    candidates: [],
    questions: []
};

export const posting3: Posting = {
    guidId: "1",
    title: "Software Engineer Position",
    description: "We are hiring a software engineer to join our team.",
    candidates: [candidate1, candidate2],
    questions: [question1, question2]
};

// Export postings array
export const postings: Posting[] = [posting1, posting2, posting3];
// export const employer: Employer = {guidId: "1234", name: "Mathieas", company:"Salt", emial:"salt@gmail.com", postings:[posting1, posting2, posting3] }

export const referencerWithQuestions: ReferencerWithQuestions = { 
    name: "referencer1",
    guidId: "1001",
    questions: [
        { content: "This is a question", guidId: "070e678d-2639-48a0-bb2b-0267ab2d8503"},
        // { content: "quesstion2", guidId: "2"},
        // { content: "quesstion3", guidId: "3"},
    ],
    ratingQuestions: [
        { content: "rating1", guidId: "1q"},
        { content: "rating2", guidId: "2f"},
        { content: "rating3", guidId: "3g"},
    ]
  }