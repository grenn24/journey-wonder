
import { Navigate } from 'react-router-dom'

const Home = () => {
  return (
    sessionStorage.getItem("X-Access-Token") ? <Navigate replace to="/user"/> : <Navigate replace to="/guest"/>
  )
}

export default Home