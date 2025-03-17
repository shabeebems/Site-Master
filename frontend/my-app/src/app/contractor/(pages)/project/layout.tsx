import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const active: string = 'Project'
    
    return (
      <div className='flex bg-blue-50'>
        <Sidebar active={active} />
        <div className='flex-1 flex flex-col max-h-screen overflow-auto bg-blue-50'>
          <div className="sticky top-0 z-50 bg-blue-50 shadow-md">
            <Navbar active={active} />
          </div>
          <div className="p-6 pb-12">{children}</div>
        </div>
      </div>
)
    
}