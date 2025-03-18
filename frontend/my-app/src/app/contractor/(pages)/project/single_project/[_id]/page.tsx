import Content from './content';

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps>  = ({params}) => {

  return (
    <>
      <Content _id={params._id} />
    </>
  );
}

export default Page
