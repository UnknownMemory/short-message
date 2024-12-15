export const getFutureDate = (days: number) => {
    const today: Date = new Date()
    return new Date(new Date().setDate(today.getDate() + days)).getTime()
}

export const getCookie = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
}
