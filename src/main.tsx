
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import {store} from "../store/store.ts";
import {Provider} from "react-redux";
import ToastProvider from './providers/ToastProvider.tsx';
import Memories from './memories/page.tsx';
import Goals from './goals/page.tsx';
import Philosophies from './philosophies/page.tsx';
import PhilosophyNew from './philosophies/new/page.tsx';
import PhilosophyEdit from './philosophies/edit/page.tsx';
import Register from './auth/Register.tsx';
import Login from './auth/Login.tsx';
import Profile from './settings/profile/page.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import ProtectRoutes from './providers/protect-route.tsx';
import NoteEditPage from './notes/edit/page.tsx';
import NewNote from './notes/new/page.tsx';
import Notes from './notes/page.tsx';
import FlashCards from './flashcards/page.tsx';
import CreateFlashCards from './flashcards/new/page.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
            <Provider store={store}>
              <ToastProvider />
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
               <Routes>
               <Route path='/register' element={<Register />}></Route>
               <Route path='/login' element={<Login />}></Route>

               <Route element={<ProtectRoutes />}>
                   <Route path='/' element={<App />}></Route>
                   <Route path='/memories' element={<Memories />}></Route>
                   <Route path='/philosophies' element={<Philosophies />}></Route>
                   <Route path='/philosophies/new' element={<PhilosophyNew />}></Route>
                   <Route path='/philosophies/edit/:id' element={<PhilosophyEdit />}></Route>
                   <Route path='/goals' element={<Goals />}></Route>
                   <Route path='/notes' element={<Notes />}></Route>
                   <Route path='/notes/new' element={<NewNote />}></Route>
                   <Route path='/notes/edit/:id' element={<NoteEditPage />}></Route>
                   <Route path="/settings/profile" element={<Profile />} />
                   <Route path='/flashcards' element={<FlashCards />}></Route>
                   <Route path='/flashcards/new' element={<CreateFlashCards />}></Route>
                </Route>
               </Routes>
           </BrowserRouter>
           </ThemeProvider>
            </Provider>
  // </StrictMode>,
)
