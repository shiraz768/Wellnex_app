import { useEffect, useState } from 'react'

export default function useLocalStorage(key, fallback){
	const [state, setState] = useState(()=>{
		try{
			const raw = localStorage.getItem(key)
			return raw ? JSON.parse(raw) : fallback
		}catch(e){
			return fallback
		}
	})

	useEffect(()=>{
		try{ localStorage.setItem(key, JSON.stringify(state)) }catch(e){}
	},[key,state])

	return [state, setState]
}