export function getUserNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    return namePart
        .replace(/[._-]/g, ' ')             // Replace dots, underscores, and dashes with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}
