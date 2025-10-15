import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Class,
  getAllClasses,
  createClass as createClassDB,
  updateClass as updateClassDB,
  deleteClass as deleteClassDB,
  ClassInput,
} from "../../data/classesDB";
import {
  AssignmentWithClass,
  getAllAssignments,
  createAssignment as createAssignmentDB,
  updateAssignment as updateAssignmentDB,
  deleteAssignment as deleteAssignmentDB,
  toggleAssignmentCompletion as toggleAssignmentCompletionDB,
  AssignmentInput,
} from "../../data/assignmentsDB";

interface AppContextType {
  classes: Class[];
  assignments: AssignmentWithClass[];
  loading: boolean;
  refreshData: () => Promise<void>;
  createClass: (classData: ClassInput) => Promise<number>;
  updateClass: (id: number, classData: ClassInput) => Promise<void>;
  deleteClass: (id: number) => Promise<void>;
  createAssignment: (assignmentData: AssignmentInput) => Promise<number>;
  updateAssignment: (
    id: number,
    assignmentData: AssignmentInput
  ) => Promise<void>;
  deleteAssignment: (id: number) => Promise<void>;
  toggleAssignmentCompletion: (id: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignments, setAssignments] = useState<AssignmentWithClass[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const [classesData, assignmentsData] = await Promise.all([
        getAllClasses(),
        getAllAssignments(),
      ]);
      setClasses(classesData);
      setAssignments(assignmentsData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const createClass = async (classData: ClassInput): Promise<number> => {
    const id = await createClassDB(classData);
    await refreshData();
    return id;
  };

  const updateClass = async (
    id: number,
    classData: ClassInput
  ): Promise<void> => {
    await updateClassDB(id, classData);
    await refreshData();
  };

  const deleteClass = async (id: number): Promise<void> => {
    await deleteClassDB(id);
    await refreshData();
  };

  const createAssignment = async (
    assignmentData: AssignmentInput
  ): Promise<number> => {
    const id = await createAssignmentDB(assignmentData);
    await refreshData();
    return id;
  };

  const updateAssignment = async (
    id: number,
    assignmentData: AssignmentInput
  ): Promise<void> => {
    await updateAssignmentDB(id, assignmentData);
    await refreshData();
  };

  const deleteAssignment = async (id: number): Promise<void> => {
    await deleteAssignmentDB(id);
    await refreshData();
  };

  const toggleAssignmentCompletion = async (id: number): Promise<void> => {
    await toggleAssignmentCompletionDB(id);
    await refreshData();
  };

  const value: AppContextType = {
    classes,
    assignments,
    loading,
    refreshData,
    createClass,
    updateClass,
    deleteClass,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    toggleAssignmentCompletion,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
