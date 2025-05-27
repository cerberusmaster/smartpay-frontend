import { describe, it, expect } from 'vitest';
import { getUserNameFromEmail } from './utils';

describe('getUserNameFromEmail', () => {
    it('should convert email to formatted name', () => {
        expect(getUserNameFromEmail('john.doe@example.com')).toBe('John Doe');
        expect(getUserNameFromEmail('mary_smith@abc.com')).toBe('Mary Smith');
        expect(getUserNameFromEmail('alice-cooper@xyz.io')).toBe('Alice Cooper');
    });

    it('should handle single word emails', () => {
        expect(getUserNameFromEmail('bob@example.com')).toBe('Bob');
    });

    it('should handle multiple delimiters', () => {
        expect(getUserNameFromEmail('jane.doe-smith_test@domain.com')).toBe('Jane Doe Smith Test');
    });

    it('should return empty string for invalid email format', () => {
        expect(getUserNameFromEmail('')).toBe('');
        expect(getUserNameFromEmail('@')).toBe('');
    });
});
