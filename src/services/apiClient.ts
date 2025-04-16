/**
 * Função genérica para realizar requisições HTTP
 */
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T
): Promise<T> {

   // Create the request
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Analyze the response
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }

  // Parse the response
  return response.json() as T;
}