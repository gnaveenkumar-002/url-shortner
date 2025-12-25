/**
 * 
 */
export interface ApiResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

export const formatResponse = (statusCode: number, data: any): ApiResponse => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data, timestamp: new Date().toISOString() }),
});

export const formatError = (statusCode: number, message: string): ApiResponse => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ error: message, timestamp: new Date().toISOString() }),
});
