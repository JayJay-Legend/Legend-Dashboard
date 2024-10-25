import React from 'react';
import { LogOut } from 'lucide-react';

interface Server {
  id: string;
  name: string;
  memberCount: number;
}

interface ServerListProps {
  servers: Server[];
  onLeaveServer: (server: Server) => void;
}

function ServerList({ servers, onLeaveServer }: ServerListProps) {
  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white/70 border-b border-white/10">
              <th className="px-4 py-3 text-left">Server Name</th>
              <th className="px-4 py-3 text-left">Server ID</th>
              <th className="px-4 py-3 text-center">Members</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr
                key={server.id}
                className="text-white border-b border-white/10 hover:bg-white/5"
              >
                <td className="px-4 py-3">{server.name}</td>
                <td className="px-4 py-3 font-mono text-sm">{server.id}</td>
                <td className="px-4 py-3 text-center">{server.memberCount}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onLeaveServer(server)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
                      title="Leave Server"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServerList;