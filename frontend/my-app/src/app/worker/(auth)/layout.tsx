// import Aoth

import Photos from "@/app/components/AuthPhoto";
import ProtectWrapper from "./ProtectWrapper";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="min-h-screen w-full flex flex-col md:flex-row">
          
          <ProtectWrapper>
            {children}
          </ProtectWrapper>
          
          <Photos />
      
      </div>
    )

  }