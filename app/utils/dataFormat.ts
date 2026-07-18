export function dateToString(date: Date): string {
    return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

export function formatDb2DateTime(datetime: Date){
    return new Intl.DateTimeFormat(
        'sv-SE',
        {
            day: '2-digit',
            hour: "2-digit",
            hourCycle: "h23",
            minute: '2-digit',
            month: '2-digit',
            second: "2-digit",
            timeZone: 'America/Rio_Branco',
            year: 'numeric'
        }
    ).format(datetime);
}

export function dateTimeToString(datetime: Date): { 
    date: string, 
    time: string 
} {
    // Usa o Intl.DateTimeFormat com America/Rio_Branco para garantir o horário do Acre
    const acreDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'America/Rio_Branco'
    }).format(datetime);

    const acreTime = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Rio_Branco'
    }).format(datetime);

    return { 
        date: acreDate, 
        time: acreTime 
    };
}

export function parseLocaleNumber(string: string): number {
    return Number(string.replace(',', '.'));
}

export function valueToCurrency(value: number): string {
    return value ? Intl.NumberFormat('pt-br', {
        currency: "BRL",
        style: 'currency'
    }).format(value.toString() as Intl.StringNumericLiteral) : 'R$ 0,00';
}