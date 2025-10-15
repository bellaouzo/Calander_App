import { getDatabase } from "./database";
import { Class } from "./classesDB";

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  classId: number;
  completed: number;
}

export interface AssignmentWithClass extends Assignment {
  className: string;
  classColor: string;
}

export type AssignmentInput = Omit<Assignment, "id">;

export const createAssignment = async (
  assignmentData: AssignmentInput
): Promise<number> => {
  const db = getDatabase();
  const result = await db.runAsync(
    "INSERT INTO assignments (title, dueDate, classId, completed) VALUES (?, ?, ?, ?)",
    [
      assignmentData.title,
      assignmentData.dueDate,
      assignmentData.classId,
      assignmentData.completed,
    ]
  );
  return result.lastInsertRowId;
};

export const getAllAssignments = async (): Promise<AssignmentWithClass[]> => {
  const db = getDatabase();
  const rows = await db.getAllAsync<AssignmentWithClass>(
    `SELECT a.*, c.name as className, c.color as classColor 
     FROM assignments a 
     JOIN classes c ON a.classId = c.id 
     ORDER BY a.dueDate ASC`
  );
  return rows;
};

export const getAssignmentsByDate = async (
  date: string
): Promise<AssignmentWithClass[]> => {
  const db = getDatabase();
  const rows = await db.getAllAsync<AssignmentWithClass>(
    `SELECT a.*, c.name as className, c.color as classColor 
     FROM assignments a 
     JOIN classes c ON a.classId = c.id 
     WHERE a.dueDate = ? 
     ORDER BY a.completed ASC, a.title ASC`,
    [date]
  );
  return rows;
};

export const getUpcomingAssignments = async (
  includeCompleted: boolean = false
): Promise<AssignmentWithClass[]> => {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];

  let query = `SELECT a.*, c.name as className, c.color as classColor 
               FROM assignments a 
               JOIN classes c ON a.classId = c.id 
               WHERE a.dueDate >= ?`;

  if (!includeCompleted) {
    query += " AND a.completed = 0";
  }

  query += " ORDER BY a.dueDate ASC, a.completed ASC";

  const rows = await db.getAllAsync<AssignmentWithClass>(query, [today]);
  return rows;
};

export const getAssignmentById = async (
  id: number
): Promise<AssignmentWithClass | null> => {
  const db = getDatabase();
  const row = await db.getFirstAsync<AssignmentWithClass>(
    `SELECT a.*, c.name as className, c.color as classColor 
     FROM assignments a 
     JOIN classes c ON a.classId = c.id 
     WHERE a.id = ?`,
    [id]
  );
  return row || null;
};

export const updateAssignment = async (
  id: number,
  assignmentData: AssignmentInput
): Promise<void> => {
  const db = getDatabase();
  await db.runAsync(
    "UPDATE assignments SET title = ?, dueDate = ?, classId = ?, completed = ? WHERE id = ?",
    [
      assignmentData.title,
      assignmentData.dueDate,
      assignmentData.classId,
      assignmentData.completed,
      id,
    ]
  );
};

export const toggleAssignmentCompletion = async (id: number): Promise<void> => {
  const db = getDatabase();
  await db.runAsync(
    "UPDATE assignments SET completed = NOT completed WHERE id = ?",
    [id]
  );
};

export const deleteAssignment = async (id: number): Promise<void> => {
  const db = getDatabase();
  await db.runAsync("DELETE FROM assignments WHERE id = ?", [id]);
};

export const getAssignmentsByClass = async (
  classId: number
): Promise<AssignmentWithClass[]> => {
  const db = getDatabase();
  const rows = await db.getAllAsync<AssignmentWithClass>(
    `SELECT a.*, c.name as className, c.color as classColor 
     FROM assignments a 
     JOIN classes c ON a.classId = c.id 
     WHERE a.classId = ? 
     ORDER BY a.dueDate ASC`,
    [classId]
  );
  return rows;
};
