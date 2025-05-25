// NavBar.tsx
import React, { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGetAccountType } from '@/hooks/useGetAccounType';
import { useUser } from '@/hooks/useUser';
import { setCredentials } from '@/state/authSlice';

import Logo from '../assets/NCJ-logos_transparent.svg';
// import NotificationImage from '../assets/NotificationImage.svg';
import ProfileImage from '../assets/Sample-Profile.svg';

const NavBar: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountType = useGetAccountType();

  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    navigate('/login');
  };

  const routes = useMemo(() => {
    const baseRoutes = [
      { path: '/jobs', label: 'Jobs' },
      { path: '/inbox', label: 'Inbox' },
    ];

    if (accountType === 'employer') {
      baseRoutes.push({ path: `/dashboard/${user?.id}`, label: 'Dashboard' });
      baseRoutes.push({ path: `/employers/${user?.id}`, label: 'Profile' });
    } else if (accountType === 'student') {
      baseRoutes.push({ path: `/students/${user?.id}/applications`, label: 'Applications' });
      baseRoutes.push({ path: `/students/${user?.id}`, label: 'Profile' });
    }

    return baseRoutes;
  }, [accountType, user?.id]);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavLink to="/" className="mr-6 hidden lg:flex">
            <img src={Logo} alt="Logo" className="h-6 w-6" />
            <span className="sr-only">NCJ</span>
          </NavLink>
          <div className="grid gap-2 py-6">
            {routes.map(route => (
              <NavLink key={route.path} to={route.path} className="flex w-full items-center py-2 text-lg font-semibold">
                {route.label}
              </NavLink>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <NavLink to="/" className="mr-6 hidden lg:flex">
        <img src={Logo} alt="Logo" />
        <span className="sr-only">NCJ</span>
      </NavLink>
      <nav className="ml-auto hidden lg:flex gap-6">
        {routes.map(route => (
          <NavLink
            key={route.path}
            to={route.path}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            {route.label}
          </NavLink>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-9 w-9">
              <AvatarImage src={ProfileImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuItem onClick={() => navigate('/profile/settings')}>Setting</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile/settings')}>Saved Jobs</DropdownMenuItem>
            {user?.accountType === 'student' && <DropdownMenuItem>Resume Lists</DropdownMenuItem>}
            <Separator />
            <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default NavBar;
