export const addType = `
ALTER TABLE assignments
ADD COLUMN type VARCHAR DEFAULT 'single-choice';`;
