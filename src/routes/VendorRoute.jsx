import Forbidden from "../components/Forbidden";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const VendorRoute = ({children}) => {
    const { loading} = useAuth();
    const role = useRole();
    console.log(role)

    if(loading ){
    return <Loading></Loading>
   }

  if(role[0]?.role !== 'vendor'){
    return <Forbidden></Forbidden>
  }
  return children;
}

export default VendorRoute