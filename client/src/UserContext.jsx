import {createContext,useState} from 'react'
export const UserContext = createContext({})
export default function UserContextProvider({children}) {
	const [userInfo,setUserInfo] = useState({})
	const [isMenuOpen,setIsMenuOpen] = useState(false)
	return (
		<UserContext.Provider value={{userInfo,setUserInfo,isMenuOpen,setIsMenuOpen}}>
			{children}
		</UserContext.Provider>
	)	
}