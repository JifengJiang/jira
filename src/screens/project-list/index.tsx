import { useState, useEffect } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useMount, useDebounce } from 'utils'
import qs from 'qs'

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])

    const debouncedParam = useDebounce(param, 2000)

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
            if (res.ok) {
                setList(await res.json())
            }
        })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiURL}/users`).then(async res => {
            if (res.ok) {
                setUsers(await res.json())
            }
        })
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </div>
}