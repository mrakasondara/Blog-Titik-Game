import {createContext,useState} from 'react'
export const UserContext = createContext({})
export default function UserContextProvider({children}) {
	const [userInfo,setUserInfo] = useState({})
	const [isMenuOpen,setIsMenuOpen] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(false)
	const [updateSuccess, setUpdateSuccess] = useState(false)
	return (
		<UserContext.Provider value={{userInfo,setUserInfo,isMenuOpen,setIsMenuOpen,alertSuccess,setAlertSuccess,updateSuccess,setUpdateSuccess}}>
			{children}
		</UserContext.Provider>
	)	
}