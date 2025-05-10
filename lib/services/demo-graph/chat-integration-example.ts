/**
 * Example of how to integrate MCP tools with the existing chat route
 * This is a reference implementation that shows how to modify the chat route
 * to include MCP tools from the demo-graph service
 */

import {
  createDataStream,
  smoothStream,
  streamText,
  type UIMessage,
} from 'ai';
import { auth, type UserType } from '@/app/(auth)/auth';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import { generateUUID } from '@/lib/utils';
import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
import { demoGraphService } from '@/lib/services/demo-graph';
import { Session } from 'next-auth';

/**
 * Process a chat request with MCP tools
 * This function shows how to integrate MCP tools with the existing chat route
 * 
 * @param messages - The conversation messages
 * @param selectedChatModel - The selected chat model
 * @param requestHints - Additional request hints
 * @param session - The user session
 * @returns A streaming response with MCP tools
 */
export async function processChatWithMCPTools({
  messages,
  selectedChatModel,
  requestHints,
  session,
}: {
  messages: UIMessage[];
  selectedChatModel: string;
  requestHints: RequestHints;
  session: Session;
}) {
  // Create a data stream for the response
  const stream = createDataStream({
    execute: async (dataStream) => {
      try {
        // Get MCP tools from the demo-graph service
        const mcpTools = await demoGraphService.registerTools();
        
        // Combine MCP tools with existing tools
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages,
          maxSteps: 5,
          experimental_transform: smoothStream({ chunking: 'word' }),
          experimental_generateMessageId: generateUUID,
          // Include both existing tools and MCP tools
          tools: {
            // Existing tools
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
            // Include MCP tools
            ...mcpTools,
          },
          // Only activate specific tools based on the model
          experimental_activeTools:
            selectedChatModel === 'chat-model-reasoning'
              ? []
              : [
                  // Existing tools
                  'getWeather',
                  'createDocument',
                  'updateDocument',
                  'requestSuggestions',
                  // Add MCP tool names here
                  // For example: 'get-data', 'search-knowledge-base', etc.
                  // You can dynamically get these from mcpTools: Object.keys(mcpTools)
                ],
          onFinish: async ({ response }) => {
            // Close the MCP client when done
            await demoGraphService.closeClient();
            
            // Additional onFinish logic (e.g., saving messages)
            // ...
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text-with-mcp',
          },
        });
        
        return result;
      } catch (error) {
        console.error('Error processing chat with MCP tools:', error);
        // Make sure to close the MCP client even if there's an error
        await demoGraphService.closeClient();
        throw error;
      }
    },
  });
  
  return stream;
}

/**
 * How to use this in a route handler:
 * 
 * ```typescript
 * // In app/(chat)/api/chat/route.ts
 * import { processChatWithMCPTools } from '@/lib/services/demo-graph/chat-integration-example';
 * 
 * export async function POST(request: Request) {
 *   // ... existing code to parse request and validate session
 *   
 *   const stream = await processChatWithMCPTools({
 *     messages,
 *     selectedChatModel,
 *     requestHints,
 *     session,
 *   });
 *   
 *   return stream.toResponse();
 * }
 * ```
 */
