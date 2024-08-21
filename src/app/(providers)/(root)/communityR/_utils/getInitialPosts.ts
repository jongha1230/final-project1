import { createClient } from '@/supabase/server';
import { PostsResponse } from '@/types/community';

export async function getInitialPosts(
  category: string = '전체',
  page: number = 1,
  limit: number = 6,
): Promise<PostsResponse | undefined> {
  const supabase = createClient();

  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError) {
    console.error('인증 오류:', authError.message);
    return undefined;
  }

  const userId = session?.user?.id;

  // 투표 카테고리의 최신 게시글 가져오기
  const { data: latestVotePost, error: voteError } = await supabase
    .from('communityPosts')
    .select('*')
    .eq('category', '투표')
    .order('createdAt', { ascending: false })
    .limit(1)
    .single();

  if (voteError && voteError.code !== 'PGRST116') {
    console.error('최신 투표 게시물 가져오기 오류:', voteError.message);
  }

  // RPC 함수 사용
  const { data, error: rpcError } = await supabase.rpc('get_initial_posts', {
    p_category: category,
    p_page: page,
    p_limit: limit,
    p_user_id: userId,
  });

  if (rpcError) {
    console.error('게시물 가져오기 오류:', rpcError.message);
    return undefined;
  }

  const processedData = data.map((post: any) => ({
    ...post,
    user: {
      id: post.user_id,
      nickname: post.user_nickname,
      profileURL: post.user_profileURL,
      level: post.user_level,
    },
    commentCount: post.category === 'Q&A 게시판' ? post.answer_count : post.comment_count,
    isLiked: post.is_liked,
  }));

  return {
    data: processedData,
    latestVotePost,
    page,
    limit,
    totalCount: data[0]?.total_count || 0,
  };
}
