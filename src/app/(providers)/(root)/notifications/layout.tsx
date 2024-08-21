import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import { PropsWithChildren } from 'react';
import NotificationClear from './_components/NotificationClear';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-[800px] mx-auto flex flex-col h-full gap-y-4 px-4">
      <div className="fixed inset-0 bg-[#0E0C15] -z-30 overflow-hidden">
        <div className="w-[140px] h-[300px] absolute top-[70px] left-[48px] blur-[90px] rounded-full bg-[#52467B]"></div>
        <div className="w-[340px] h-[105px] absolute bottom-[110px] right-[-24px] blur-[90px] bg-white/40 rounded-full"></div>
      </div>
      <div className='"w-full h-14 text-white'>
        <TitleHeader rightButton={<NotificationClear />}>알림</TitleHeader>
      </div>
      {children}
    </div>
  );
};

export default layout;
