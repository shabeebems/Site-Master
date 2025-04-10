import Content from './content';

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps> = async({params}) => {
  const { _id } = await params

  return (
    <>
      <Content _id={_id} />
    </>
  );
}

export default Page
