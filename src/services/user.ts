export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
}) {

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar o usuário');
  }

  return response.json();
}
