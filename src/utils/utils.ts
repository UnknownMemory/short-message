

export const getFutureDate = (days: number) => {
    const today: Date = new Date()
    return new Date(new Date().setDate(today.getDate() + days)).getTime()
}
