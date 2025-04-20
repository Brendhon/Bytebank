import FigmaSvg from '@/assets/figma.svg';
import GithubSvg from '@/assets/github.svg';
import { HeaderProps } from "@/types/layout";
import { Button } from '@headlessui/react';
import { FileCode, Settings, UserIcon } from "lucide-react";
import Popover from "../../Popover/Popover";

export default ({ onNavigate, onLogout }: Pick<HeaderProps, 'onNavigate' | 'onLogout'>) => (
  <Popover pButton={<UserIcon className='popover-trigger rounded-full border border-orange p-2' size={40} />} className='p-4'>
    <div className="flex flex-col gap-2 justify-center items-center">
      <Button className='popover-li' onClick={() => onNavigate?.(process.env.NEXT_PUBLIC_GITHUB_URL || '')}>
        <GithubSvg className="inline mr-2 h-auto w-6" /> Github
      </Button>
      <Button className='popover-li' onClick={() => onNavigate?.(process.env.NEXT_PUBLIC_FIGMA_URL || '')}>
        <FigmaSvg className="inline mr-2 h-auto w-6" /> Figma
      </Button>
      <Button className='popover-li' onClick={() => onNavigate?.(process.env.NEXT_PUBLIC_STORYBOOK_URL || '')}>
        <FileCode size={24} className="inline mr-2" /> Documentação
      </Button>
      <Button className='popover-li' onClick={() => onNavigate?.('/settings')}>
        <Settings size={24} className="inline mr-2" /> Configurações
      </Button>
      <Button onClick={() => onLogout?.()} className='border-t border-t-dark-gray p-0 pt-6 w-full text-center popover-li'>
        Sair
      </Button>
    </div>
  </Popover>
);
