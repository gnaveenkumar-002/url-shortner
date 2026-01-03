export const jsonResponse = (statusCode: number, body: any) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const redirectResponse = (location: string) => ({
  statusCode: 302,
  headers: { Location: location },
  body: "",
});

export const errorResponse = (statusCode: number, message: string) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ error: message }),
});
