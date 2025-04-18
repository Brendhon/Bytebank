import FigmaSvg from '@/assets/figma.svg';
import { HeaderProps } from "@/types/layout";
import { FileCode, Settings, UserIcon } from "lucide-react";
import Popover from "../../Popover/Popover";

export default ({ onNavigate, onLogout }: Pick<HeaderProps, 'onNavigate' | 'onLogout'>) => (
  <Popover pButton={<UserIcon className='popover-trigger rounded-full border border-orange p-2' size={40} />} className='p-4'>
    <ul className="flex flex-col gap-2 justify-center items-center">
      <li className='popover-li' onClick={() => onNavigate?.(process.env.NEXT_PUBLIC_FIGMA_URL || '')}>
        <FigmaSvg className="inline mr-2 h-auto w-6" /> Figma
      </li>
      <li className='popover-li' onClick={() => onNavigate?.(process.env.NEXT_PUBLIC_STORYBOOK_URL || '')}>
        <FileCode size={24} className="inline mr-2" /> Documentação
      </li>
      <li className='popover-li' onClick={() => onNavigate?.('/settings')}>
        <Settings size={24} className="inline mr-2" /> Configurações
      </li>
      <li onClick={() => onLogout?.()} className='border-t border-t-dark-gray p-0 pt-6 w-full text-center popover-li'>
        Sair
      </li>
    </ul>
  </Popover>
);
