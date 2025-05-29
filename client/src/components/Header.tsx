
import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { 
  Home, 
  Settings, 
  BookOpen, 
  Users, 
  User, 
  Activity, 
  AlertTriangle, 
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProjectStatus } from '@/contexts/ProjectStatusContext';

interface HeaderProps {
  // Remove props since we're using context now
}

const Header: React.FC<HeaderProps> = () => {
  const { activeSessionCount, hasErrors } = useProjectStatus();
  const [location] = useLocation();

  const dashboardItem = { path: '/', icon: Home, label: 'Dashboard' };
  const menuItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/templates', icon: BookOpen, label: 'Templates' },
    { path: '/guides', icon: Users, label: 'Guides' },
    { path: '/forum', icon: Users, label: 'Forum' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isDashboardActive = location === dashboardItem.path;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
            MulmoCast
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-3">
          {/* Dashboard Button - Always visible */}
          <Link href={dashboardItem.path}>
            <Button
              variant={isDashboardActive ? 'default' : 'ghost'}
              size="sm"
              className="relative hover:scale-105 transition-transform duration-200"
            >
              <dashboardItem.icon className="w-4 h-4 mr-2" />
              {dashboardItem.label}
            </Button>
          </Link>

          {/* Status indicators */}
          {activeSessionCount > 0 && (
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-green-500" />
              <Badge variant="secondary" className="text-xs">
                {activeSessionCount} generating
              </Badge>
            </div>
          )}

          {hasErrors && (
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <Badge variant="destructive" className="text-xs">
                Errors
              </Badge>
            </div>
          )}

          {/* Hamburger menu for other items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {/* Other menu items */}
              {menuItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <DropdownMenuItem key={item.path} asChild className={isActive ? 'bg-blue-50 text-blue-600' : ''}>
                    <Link href={item.path} className="flex items-center space-x-2 w-full">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
