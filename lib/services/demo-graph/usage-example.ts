/**
 * Example of how to use the DemoGraph MCP tools with the AI SDK
 * This file demonstrates how to integrate MCP tools with streamText and generateText
 */

import { streamText, generateText } from 'ai';
import { demoGraphService } from './index';
import { z } from 'zod';

/**
 * Example of using MCP tools with streamText
 * This function shows how to use the MCP tools in a streaming context
 * 
 * @param messages - The conversation messages
 * @returns A streaming response
 */
export async function streamWithMCPTools(messages: any[]) {
  try {
    // Get the MCP tools
    const mcpTools = await demoGraphService.registerTools();
    
    // Create a stream with the MCP tools
    const stream = streamText({
      model: /* your model here */,
      messages,
      // Include the MCP tools
      tools: mcpTools,
      // Allow multiple steps for tool calling
      maxSteps: 5,
      // Close the MCP client when the stream is finished
      onFinish: async () => {
        await demoGraphService.closeClient();
      },
    });
    
    return stream;
  } catch (error) {
    console.error('Error streaming with MCP tools:', error);
    // Make sure to close the client even if there's an error
    await demoGraphService.closeClient();
    throw error;
  }
}

/**
 * Example of using MCP tools with generateText
 * This function shows how to use the MCP tools in a non-streaming context
 * 
 * @param prompt - The prompt to send to the model
 * @returns The generated text and tool calls
 */
export async function generateWithMCPTools(prompt: string) {
  try {
    // Get the MCP tools with explicit schema definitions
    const mcpTools = await demoGraphService.registerTools({
      schemas: {
        // Example schema definition for a hypothetical tool
        'get-data': {
          parameters: z.object({
            query: z.string().describe('The data query'),
            format: z.enum(['json', 'text']).optional(),
          }),
        },
        // For tools with no arguments, use an empty object
        'tool-with-no-args': {
          parameters: z.object({}),
        },
      },
    });
    
    // Generate text with the MCP tools
    const result = await generateText({
      model: /* your model here */,
      prompt,
      tools: mcpTools,
      maxSteps: 5,
    });
    
    // Close the MCP client when done
    await demoGraphService.closeClient();
    
    return result;
  } catch (error) {
    console.error('Error generating with MCP tools:', error);
    // Make sure to close the client even if there's an error
    await demoGraphService.closeClient();
    throw error;
  }
}

/**
 * Example of combining MCP tools with local tools
 * This function shows how to use both MCP tools and local tools together
 * 
 * @param messages - The conversation messages
 * @returns A streaming response
 */
export async function streamWithCombinedTools(messages: any[]) {
  try {
    // Get the MCP tools
    const mcpTools = await demoGraphService.registerTools();
    
    // Create a stream with both MCP tools and local tools
    const stream = streamText({
      model: /* your model here */,
      messages,
      // Combine MCP tools with local tools
      tools: {
        ...mcpTools,
        // Add a local tool
        localTool: {
          description: 'A local tool that does something',
          parameters: {
            type: 'object',
            properties: {
              param1: {
                type: 'string',
                description: 'The first parameter',
              },
              param2: {
                type: 'number',
                description: 'The second parameter',
              },
            },
            required: ['param1'],
          },
          execute: async ({ param1, param2 }) => {
            // Local tool implementation
            return `Processed ${param1} with ${param2 || 'default value'}`;
          },
        },
      },
      maxSteps: 5,
      onFinish: async () => {
        await demoGraphService.closeClient();
      },
    });
    
    return stream;
  } catch (error) {
    console.error('Error streaming with combined tools:', error);
    await demoGraphService.closeClient();
    throw error;
  }
}
