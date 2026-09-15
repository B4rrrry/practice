import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";


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
         {children} 
      </QueryClientProvider>
    </>
  );
};

export default TestWrapper;
