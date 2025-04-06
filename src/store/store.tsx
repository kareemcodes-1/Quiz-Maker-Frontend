import {create} from "zustand";

import {Quiz, Topic} from "../../types/type"

type State = {
    topics: Topic[];
    quizzes: Quiz[];
    topic: Topic | null;
    setTopics: (topics: Topic[]) => void;
    setQuizzes: (quizzes: Quiz[]) => void;
    setTopic: (topic: Topic) => void;
}

export const useStore = create<State>((set) => ({
    topics: [],
    quizzes: [],
    topic: null,
    setQuizzes: (data) => set(() => ({
        quizzes: data,
    })),
    setTopics: (topics) => set(() => ({
        topics: topics,
    })),
    setTopic: (topic) => set(() => ({
        topic
    }))
}))