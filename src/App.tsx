import React, { useState, useEffect } from 'react';
import { Bot, Search, Users, ArrowLeft, ArrowRight, LogOut, AlertTriangle } from 'lucide-react';
import TokenInput from './components/TokenInput';
import StatsCard from './components/StatsCard';
import ServerList from './components/ServerList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import AranaBanner from './components/AranaBanner';

interface Server {
  id: string;
  name: string;
  memberCount: number;
}

function App() {
  const [token, setToken] = useState('');
  const [servers, setServers] = useState<Server[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const serversPerPage = 20;

  useEffect(() => {
    if (token) {
      // Simulate fetching data from Discord API
      const mockServers = Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`.padStart(18, '0'),
        name: `Server ${i + 1}`,
        memberCount: Math.floor(Math.random() * 1000) + 50
      }));
      setServers(mockServers);
      setTotalUsers(mockServers.reduce((acc, server) => acc + server.memberCount, 0));
    }
  }, [token]);

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentServers = filteredServers.slice(
    (currentPage - 1) * serversPerPage,
    currentPage * serversPerPage
  );

  const handleLeaveServer = (server: Server) => {
    setSelectedServer(server);
    setShowModal(true);
  };

  const confirmLeaveServer = () => {
    if (selectedServer) {
      setServers(servers.filter(s => s.id !== selectedServer.id));
      setShowModal(false);
      setSelectedServer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-white mr-4" />
            <h1 className="text-4xl font-bold text-white">Jay Dashboard</h1>
          </div>
          {!token && <TokenInput onSubmit={setToken} />}
        </header>

        {token && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatsCard
                icon={<Bot className="w-6 h-6" />}
                title="Total Servers"
                value={servers.length}
              />
              <StatsCard
                icon={<Users className="w-6 h-6" />}
                title="Total Users"
                value={totalUsers}
              />
            </div>

            <AranaBanner />

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <ServerList
                servers={currentServers}
                onLeaveServer={handleLeaveServer}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredServers.length / serversPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmLeaveServer}
          server={selectedServer}
        />
      </div>
    </div>
  );
}

export default App;