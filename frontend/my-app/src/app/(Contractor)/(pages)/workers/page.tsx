import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Content from "./Content"


const Page = () => {
  const active: string = 'Workers'
  return (
    <div className='flex bg-blue-50'>
      <Sidebar active={active} />

      <div className='flex-1 max-h-screen'>
        <Navbar active={active} />
        <Content/>
      </div>
    </div>
  )
}

export default Page
