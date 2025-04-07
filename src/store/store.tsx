import {create} from "zustand";

import {Quiz, Topic} from "../../types/type"

type State = {
    topics: Topic[];
    quizzes: Quiz[];
    topic: Topic | null;
    setTopics: (topics: Topic[]) => void;
    setQuizzes: (quizzes: Quiz[]) => void;
    setTopic: (topic: Topic) => void;
    addTopic: (topic: Topic) => void;
    deleteTopic: (topic: Topic) => void;
    addQuiz: (quiz: Quiz) => void;
    deleteQuiz: (quiz: Quiz) => void;
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
    })),
    addTopic: (topic) => set((state) => {
        return {
            topics: [...state.topics, topic]
        }
    }),
    deleteTopic: (topic) => set((state) => {
        const updatedTopics = state.topics.filter((t) => t._id != topic._id);
        return {
            topics: updatedTopics
        }
    }),
    addQuiz: (quiz) => set((state) => {
        return {
            quizzes: [...state.quizzes, quiz]
        }
    }),
    deleteQuiz: (quiz) => set((state) => {
        const updatedQuizzes = state.quizzes.filter((q) => q._id != quiz._id);
        return {
            quizzes: updatedQuizzes
        }
    })
}))