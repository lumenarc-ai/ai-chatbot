import { v4 as uuidv4 } from 'uuid';
import { experimental_createMCPClient } from 'ai';

export interface MCPTool {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export interface MCPCallResult {
  text: string;
  [key: string]: unknown;
}

export class DemoGraphService {
  private serverUrl: string;
  private sessionId: string;
  private mcpClient: Awaited<ReturnType<typeof experimental_createMCPClient>> | null = null;

  constructor(serverUrl?: string) {
    this.sessionId = uuidv4();
    this.serverUrl = serverUrl || 'https://spro-dev.responseiq.com/mcp/sse';
  }

  /**
   * Get or create the MCP client
   */
  public async getMCPClient() {
    if (!this.mcpClient) {
      this.mcpClient = await experimental_createMCPClient({
        transport: {
          type: 'sse',
          url: `${this.serverUrl}?session_id=${this.sessionId}`,
        },
      });
    }
    return this.mcpClient;
  }

  /**
   * Get the full URL with session ID
   */
  public getUrl(): string {
    return `${this.serverUrl}?session_id=${this.sessionId}`;
  }

  /**
   * List all available tools from the MCP server
   * Uses the AI SDK's experimental_createMCPClient
   * Returns an array of tools for the UI
   */
  public async listTools(): Promise<MCPTool[]> {
    try {
      const client = await this.getMCPClient();
      const toolsObj = await client.tools();

      // Convert the tools object to an array
      const toolsArray = Object.entries(toolsObj).map(([name, tool]) => {
        // Create a properly typed MCPTool object
        const mcpTool: MCPTool = {
          name,
          description: typeof tool.description === 'string' ? tool.description : '',
          parameters: {},
        };
        return mcpTool;
      });

      console.log('Tools array:', toolsArray);
      return toolsArray;
    } catch (error) {
      console.error('Error listing tools:', error);
      throw error;
    }
  }

  /**
   * Get the tools from the MCP client for use with AI SDK
   * @param {Object} options - Optional configuration for tool retrieval
   * @param {Record<string, any>} options.schemas - Optional schema definitions for tools
   * @returns {Promise<Record<string, any>>} - Object containing MCP tools
   */
  public async getTools(options?: { schemas?: Record<string, any> }) {
    try {
      const client = await this.getMCPClient();
      return await client.tools(options);
    } catch (error) {
      console.error('Error getting tools:', error);
      // Return an empty object if there's an error
      return {};
    }
  }

  /**
   * Register MCP tools with the AI SDK
   * This method retrieves tools from the MCP server and makes them available
   * for use with the AI SDK's streamText and generateText functions
   *
   * @param {Object} options - Optional configuration for tool registration
   * @param {Record<string, any>} options.schemas - Optional schema definitions for tools
   * @returns {Promise<Record<string, any>>} - Object containing registered MCP tools
   */
  public async registerTools(options?: { schemas?: Record<string, any> }) {
    try {
      // Get the MCP tools using the existing getTools method
      const tools = await this.getTools(options);

      console.log('Registered MCP tools:', Object.keys(tools));
      return tools;
    } catch (error) {
      console.error('Error registering MCP tools:', error);
      throw error;
    }
  }

  /**
   * Call a tool on the MCP server
   * Uses the MCP client to call a tool
   */
  public async callTool(
    toolName: string,
    args: Record<string, unknown> = {},
  ): Promise<MCPCallResult[]> {
    try {
      console.log(`Calling tool ${toolName} with args:`, args);

      const client = await this.getMCPClient();

      const tools = await client.tools();

      console.log('Tools:', tools);

      const result = await tools[toolName].execute(args, null);

      return result;
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      throw error;
    }
  }

  /**
   * Get the current session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Reset the session ID
   */
  public resetSession(): void {
    this.sessionId = uuidv4();
    this.mcpClient = null;
  }

  /**
   * Close the MCP client
   */
  public async closeClient(): Promise<void> {
    if (this.mcpClient) {
      await this.mcpClient.close();
      this.mcpClient = null;
    }
  }
}

// Export a singleton instance
export const demoGraphService = new DemoGraphService();

// Export default for direct imports
export default DemoGraphService;
