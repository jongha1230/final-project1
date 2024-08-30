export const dynamic = 'force-dynamic';

import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';
import CommunityPostList from './_components/CommunityPostList';

const CommunityPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostList />
    </Suspense>
  );
};

export default CommunityPage;
