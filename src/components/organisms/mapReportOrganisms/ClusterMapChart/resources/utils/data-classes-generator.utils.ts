// تبدیل hex به rgb
const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace('#', ''), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return { r, g, b }
}

// تبدیل rgb به hex
const rgbToHex = (r: number, g: number, b: number) =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

// گرد کردن عدد به نزدیک‌ترین مضرب مشخص
const roundTo = (num: number, base: number) => Math.round(num / base) * base

// ساخت بازه رنگی از قرمز → سبز
export const generateDataClasses = ({
    minNum,
    maxNum,
    steps = 10,
    roundBase = 10
}: {
    minNum: number
    maxNum: number
    steps?: number
    roundBase?: number
}) => {
    const start = hexToRgb('#ff0000') // قرمز (کمترین مقدار)
    const end = hexToRgb('#00ff00') // سبز (بیشترین مقدار)

    const rawStepSize = (maxNum - minNum) / steps
    const stepSize = roundTo(rawStepSize, roundBase)

    const dataClasses = []
    let current = roundTo(minNum, roundBase)

    for (let i = 0; i < steps; i++) {
        const next = i === steps - 1 ? roundTo(maxNum, roundBase) : current + stepSize
        const ratio = i / (steps - 1)

        const r = Math.round(start.r + (end.r - start.r) * ratio)
        const g = Math.round(start.g + (end.g - start.g) * ratio)
        const b = Math.round(start.b + (end.b - start.b) * ratio)
        const color = rgbToHex(r, g, b)

        dataClasses.push({
            from: current,
            to: next,
            color
        })

        current = next
    }

    return dataClasses
}
