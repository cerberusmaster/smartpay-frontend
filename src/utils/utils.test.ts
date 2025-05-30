import { describe, it, expect } from 'vitest';
import { getUserNameFromEmail } from './utils';

describe('Utility Functions', () => {
    describe('getUserNameFromEmail', () => {
        it('extracts and formats username from email', () => {
            expect(getUserNameFromEmail('john.doe@example.com')).toBe('John Doe');
            expect(getUserNameFromEmail('jane_doe@example.com')).toBe('Jane Doe');
            expect(getUserNameFromEmail('mary-jane@example.com')).toBe('Mary Jane');
        });

        it('handles single word usernames', () => {
            expect(getUserNameFromEmail('john@example.com')).toBe('John');
        });

        it('handles usernames with multiple separators', () => {
            expect(getUserNameFromEmail('john.doe.smith@example.com')).toBe('John Doe Smith');
            expect(getUserNameFromEmail('jane_doe-smith@example.com')).toBe('Jane Doe Smith');
        });
    });
});
