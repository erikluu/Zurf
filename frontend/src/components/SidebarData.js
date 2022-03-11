import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Home',

    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Location 1',
    path: '/loc1',
    icon: <GiIcons.GiSurfBoard />,
    icon2: <AiIcons.AiOutlineStar />,
    cName: 'nav-text'
  },
  {
    title: 'Location 2',
    path: '/loc2',
    icon: <GiIcons.GiSurfBoard />,
    icon2: <AiIcons.AiOutlineStar />,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/account',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Zurf',
    path: '/zurf',
    icon: <GiIcons.GiSurferVan />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];