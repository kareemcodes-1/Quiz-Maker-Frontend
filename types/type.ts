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
}

export type Memory = {
    _id: string;
    name: string;
    projectId: Project;
    image: string
    createdAt: Date;
}

export type Goal = {
    _id: string;
    name: string;
    projectId: Project;
    time: string;
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
    color: string;
}