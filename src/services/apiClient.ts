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
    const message = await response.text();
    throw new Error(message || 'Erro ao realizar tarefa, tente novamente');
  }

  // Parse the response
  return response.json() as T;
}