'use client';
import Button from '@/components/Button';
import { useModal } from '@/contexts/modal.context/modal.context';
import Mobile from '@/layouts/Mobile';

const ModalTestPage = () => {
  const modal = useModal();

  const openConfirmModal = async () => {
    const yes = await modal.confirm(['confirm 테스트 모달입니다.']);
    if (!yes) return await modal.alert(['false가 반환되었습니다']);
    return await modal.alert(['true가 반환되었습니다', '여러 줄도 가능!']);
  };
  return (
    <Mobile>
      <div className="w-full h-full flex flex-col justify-end gap-4 py-4">
        <div className="w-full px-10">
          <Button onClick={openConfirmModal}>모달 테스트</Button>
        </div>
      </div>
    </Mobile>
  );
};
export default ModalTestPage;
