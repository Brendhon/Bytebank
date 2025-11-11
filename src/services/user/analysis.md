# Análise Arquitetural: Serviço: user.service.ts

## 📋 Resumo Executivo
**Status:** ⚠️ Requer Atenção (72%)

O arquivo `user.service.ts` apresenta funções para gerenciamento de usuários (registro, busca, atualização, exclusão). O código utiliza TypeScript com tipagem forte, implementa validação de senha e email, e centraliza a lógica de comunicação com a API através do `apiClient`. As funções possuem documentação JSDoc, seguem o padrão de responsabilidade única, e reutilizam tipos do projeto. No entanto, existem violações relacionadas a mensagens de erro em português, falta de tratamento de erros mais robusto, validação de senha no cliente (deveria ser apenas no servidor), e falta de validação de entrada mais rigorosa.

**Conformidade:** 72%

## 🚨 Requisitos Técnicos Infringidos

### 1. Mensagens de Erro em Português (Prioridade: Alta)
- **Requisito:** Todos os comentários e documentação devem estar em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments" e "Documentation Rules"
- **Infração:** As mensagens de erro estão em português: `'Usuário não encontrado'` (linha 101), `'Senha inválida'` (linha 107), `'Email inválido'` (linha 118). Os comentários também estão em português (linhas 8, 22, 28, 35, 40, 42, 50, 59, 62, 69, 77, 83, 90, 100, 103, 106, 111, 117).
- **Impacto:** Viola o padrão estabelecido no projeto e pode causar inconsistência na documentação e experiência do usuário.

### 2. Validação de Senha no Cliente (Prioridade: Alta)
- **Requisito:** Validação de senha deve ser realizada apenas no servidor. O cliente não deve ter acesso a senhas hasheadas para comparação.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** A função `validatePassword` (linhas 96-108) busca o usuário do servidor e compara a senha no cliente usando `bcrypt.compare`. Isso expõe a senha hasheada ao cliente e permite tentativas de força bruta.
- **Impacto:** **CRÍTICO** - Compromete a segurança ao expor lógica de validação de senha no cliente e permite ataques de força bruta. A validação de senha deve ser feita exclusivamente no servidor.

### 3. Falta de Tratamento de Erros Robusto (Prioridade: Média)
- **Requisito:** Tratamento robusto de erros com códigos de status HTTP apropriados e mensagens claras.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria"
- **Infração:** As funções lançam erros genéricos sem diferenciar tipos de erro ou fornecer informações mais detalhadas sobre o que ocorreu.
- **Impacto:** Dificulta o debugging e não fornece feedback adequado sobre o tipo de erro ocorrido.

### 4. Falta de Validação de Entrada Mais Rigorosa (Prioridade: Média)
- **Requisito:** Validação de input em todas as entradas com validação de formato e comprimento.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** A função `isEmailValid` apenas verifica se o email existe, mas não valida o formato do email (linhas 116-119). A validação de formato deveria ser feita antes de enviar para a API.
- **Impacto:** Pode permitir que emails inválidos sejam processados, causando erros desnecessários na API.

### 5. Uso de Non-null Assertion (Prioridade: Baixa)
- **Requisito:** Evitar uso de non-null assertion (`!`) quando possível, preferindo validação explícita.
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript"
- **Infração:** O código utiliza non-null assertion (`email!`) nas linhas 43, 60, após verificar se o email é válido.
- **Impacto:** Embora funcione após validação, pode ser mais seguro usar validação explícita ou early return.

## Pontos em Conformidade

1. **Nomenclatura e Estrutura:** As funções seguem a convenção `camelCase` e estão em arquivo com nomenclatura adequada (`user.service.ts`).
2. **TypeScript e Tipagem:** O código utiliza TypeScript com tipagem forte, utilizando tipos do projeto (`IUser`, `AccountFormData`).
3. **Reutilização de Tipos:** Reutiliza tipos do projeto (`IUser`, `AccountFormData`) para garantir consistência.
4. **Tipos de Retorno:** Todas as funções têm tipos de retorno explícitos.
5. **Documentação JSDoc:** Todas as funções exportadas possuem documentação JSDoc explicando propósito, parâmetros e retorno.
6. **Responsabilidade Única (SRP):** Cada função tem uma responsabilidade única e bem definida.
7. **Clean Code:** O código é legível e bem estruturado.
8. **Centralização de Endpoints:** A função `getEndpoint` centraliza a formação de endpoints, evitando duplicação.
9. **Validação de Email:** Implementa validação básica de email antes de fazer requisições.
10. **Tratamento de Dados:** Remove campos vazios e processa dados antes de enviar para a API (linhas 70, 63-67).

## Pontos de Melhoria

1. **Validação de Formato de Email:** A validação de email poderia ser mais rigorosa, verificando formato antes de fazer requisições.
2. **Constantes para Mensagens:** Mensagens de erro deveriam ser extraídas para constantes ou arquivo de configuração.
3. **Tipos de Erro Customizados:** Poderia criar tipos de erro customizados para diferentes cenários (UserNotFoundError, InvalidPasswordError, etc.).
4. **Validação de Senha no Servidor:** A validação de senha deveria ser feita exclusivamente no servidor através de endpoints específicos.
5. **Retry Logic:** Para requisições que falham, poderia implementar lógica de retry com backoff exponencial.

## 🎨 Design Patterns Utilizados

1. **Service Layer Pattern:** Utiliza o padrão de camada de serviço para abstrair a lógica de negócio e comunicação com a API.
   - **Localização:** Todo o arquivo `user.service.ts`
   - **Benefício:** Separa a lógica de negócio da lógica de apresentação, facilitando manutenção, testes e reutilização.

2. **Repository Pattern (Parcial):** As funções abstraem o acesso a dados de usuário, funcionando como uma camada de repositório.
   - **Localização:** Funções `getUserByEmail`, `getAllUsers`, `registerUser`, `updateUser`, `deleteUser`
   - **Benefício:** Centraliza a lógica de acesso a dados, facilitando mudanças futuras na implementação da API.

3. **Factory Pattern (Parcial):** A função `getEndpoint` funciona como uma factory para criar endpoints baseados em parâmetros.
   - **Localização:** Linhas 12-14
   - **Benefício:** Centraliza a lógica de formação de endpoints, evitando duplicação e facilitando manutenção.

4. **Strategy Pattern (Parcial):** Diferentes funções implementam diferentes estratégias de operação (CRUD) sobre usuários.
   - **Localização:** Funções de CRUD (create, read, update, delete)
   - **Benefício:** Permite adicionar novas operações sem modificar código existente.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** Cada função tem uma responsabilidade única e bem definida.
   - **Evidência:** `registerUser` registra usuários, `getUserByEmail` busca por email, `updateUser` atualiza, `deleteUser` exclui, `validatePassword` valida senha, `isEmailValid` valida email.

2. **Open/Closed Principle (OCP):** As funções são extensíveis através de parâmetros sem necessidade de modificar o código interno.
   - **Evidência:** Funções aceitam diferentes parâmetros (email, data) permitindo uso em diferentes contextos.

3. **Dependency Inversion Principle (DIP):** As funções dependem da abstração `request` do `apiClient` em vez de implementação concreta.
   - **Evidência:** Importação e uso de `request` do `./apiClient` (linha 5).

### A Implementar

1. **Interface Segregation Principle (ISP):** Poderia criar interfaces específicas para diferentes operações (IUserReader, IUserWriter) em vez de ter todas as operações em um único serviço.
   - **Justificativa:** Separar interfaces permitiria que clientes dependam apenas das operações que realmente utilizam.
   - **Plano:** Criar interfaces específicas e refatorar o serviço para implementá-las.

## Plano de Ação

### 1. Traduzir Mensagens e Comentários para Inglês (Prioridade: Alta)
- Traduzir todas as mensagens de erro e comentários para inglês.
- Código exemplo:
```typescript
/**
 * Form the endpoint for the API
 * @param {string} email - The email of the user
 * @returns {string} - The endpoint URL
 */
function getEndpoint(email?: string | null | undefined): string {
  return `/api/users${email ? `/${email}` : ''}`;
}

/**
 * Registers a new user by sending a POST request to the API.
 * @param {IUser} data - The user data to register
 * @returns {Promise<IUser>} - The registered user data
 */
export async function registerUser(data: IUser): Promise<IUser> {
  // Send request to API
  return request<IUser>('POST', getEndpoint(), data);
}

// ... similar for all functions

/**
 * Validates a user's password by comparing it with the hashed password in the database.
 * @param {string} email - The email of the user
 * @param {string} plain - The plain text password to validate
 * @returns {Promise<void>} - Resolves if the password is valid, rejects otherwise
 * @throws {Error} - Throws an error if the user is not found or the password is invalid
 */
async function validatePassword(email: string, plain: string): Promise<void> {
  // Connect to the database
  const user = await getUserByEmail(email);

  // Check if email is valid
  if (!user) throw new Error('User not found');

  // Compare the plain text password with the hashed password
  const isValid = await bcrypt.compare(plain, user.password);

  // If the password is invalid, throw an error
  if (!isValid) throw new Error('Invalid password');
}

/**
 * Check if email is valid
 * @param {string} email - The email to check
 * @returns {void}
 * @throws {Error} - Throws an error if the email is invalid
 */
function isEmailValid(email: string | null | undefined): void {
  // Check if email is valid
  if (!email) throw new Error('Invalid email');
}
```

### 2. Mover Validação de Senha para o Servidor (Prioridade: Crítica)
- Remover a função `validatePassword` do cliente e criar um endpoint no servidor para validação de senha.
- Atualizar `deleteUser` e `updateUser` para usar o endpoint de validação no servidor.
- Código exemplo:
```typescript
/**
 * Deletes a user by sending a DELETE request to the API.
 * Password validation is performed server-side.
 * @param {string} email - The email of the user to delete
 * @param {string} password - The password for authentication
 * @returns {Promise<IUser>} - The deleted user data
 */
export async function deleteUser(email: string | null | undefined, password: string): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);
  
  // Send request to API (password validation happens server-side)
  return request<IUser>('DELETE', getEndpoint(email), { password });
}

/**
 * Updates a user by sending a PUT request to the API.
 * Password validation is performed server-side.
 * @param {string} email - Current email of the user
 * @param {AccountFormData} data - The user data to update
 * @returns {Promise<IUser>} - The updated user data
 */
export async function updateUser(email: string | null | undefined, data: AccountFormData): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);

  // Set password 
  if (data.newPassword) {
    data.password = data.newPassword;
    delete data.newPassword;
    delete data.confirmPassword;
  }

  // Remove empty fields from data
  const cleanedData = removeEmptyFields(data);

  // Send data to API (password validation happens server-side)
  return request<IUser>('PUT', getEndpoint(email), cleanedData);
}

// Remove validatePassword function - validation should be server-side only
```

### 3. Melhorar Tratamento de Erros (Prioridade: Média)
- Criar tipos de erro customizados e melhorar o tratamento de erros.
- Código exemplo:
```typescript
class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found`);
    this.name = 'UserNotFoundError';
  }
}

class InvalidPasswordError extends Error {
  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordError';
  }
}

class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email');
    this.name = 'InvalidEmailError';
  }
}

function isEmailValid(email: string | null | undefined): void {
  if (!email) throw new InvalidEmailError();
}

async function validatePassword(email: string, plain: string): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) throw new UserNotFoundError(email);
  
  const isValid = await bcrypt.compare(plain, user.password);
  if (!isValid) throw new InvalidPasswordError();
}
```

### 4. Adicionar Validação de Formato de Email (Prioridade: Média)
- Adicionar validação de formato de email antes de fazer requisições.
- Código exemplo:
```typescript
/**
 * Check if email is valid
 * @param {string} email - The email to check
 * @returns {void}
 * @throws {Error} - Throws an error if the email is invalid
 */
function isEmailValid(email: string | null | undefined): void {
  if (!email) throw new Error('Invalid email');
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
}
```

### 5. Remover Non-null Assertion (Prioridade: Baixa)
- Substituir non-null assertion por validação explícita ou early return.
- Código exemplo:
```typescript
export async function deleteUser(email: string | null | undefined, password: string): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);
  
  if (!email) {
    throw new Error('Invalid email');
  }
  
  // Validate password (server-side validation recommended)
  await validatePassword(email, password);

  // Send request to API
  return request<IUser>('DELETE', getEndpoint(email));
}
```

## 📊 Mapeamento
**Arquivo:** `src/services/user.service.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

