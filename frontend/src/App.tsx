import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import ConversationPage from './pages/ConversationPage';
import QuizPage from './pages/QuizPage';
import StoryPage from './pages/StoryPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="grammar" element={<GrammarPage />} />
                    <Route path="conversation" element={<ConversationPage />} />
                    <Route path="quiz" element={<QuizPage />} />
                    <Route path="story" element={<StoryPage />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
