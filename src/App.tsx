import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BaseLayout from "./components/layout/components/BaseLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#181A20',
                  colorWarning: '#FCD535',
                  colorBgContainer: '#FCD535',
                },
              }}
            >

              <BaseLayout>
                <Routes>
                  <Route index element={<HomePage />}></Route>
                </Routes>
              </BaseLayout>
            </ConfigProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
