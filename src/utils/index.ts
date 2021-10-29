import {
    useEffect,
    useState
} from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
    const result = {
        ...object
    }
    Object.keys(result).forEach(key => {
        //@ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = (value: unknown, delay?: number) : any => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    // 每次在value变化以后，设置一个定时器
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次再上一个useEffect处理完以后在运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}
