export type Todo = {
    _id: string;
    projectId: Project;
    name: string;
    completed: boolean;
    date: string | null;
    time: string;
}

export type Focus = {
    _id: string;
    content: string;
    date: string | null;
}

export type WIL = {
    _id: string;
    content: string;
    projectId: Project;
    createdAt: string;
}

export type Gratitude = {
    _id: string;
    content: string;
    createdAt: string;
}

export type Philosophy = {
    readonly _id: string;
    content: string;
    createdAt: string;
}

export type Memory = {
    _id: string;
    name: string;
    projectId: Project;
    image: string;
    steps: string,
    mins: string;
    kilometers: string;
    calories: string;
    createdAt: string;
}

export type Goal = {
    _id: string;
    name: string;
    projectId: Project;
    time: string;
    startDeadlineDate: Date;
    endDeadlineDate: Date;
    image: string;
    completed: boolean;
}

export type Plan = {
    _id: string;
    content: string;
    projectId: Project;
}

export type Project = {
    _id: string;
    name: string;
    emoji: string;
}