import Sidebar from '../components/Sidebar'
import Content from './Content'
import Navbar from '../components/Navbar'

const Page = () => {
    const active: string = 'Project'
  return (
    <>
      <div className='flex bg-blue-50'>
        <Sidebar active={active} />
        <div className='flex-1 max-h-screen'>
          <Navbar active={active} />
          <Content />
        </div>
      </div>
    </>
  )
}

export default Page
