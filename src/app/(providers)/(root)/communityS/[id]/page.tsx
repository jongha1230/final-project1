import CommunityPostDetail from './_components/CommunityPostDetail';

const CommunityPostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;

  return <CommunityPostDetail postId={postId} />;
};

export default CommunityPostDetailPage;
