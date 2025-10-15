import { getDatabase } from "./database";

export interface Class {
  id: number;
  name: string;
  color: string;
}

export type ClassInput = Omit<Class, "id">;

export const createClass = async (classData: ClassInput): Promise<number> => {
  const db = getDatabase();
  const result = await db.runAsync(
    "INSERT INTO classes (name, color) VALUES (?, ?)",
    [classData.name, classData.color]
  );
  return result.lastInsertRowId;
};

export const getAllClasses = async (): Promise<Class[]> => {
  const db = getDatabase();
  const rows = await db.getAllAsync<Class>(
    "SELECT * FROM classes ORDER BY name"
  );
  return rows;
};

export const getClassById = async (id: number): Promise<Class | null> => {
  const db = getDatabase();
  const row = await db.getFirstAsync<Class>(
    "SELECT * FROM classes WHERE id = ?",
    [id]
  );
  return row || null;
};

export const updateClass = async (
  id: number,
  classData: ClassInput
): Promise<void> => {
  const db = getDatabase();
  await db.runAsync("UPDATE classes SET name = ?, color = ? WHERE id = ?", [
    classData.name,
    classData.color,
    id,
  ]);
};

export const deleteClass = async (id: number): Promise<void> => {
  const db = getDatabase();
  await db.runAsync("DELETE FROM classes WHERE id = ?", [id]);
};
