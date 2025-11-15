/**
 * Generic function to perform HTTP requests
 * Authentication is handled automatically via NextAuth session cookies
 */
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
): Promise<T> {
  // Form header - NextAuth session cookies are automatically sent by the browser
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Create the request
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Analyze the response
  if (!response.ok) {
    let message: string;
    try {
      const errorData = await response.json();
      message = errorData.message || 'Error performing task, please try again';
    } catch {
      message = await response.text() || 'Error performing task, please try again';
    }
    
    // Create the error
    const error = new Error(message);

    // Attach status code to error
    (error as Error & { status: number }).status = response.status;

    // Throw the error
    throw error;
  }

  // Parse the response
  return response.json() as T;
}