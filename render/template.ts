/**
 * Renders a template string with provided data
 * @param template The template string containing placeholders
 * @param data The data object to fill the placeholders
 * @returns Rendered string with replaced placeholders
 * 
*/
function render(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, expression) => {
        // 解析表达式，支持点号和方括号访问
        const value = expression.split(/[\.\[\]"']+/).filter(Boolean).reduce((obj: any, key: string) => {
            return obj ? obj[key] : undefined;
        }, data);

        return value !== undefined ? String(value) : match;
    });
}