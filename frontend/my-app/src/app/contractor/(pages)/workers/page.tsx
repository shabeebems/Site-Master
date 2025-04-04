import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Content from "./Content"


const Page = () => {
  const active: string = 'Workers'
  return (
    <div className='flex bg-blue-50'>
      <Sidebar active={active} />
      <div className='flex-1 flex flex-col max-h-screen overflow-auto bg-blue-50'>
          <div className="sticky top-0 z-50 bg-blue-50 shadow-md">
            <Navbar active={active} />
          </div>
          <div className="p-6 pb-12">
            <Content/>
          </div>
        </div>
    </div>
  )
}

export default Page
