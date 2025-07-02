function convertDateMicroseconds(_date: Date) {
    const date = new Date(_date)

    const pad = (number: number, length = 2) => String(number).padStart(length, '0')

    // Get individual components
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1) // Months are zero-indexed
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    // Milliseconds (we will use these to create "microseconds")
    const milliseconds = pad(date.getMilliseconds(), 3)

    // Fake microseconds (since JavaScript can only provide milliseconds, pad to 7 digits)
    const microseconds = `${milliseconds}0000`.slice(0, 7)

    // Combine the components
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}`
}

export default convertDateMicroseconds
