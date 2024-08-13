import { createContext, useContext, useMemo, useState } from 'react';

interface AiReportContextType {
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
}

// LabelContext 생성
const AiReportContext = createContext<AiReportContextType | undefined>(undefined);

export const useLabel = () => {
  const context = useContext(AiReportContext);
  if (!context) {
    throw new Error('useLabel must be used within a LabelProvider');
  }
  return context;
};

export const LabelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [label, setLabel] = useState('AI 요약 보고서');

  // value 객체를 useMemo로 메모이제이션하여 불필요한 렌더링을 방지
  const value = useMemo(() => ({ label, setLabel }), [label]);

  return (
    <AiReportContext.Provider value={value}>
      {children}
    </AiReportContext.Provider>
  );
};
