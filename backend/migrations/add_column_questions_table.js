export const addType = `
ALTER TABLE assignment_questions
ADD COLUMN type VARCHAR DEFAULT 'single-choice';`;
