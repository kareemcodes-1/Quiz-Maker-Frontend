import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlashCard } from "../../types/type";

type State = {
    flashcards: FlashCard[],
    filteredFlashCards: FlashCard[],
    openFlashCardModal: boolean;
    openFlashCardAIModal: boolean;
    editingFlashCard: FlashCard | null;
    value: string;
}

const initialState: State = {
    flashcards: [],
    filteredFlashCards: [],
    openFlashCardModal: false,
    editingFlashCard: null,
    openFlashCardAIModal: false,
    value: 'all',
}

const flashCardSlice = createSlice({
    name: 'flashCard',
    initialState,
    reducers: {
        allFlashCards(state, action: PayloadAction<FlashCard[]>){
            state.flashcards = action.payload;
            state.filteredFlashCards = action.payload;
        },
        setOpenFlashCardModal(state, action: PayloadAction<boolean>){
            state.openFlashCardModal = action.payload;
        },
        setOpenFlashCardAIModal(state, action: PayloadAction<boolean>){
            state.openFlashCardAIModal = action.payload;
        },
        findFlashCard(state, action: PayloadAction<string>){
            const findFlashCard = state.flashcards.find((flashcard) => flashcard._id === action.payload);
            if(findFlashCard){
                state.editingFlashCard = findFlashCard;
            }
        },
        // handleFlashCardFilter(state, action: PayloadAction<string>){
        //     state.value = action.payload;
        //     const updatedFlashCards = state.filteredFlashCards.filter((flashcard) => {
        //        if(state.value === 'all'){
        //           return flashcard;
        //        }else if(state.value === action.payload.toLowerCase()){
        //            return flashcard.projectId.name.toLowerCase() === state.value.toLowerCase();
        //        }
        //     });
      
        //     state.flashcards = updatedFlashCards;
        //   },
        updateFlashCards(state, action: PayloadAction<FlashCard>) {
              const updatedFlashCard = state.flashcards.map((flashcard) => {
                if (flashcard._id === action.payload._id) {
                  return {
                    ...action.payload,
                  };
                } else {
                  return flashcard;
                }
              });
        
              state.flashcards = updatedFlashCard;
            },
        deleteFlashCards(state, action: PayloadAction<string>){
            const updatedFlashCard = state.flashcards.filter((flashcard) => flashcard._id !== action.payload);
            state.flashcards = updatedFlashCard;
        }
    }
});

export const {allFlashCards, setOpenFlashCardModal, findFlashCard, deleteFlashCards, updateFlashCards, setOpenFlashCardAIModal} = flashCardSlice.actions;
export default flashCardSlice.reducer;