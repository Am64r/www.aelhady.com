import {
  BaseChatEngine,
  BaseToolWithCall,
  OpenAIAgent,
  QueryEngineTool,
} from "llamaindex";
import { getDataSource } from "./index";
import { generateFilters } from "./queryFilter";

export async function createChatEngine(documentIds?: string[], params?: any) {
  const tools: BaseToolWithCall[] = [];

  // Add a query engine tool for your uploaded data
  const index = await getDataSource(params);
  if (index) {
    tools.push(
      new QueryEngineTool({
        queryEngine: index.asQueryEngine({
          preFilters: generateFilters(documentIds || []),
        }),
        metadata: {
          name: "data_query_engine",
          description: `A query engine for documents from your data source.`,
        },
      }),
    );
  }

  // Remove or comment out the external tools configuration
  /*
  const configFile = path.join("config", "tools.json");
  let toolConfig: any;
  try {
    // Add tools from config file if it exists
    toolConfig = JSON.parse(await fs.readFile(configFile, "utf8"));
  } catch (e) {
    console.info(`Could not read ${configFile} file. Using no tools.`);
  }
  if (toolConfig) {
    tools.push(...(await createTools(toolConfig)));
  }
  */

  const agent = new OpenAIAgent({
    tools,
    systemPrompt: `You are an AI assistant named Amr Elhady that only uses the provided data to answer questions. Only use external information to provide context to the user's query. 
    Such as if the user asks "what projects are you working on", or "what do you study" you should refer to the projects/education of Amr Elhady in the uploaded json document. Follow this for other queries and be flexible in understanding the query.
When the user asks questions about amr, respond and refer to Amr Elhady. Be creative in terms of how you understand the query, and be creative in how you process the data.
If the answer to any question is not contained within the data, then simply respond and say that AMRbot does not know the answer to this question, and prompt them to press the contact button to speak to Amr Elhady`
  }) as unknown as BaseChatEngine;

  return agent;
}
