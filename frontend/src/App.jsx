//import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'


import { MainPage } from './components/MainPage'
import Signup from './components/signup'
import Login from './components/login'
import { Dashboard } from './components/Dashboard'
import EditPage from './components/EditPage'
import AdmLog from './components/AdmLog'
import { AdmDash } from './components/AdmDash'
import { AddPro } from './components/AddPro'
import { Profile } from './components/Profile'
import { Cart } from './components/Cart'
import { Employee } from './components/Employee'
import { NewEmp } from './components/NewEmp'
import OtpSystem from './components/ForgetPass'
import Checkout from './components/Checkout'
import Footer from './components/ButtomBar'
import Navbar from './components/NavBar'
import AdminOrders from './components/Orders'
import { ContactUs } from './components/ContactUs'
import UserNavBar from './components/UserNavBar'
import BigNavbar from './components/UNBar'
import MyOrders from './components/MyOrders'
import AdminFinance from './components/Finance'

function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<>
      <Navbar></Navbar>
      <MainPage></MainPage>
      <Footer></Footer>
      </>
    },{
      path:'/contact',
      element:<>
      <Navbar></Navbar>
      <ContactUs></ContactUs>
      <Footer></Footer>
      </>
    },{
      path:'/user/signup',
      element:<>
      <Navbar></Navbar>
      <Signup></Signup>
      <Footer></Footer>
      </>
    },{
      path:'/user/login',
      element:<>
      <Navbar></Navbar>
      <Login></Login>
      <Footer></Footer>
      </>
    },{
      path:"/user/dashboard",
      element:<>
      <UserNavBar></UserNavBar>
      <BigNavbar></BigNavbar>
      <Dashboard></Dashboard>
      <Footer></Footer>
      </>
    },{
      path:"/user/checkout",
      element:<>
      <UserNavBar></UserNavBar>
      <Checkout></Checkout>
      <Footer></Footer>
      </>
    },{
      path:'/user/profile',
      element:<>
      <UserNavBar></UserNavBar>
      <Profile></Profile>
      <Footer></Footer>
      </>
    },{
      path:'/user/profile/edit',
      element:<>
      <UserNavBar></UserNavBar>
      <EditPage></EditPage>
      <Footer></Footer>
      </>
    },{
      path:'/user/cart',
      element:<>
      <UserNavBar></UserNavBar>
      <Cart></Cart>
      <Footer></Footer>
      </>
    },{
      path:'/user/my-orders',
      element:<>
      <UserNavBar></UserNavBar>
      <MyOrders></MyOrders>
      <Footer></Footer>
      </>
    },{
      path:'/user/forget-password',
      element:<>
      <Navbar></Navbar>
      <OtpSystem></OtpSystem>
      <Footer></Footer>
      </>
    },{
      path:'/admin/login',
      element:<>
      <AdmLog></AdmLog>
      </>
    },{
      path:'/admin/dashboard',
      element:<>
      <AdmDash></AdmDash>
      </>
    },{
      path:'/admin/add-new-products',
      element:<>
      <AddPro></AddPro>
      </>
    },{
      path:'/admin/employee',
      element:<>
      <Employee></Employee>
      </>
    },{
      path:'/admin/add-new-employee',
      element:<>
      <NewEmp></NewEmp>
      </>
    },{
      path:'/admin/orders',
      element:<>
      <AdminOrders></AdminOrders>
      </>
    },{
      path:'/admin/finance',
      element:<>
      <AdminFinance></AdminFinance>
      </>
    }
  ])

  return (
    <>
    <div className='app_div_main'>
      <RouterProvider router={route}/>
    </div>
    </>
  )
}

export default App

