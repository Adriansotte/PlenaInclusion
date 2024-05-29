export function isFieldValid(value: string): boolean {
    const regex = /^[a-zA-Z0-9\s.,:áéíóúÁÉÍÓÚñÑ]+$/;
    return regex.test(value.trim());
}
