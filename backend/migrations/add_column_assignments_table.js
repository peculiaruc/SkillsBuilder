export const addColumns = `
ALTER TABLE assignments
ADD COLUMN passing_score INT DEFAULT 100,
ADD COLUMN max_attempts INT DEFAULT 5;`;
