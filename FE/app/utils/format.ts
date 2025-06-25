export function formatDate(date: Date | string | null | undefined, includeTime = false): string {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    const pad = (n: number) => n.toString().padStart(2, '0');

    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1); // Months start at 0
    const year = d.getFullYear();
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return includeTime
        ? `${hours}:${minutes} ${day}/${month}/${year}`
        : `${day}/${month}/${year}`;
}
export function formatVnd(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(amount);
}
