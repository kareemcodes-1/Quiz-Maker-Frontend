
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import ToastProvider from './providers/ToastProvider.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import TopicPage from './topic/quizzes/new/page.tsx';
import QuizzesPage from './topic/quizzes/page.tsx';
// import ProtectRoutes from './providers/protect-route.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
            // <Provider>
            <>
              <ToastProvider />
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
               <Routes>
               {/* <Route path='/register' element={<Register />}></Route>
               <Route path='/login' element={<Login />}></Route> */}

               {/* <Route element={<ProtectRoutes />}> */}
                   <Route path='/' element={<App />}></Route>
                   <Route path='/topic/:id/quizzes/new' element={<TopicPage />}></Route>
                   <Route path='/topic/:id/quizzes' element={<QuizzesPage />}></Route>
                {/* </Route> */}
               </Routes>
           </BrowserRouter>
           </ThemeProvider>
         </>
  // </StrictMode>,
)
