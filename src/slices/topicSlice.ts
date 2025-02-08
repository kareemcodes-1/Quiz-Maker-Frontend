import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Topic } from "../../types/type";

type State = {
    topics: Topic[],
    filteredTopics: Topic[],
    openTopicModal: boolean;
    editingTopic: Topic | null;
    editingMode: boolean;
    value: string;
}

const initialState: State = {
    topics: [],
    editingMode: false,
    filteredTopics: [],
    openTopicModal: false,
    editingTopic: null,
    value: 'all',
}

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
      addTopic(state, action:PayloadAction<Topic>){
                  state.topics.push(action.payload);
       },
        allTopics(state, action: PayloadAction<Topic[]>){
            state.topics = action.payload;
            state.filteredTopics = action.payload;
        },
        setOpenTopicModal(state, action: PayloadAction<boolean>){
            state.openTopicModal = action.payload;
        },
        findTopic(state, action: PayloadAction<string>){
            const findTopic = state.topics.find((topic) => topic._id === action.payload);
            if(findTopic){
                state.editingTopic = findTopic;
            }
        },
        setEditing(state){
          state.editingTopic = null;
          state.editingMode = false;
      },
        // handleTopicFilter(state, action: PayloadAction<string>){
        //     state.value = action.payload;
        //     const updatedTopics = state.filteredTopics.filter((topic) => {
        //        if(state.value === 'all'){
        //           return topic;
        //        }else if(state.value === action.payload.toLowerCase()){
        //            return topic.projectId.name.toLowerCase() === state.value.toLowerCase();
        //        }
        //     });
      
        //     state.Topics = updatedTopics;
        //   },
        updateTopics(state, action: PayloadAction<Topic>) {
              const updatedTopic = state.topics.map((topic) => {
                if (topic._id === action.payload._id) {
                  return {
                    ...action.payload,
                  };
                } else {
                  return topic;
                }
              });
        
              state.topics = updatedTopic;
            },
        deleteTopics(state, action: PayloadAction<string>){
            const updatedTopic = state.topics.filter((topic) => topic._id !== action.payload);
            state.topics = updatedTopic;
        }
    }
});

export const {allTopics, setOpenTopicModal, findTopic, deleteTopics, updateTopics, addTopic, setEditing} = topicSlice.actions;
export default topicSlice.reducer;