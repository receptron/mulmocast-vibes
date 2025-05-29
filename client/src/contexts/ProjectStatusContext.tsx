import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProjectStatusContextType {
  activeSessionCount: number;
  hasErrors: boolean;
  updateStatus: (activeCount: number, errors: boolean) => void;
}

const ProjectStatusContext = createContext<ProjectStatusContextType | undefined>(undefined);

export const useProjectStatus = () => {
  const context = useContext(ProjectStatusContext);
  if (context === undefined) {
    throw new Error('useProjectStatus must be used within a ProjectStatusProvider');
  }
  return context;
};

interface ProjectStatusProviderProps {
  children: ReactNode;
}

export const ProjectStatusProvider: React.FC<ProjectStatusProviderProps> = ({ children }) => {
  const [activeSessionCount, setActiveSessionCount] = useState(0);
  const [hasErrors, setHasErrors] = useState(false);

  // Sample data that would normally come from your API/database
  const sampleProjects = [
    { id: 1, sessionActive: true, hasErrors: false },
    { id: 2, sessionActive: false, hasErrors: false },
    { id: 3, sessionActive: true, hasErrors: true },
    { id: 4, sessionActive: false, hasErrors: false },
    { id: 5, sessionActive: false, hasErrors: false },
    { id: 6, sessionActive: false, hasErrors: false },
  ];

  useEffect(() => {
    // Calculate status from sample data
    const activeCount = sampleProjects.filter(project => project.sessionActive).length;
    const errors = sampleProjects.some(project => project.hasErrors);
    
    setActiveSessionCount(activeCount);
    setHasErrors(errors);
  }, []);

  const updateStatus = (activeCount: number, errors: boolean) => {
    setActiveSessionCount(activeCount);
    setHasErrors(errors);
  };

  return (
    <ProjectStatusContext.Provider value={{ activeSessionCount, hasErrors, updateStatus }}>
      {children}
    </ProjectStatusContext.Provider>
  );
};