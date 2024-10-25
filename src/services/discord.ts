import { Client, GatewayIntentBits } from 'discord.js';

export class DiscordService {
  private client: Client;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ]
    });
  }

  async connect(token: string): Promise<void> {
    try {
      await this.client.login(token);
      
      return new Promise((resolve, reject) => {
        this.client.once('ready', () => {
          this.isReady = true;
          resolve();
        });

        this.client.once('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      throw new Error('Failed to connect to Discord. Please check your token.');
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      this.client.destroy();
      this.isReady = false;
    }
  }

  async getServers() {
    if (!this.isReady) {
      throw new Error('Discord client is not connected');
    }

    const guilds = Array.from(this.client.guilds.cache.values());
    const serversWithMembers = await Promise.all(
      guilds.map(async (guild) => {
        try {
          const memberCount = (await guild.members.fetch()).size;
          return {
            id: guild.id,
            name: guild.name,
            memberCount
          };
        } catch (error) {
          console.error(`Failed to fetch members for guild ${guild.id}:`, error);
          return {
            id: guild.id,
            name: guild.name,
            memberCount: guild.memberCount // Fallback to approximate count
          };
        }
      })
    );

    return serversWithMembers;
  }

  async leaveServer(serverId: string): Promise<boolean> {
    if (!this.isReady) {
      throw new Error('Discord client is not connected');
    }

    const guild = this.client.guilds.cache.get(serverId);
    if (!guild) {
      throw new Error('Server not found');
    }

    try {
      await guild.leave();
      return true;
    } catch (error) {
      console.error('Failed to leave server:', error);
      throw new Error('Failed to leave server');
    }
  }
}

export const discordService = new DiscordService();