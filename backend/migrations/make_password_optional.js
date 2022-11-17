export const makePassNullable = `
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
`;
