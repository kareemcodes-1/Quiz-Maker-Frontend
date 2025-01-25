
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import {store} from "../store/store.ts";
import {Provider} from "react-redux";
import ToastProvider from './providers/ToastProvider.tsx';
import Memories from './memories/page.tsx';
import Goals from './goals/page.tsx';
import Plans from './plans/page.tsx';
import NewPlan from './plans/new/page.tsx';
import PlanEditPage from './plans/edit/page.tsx';
import Philosophies from './philosophies/page.tsx';
import PhilosophyNew from './philosophies/new/page.tsx';
import PhilosophyEdit from './philosophies/edit/page.tsx';
import Register from './auth/Register.tsx';
import Login from './auth/Login.tsx';
import Profile from './settings/profile/page.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import ProtectRoutes from './providers/protect-route.tsx';

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
                   <Route path='/plans' element={<Plans />}></Route>
                   <Route path='/plans/new' element={<NewPlan />}></Route>
                   <Route path='/plans/edit/:id' element={<PlanEditPage />}></Route>
                   <Route path="/settings/profile" element={<Profile />} />
                </Route>
               </Routes>
           </BrowserRouter>
           </ThemeProvider>
            </Provider>
  // </StrictMode>,
)
