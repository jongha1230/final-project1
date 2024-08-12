import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { QueryClient } from '@tanstack/react-query';
import NotificationClear from './_components/NotificationClear';
import NotificationList from './_components/NotificationList';

const NotificationsPage = async () => {
  const supabase = createClient();
  const queryClient = new QueryClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await supabase
        .from('notifications')
        .select('*')
        .match({ targetUserId: user?.id, isRead: false })
        .order('createdAt', { ascending: false })
        .returns<Tables<'notifications'>[]>();
      return response.data;
    },
  });

  return (
    <Mobile headerLayout={<TitleHeader rightButton={<NotificationClear />}>알림</TitleHeader>} showFooter={false}>
      <div className="px-4 grid gap-y-6">
        <h6 className="text-white/70 text-xs">최근 50개의 알람까지 보여집니다.</h6>
        <NotificationList />
      </div>
    </Mobile>
  );
};

export default NotificationsPage;
