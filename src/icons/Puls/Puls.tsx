import { IconProps } from '@/types/icon';
import MypageSVG from './plus.svg';

const Puls = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default Puls;
