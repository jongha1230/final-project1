'use client';

import NavBar from '@/components/common/NavBar';
import UserProfile from '@/components/UserProfile';
import { useThemeStore } from '@/stores/useThemeStore';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import DockBar from './_components/DockBar';
import Header from './_components/Header/Header';
import ThemeButton from './_components/ThemeButton';

interface MobileLayoutProps {}

const MobileFrameVariants = cva(
  'w-[390px] h-[844px] border-8 border-black rounded-[44px] relative overflow-hidden pt-11 pb-10',
  {
    variants: {
      darkMode: {
        true: 'bg-black text-white',
        false: 'bg-white text-black',
      },
    },
    defaultVariants: {
      darkMode: false,
    },
  },
);

const Mobile = ({ children }: PropsWithChildren<MobileLayoutProps>) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ThemeButton />
      <div className={MobileFrameVariants({ darkMode })}>
        <Header />
        <section className="h-full relative">
          <div className="relative w-full h-full">
            <header className=" w-full h-14 border-b border-b-gray-500 mb-4">
              <UserProfile />
            </header>

            {children}
          </div>
          <NavBar />
        </section>
        <DockBar />
      </div>
    </div>
  );
};

export default Mobile;
