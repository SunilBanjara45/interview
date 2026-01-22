// components/Sidebar.tsx
import React from 'react';
import { Search, Home, Users, Trophy, Bell, Settings, Download } from 'lucide-react';
import { SidebarProps, MenuItem, CompetitionItem } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: MenuItem[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'leader', icon: Trophy, label: 'Leader Board' },
    { id: 'bracket', icon: Users, label: 'Bracket' },
    { id: 'chat', icon: Bell, label: 'Chat' },
    { id: 'notification', icon: Bell, label: 'Notification' },
  ];

  const competitionItems: CompetitionItem[] = [
    { id: 'uefa', label: 'UEFA Champions League', count: 122 },
    { id: 'laliga', label: 'LaLiga Santander', count: 80 },
    { id: 'premier', label: 'Premier League', count: 250 },
    { id: 'ligue1', label: 'Ligue 1', count: 64 },
  ];

  return (
    <div className="w-[278px] bg-gray-950 p-4 flex flex-col rounded-[20px]">
      <div className="mb-8">
        <div className="text-center gap-2 mb-6">
          {/* <div className="w-8 h-8 bg-yellow-400 rounded"></div> */}
          <span className="font-bold text-lg ">FOOTBALL<span className='text-[#c3cc5a]'>SHURU</span> </span>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Following</h3>
        <div className="space-y-1">
          {competitionItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <span className="text-sm">{item.label}</span>
              <span className="text-xs text-gray-500">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500">
          <Download className="w-5 h-5" />
          <span className="text-sm font-semibold">Download The App</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Oyen</div>
            <div className="text-xs text-gray-400">oyen@email.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;