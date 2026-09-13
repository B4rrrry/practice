import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";
import { BrowserRouter } from "react-router";

interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWrapper: FC<TestWrapperProps> = (props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const { children } = props;

  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
      ,
    </>
  );
};

export default TestWrapper;
