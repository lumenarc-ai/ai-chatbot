# DemoGraph Service

A TypeScript service for interacting with Model Control Protocol (MCP) servers using the Vercel AI SDK.

## Overview

The DemoGraph service provides a clean abstraction for communicating with MCP servers. It encapsulates the Vercel AI SDK's `experimental_createMCPClient` functionality and provides methods for:

1. Listing available tools from an MCP server
2. Calling specific tools with arguments
3. Managing MCP client sessions

This service is designed to be used in Next.js applications that need to interact with MCP servers for AI tool functionality.

## Key Features

- Session management with automatic UUID generation
- Tool discovery and conversion between object and array formats
- Direct tool calling with proper error handling
- Client lifecycle management (creation, reuse, and cleanup)
- Integration with AI SDK for using MCP tools with language models

## Installation

The service is part of the application codebase and doesn't require separate installation. It depends on:

- `uuid` for session ID generation
- Vercel AI SDK's `experimental_createMCPClient` for MCP client creation

## Usage

### Basic Usage

```typescript
import { demoGraphService } from '@/services/demo-graph';

// List available tools
const tools = await demoGraphService.listTools();

// Call a specific tool
const result = await demoGraphService.callTool('tool-name', { arg1: 'value1' });
```

### API Integration

The service is typically used in API routes to provide MCP functionality to frontend components:

```typescript
// In an API route
import { demoGraphService } from '@/services/demo-graph';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages, toolName, args } = await req.json();

  // Direct tool call
  if (toolName) {
    const result = await demoGraphService.callTool(toolName, args || {});
    return Response.json({ result });
  }

  try {
    // Register MCP tools for AI assistant
    const mcpTools = await demoGraphService.registerTools();

    // Use tools with AI SDK
    const result = streamText({
      model: openai('gpt-4o'),
      messages,
      tools: mcpTools,
      maxSteps: 10,
      onFinish: async () => {
        // Always close the client when done
        await demoGraphService.closeClient();
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in MCP API route:', error);
    // Make sure to close the client even if there's an error
    await demoGraphService.closeClient();
    throw error;
  }
}
```

### UI Integration

Frontend components can interact with the service through API routes:

```typescript
// In a React component
const fetchTools = async () => {
  const response = await fetch('/api/mcp');
  const data = await response.json();

  if (data.tools) {
    // Process tools data
    setTools(data.tools);
  }
};

const callTool = async () => {
  const response = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      toolName: selectedTool,
      args: parsedArgs,
    }),
  });

  const data = await response.json();
  // Process result
};
```

## API Reference

### Interfaces

#### `MCPTool`

Represents a tool available on the MCP server.

```typescript
interface MCPTool {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}
```

#### `MCPCallResult`

Represents the result of a tool call.

```typescript
interface MCPCallResult {
  text: string;
  [key: string]: unknown;
}
```

### Methods

#### `getMCPClient()`

Gets or creates an MCP client instance.

- **Returns**: `Promise<MCPClient>` - The MCP client instance
- **Usage**:
  ```typescript
  const client = await demoGraphService.getMCPClient();
  ```

#### `getUrl()`

Gets the full URL with session ID.

- **Returns**: `string` - The URL with session ID
- **Usage**:
  ```typescript
  const url = demoGraphService.getUrl();
  ```

#### `listTools()`

Lists all available tools from the MCP server as an array.

- **Returns**: `Promise<MCPTool[]>` - Array of available tools
- **Usage**:
  ```typescript
  const tools = await demoGraphService.listTools();
  ```

#### `getTools(options?)`

Gets the tools from the MCP client in their original object format for use with AI SDK.

- **Parameters**:
  - `options?: { schemas?: Record<string, any> }` - Optional configuration for tool retrieval
- **Returns**: `Promise<object>` - Object containing tools
- **Usage**:
  ```typescript
  // Get all tools with automatic schema inference
  const tools = await demoGraphService.getTools();

  // Get specific tools with explicit schema definitions
  const tools = await demoGraphService.getTools({
    schemas: {
      'tool-name': {
        parameters: z.object({
          param1: z.string().describe('Parameter description'),
        }),
      },
    },
  });
  ```

#### `registerTools(options?)`

Registers MCP tools for use with the AI SDK's streamText and generateText functions.

- **Parameters**:
  - `options?: { schemas?: Record<string, any> }` - Optional configuration for tool registration
- **Returns**: `Promise<object>` - Object containing registered tools
- **Usage**:
  ```typescript
  const mcpTools = await demoGraphService.registerTools();

  // Use with AI SDK
  const result = streamText({
    model: yourModel,
    messages,
    tools: mcpTools,
    maxSteps: 5,
  });
  ```

#### `callTool(toolName, args)`

Calls a tool on the MCP server.

- **Parameters**:
  - `toolName: string` - Name of the tool to call
  - `args: Record<string, unknown>` - Arguments to pass to the tool
- **Returns**: `Promise<MCPCallResult[]>` - Results of the tool call
- **Usage**:
  ```typescript
  const result = await demoGraphService.callTool('get-weather', { location: 'New York' });
  ```

#### `getSessionId()`

Gets the current session ID.

- **Returns**: `string` - The current session ID
- **Usage**:
  ```typescript
  const sessionId = demoGraphService.getSessionId();
  ```

#### `resetSession()`

Resets the session ID and clears the MCP client.

- **Usage**:
  ```typescript
  demoGraphService.resetSession();
  ```

#### `closeClient()`

Closes the MCP client and releases resources.

- **Returns**: `Promise<void>`
- **Usage**:
  ```typescript
  await demoGraphService.closeClient();
  ```

## Implementation Details

### Session Management

The service generates a UUID for each session and maintains it throughout the lifecycle of the service instance. The session ID can be reset if needed.

### MCP Client Lifecycle

The service lazily creates the MCP client when needed and reuses it for subsequent operations. The client can be explicitly closed to release resources.

### Error Handling

All methods include proper error handling with detailed error messages and logging.

## Best Practices

1. **Resource Management**: Always close the client when done with it to prevent resource leaks:
   ```typescript
   try {
     // Use the service
   } finally {
     await demoGraphService.closeClient();
   }
   ```

2. **Error Handling**: Wrap service calls in try/catch blocks to handle potential errors:
   ```typescript
   try {
     const result = await demoGraphService.callTool(toolName, args);
   } catch (error) {
     console.error('Error calling tool:', error);
   }
   ```

3. **Tool Format Conversion**: Be aware that `listTools()` returns an array format suitable for UI components, while `getTools()` and `registerTools()` return the original object format needed by the AI SDK.

4. **Closing in onFinish**: When using with streaming responses, always close the client in the `onFinish` callback:
   ```typescript
   const result = streamText({
     // ...
     onFinish: async () => {
       await demoGraphService.closeClient();
     },
   });
   ```

5. **Schema Definitions**: For better type safety and IDE support, define schemas explicitly when using `registerTools()`:
   ```typescript
   const mcpTools = await demoGraphService.registerTools({
     schemas: {
       'tool-name': {
         parameters: z.object({
           param1: z.string().describe('Parameter description'),
         }),
       },
     },
   });
   ```

## Troubleshooting

### Common Issues

1. **"Failed to call tool: Method Not Allowed"**
   - Ensure the correct URL format is used for tool calls
   - Verify the session ID is properly included in the URL

2. **"tools.map is not a function"**
   - This occurs when trying to use array methods on the object format
   - Use `listTools()` instead of `getTools()` or `registerTools()` for UI components

3. **Connection Issues**
   - Check that the MCP server URL is correct
   - Verify network connectivity to the MCP server

4. **"Cannot read properties of null (reading 'tools')"**
   - This occurs when trying to use tools from a closed MCP client
   - Make sure the client is initialized before calling `tools()`
   - Don't call `closeClient()` before using the tools

5. **Tool Schema Errors**
   - If the model fails to call tools correctly, try providing explicit schemas
   - Use the `schemas` option with `registerTools()` to define parameter types

## License

This service is part of the main application and is subject to the same license terms.
