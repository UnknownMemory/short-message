export const getFutureDate = (days: number) => {
    const today: Date = new Date()
    return new Date(new Date().setDate(today.getDate() + days)).getTime()
}

export const getCookie = (name: string) => {
    return document.cookie.split('; ').find((row) => row.split('=')[0] === name)?.split('=')[1];
}
