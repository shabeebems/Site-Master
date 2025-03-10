import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const active: string = 'Project'
    
    return (
      <>
      <div className='flex bg-blue-50'>
        <Sidebar active={active} />
        <div className='flex-1 max-h-screen'>
          <Navbar active={active} />
          {children}
        </div>
      </div>
      </>
)
    
}