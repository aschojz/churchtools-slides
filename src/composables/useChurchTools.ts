export default function useChurchTools() {
    const dayMonth = (dateString: string) =>
        new Date(dateString).toLocaleDateString('de-DE', {
            month: '2-digit',
            day: '2-digit',
        });
    return { dayMonth };
}
