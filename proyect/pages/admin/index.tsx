

import dynamic from "next/dynamic"

const AdminComponent = dynamic(()=>import("./admin"),{ssr:false})

const AdminPage = () => {
    return <AdminComponent/>;
  }




export default AdminPage;


