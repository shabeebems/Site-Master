import ProtectWrapper from "./ProtectWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    return (
      <ProtectWrapper>
        {children}
      </ProtectWrapper>
)
    
}