export const readCSVFile = async (file: File): Promise<string | ArrayBuffer> => {
    const reader = new FileReader()
    try {
        const text: string | ArrayBuffer = await new Promise((resolve, reject) => {
            reader.onerror = reject
            reader.onload = () => resolve(reader.result || '')
            reader.readAsText(file)
        })
        return text
    } catch (err) {
        console.error('Bad file input')
        return ''
    }
}

const formatDate = (date: string): string => {
    const nums = date.split('/')
    nums.reverse()
    return nums.join('-')
}

const formatAmount = (amount: string): string => {
    if (amount[0] === '+') {
        return amount.slice(1)
    }
    return amount
}

export const formatCSV = (
    csvtext: string,
): { date: string; amount: string; description: string }[] => {
    const lines = csvtext.split('\n')
    const arrayLines = lines
        .map(line => line.replaceAll('"', '').split(','))
        .filter(a => a.length >= 3)
    console.table(arrayLines)
    const hasHeaders = !/\d/.test(lines[0])
    if (!hasHeaders) {
        return arrayLines.map(([date, amount, description]) => ({
            date: formatDate(date),
            amount: formatAmount(amount),
            description,
        }))
    }
    const headers = arrayLines[0]
    if (
        headers.indexOf('date') < 0 ||
        headers.indexOf('amount') < 0 ||
        headers.indexOf('description') < 0
    ) {
        return []
    }
    const rows = arrayLines.slice(1)
    return rows.map(([date, amount, description]) => ({
        date: formatDate(date),
        amount: formatAmount(amount),
        description,
    }))
}
