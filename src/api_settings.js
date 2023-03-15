// Learn more about the parameters at https://platform.openai.com/docs/api-reference/chat/create
export const api_params = {
    
    model: "gpt-3.5-turbo",
    // What sampling temperature to use, between 0 and 2. 
    // Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
    // We generally recommend altering this or top_p but not both.
    temperature : 1,
    
    // An alternative to sampling with temperature, called nucleus sampling, 
    // where the model considers the results of the tokens with top_p probability mass. 
    // So 0.1 means only the tokens comprising the top 10% probability mass are considered.
    top_p : 1,

    // How many chat completion choices to generate for each input message.
    n : 1,

    // If set, partial message deltas will be sent, like in ChatGPT. 
    // Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a 
    // data: [DONE] message. See the OpenAI Cookbook for example code.
    stream : false,

    // Up to 4 sequences where the API will stop generating further tokens.
    stop: null,

    // The maximum number of tokens to generate in the chat completion.
    // The total length of input tokens and generated tokens is limited by the model's context length.
    max_tokens: 2048,

    // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear 
    // in the text so far, increasing the model's likelihood to talk about new topics.
    presence_penalty: 0,

    // Number between -2.0 and 2.0. Positive values penalize new tokens based on their 
    // existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    frequency_penalty: 0,
}