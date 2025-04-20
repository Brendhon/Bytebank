/**
 * Função genérica para realizar requisições HTTP
 */
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
  isAuth = true,
): Promise<T> {
  // Form header
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
  };

  // Check if the request is authenticated
  if (!isAuth) delete headers['X-api-key'];

  // Create the request
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Analyze the response
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Erro ao realizar tarefa, tente novamente');
  }

  // Parse the response
  return response.json() as T;
}