export abstract class Parser {
    public static extractNumberFromText(text: string | null | undefined): number {
        if (!text) return 0;
        const cleanedText = text.replace(/[^0-9]/g, '') || '';
          return cleanedText ? parseInt(cleanedText, 10) : 0;
    }
    public static getFirstLine(text: string | null | undefined): string {
        if (!text) return "";
        return text.split('\n')[0].trim();
}}