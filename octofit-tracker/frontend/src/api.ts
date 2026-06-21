export const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === 'object') {
    const response = payload as Record<string, unknown>;

    if (Array.isArray(response.items)) {
      return response.items as T[];
    }

    if (response.data && Array.isArray(response.data)) {
      return response.data as T[];
    }
  }

  return [];
}

export async function fetchApi<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${endpoint}: ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeResponse<T>(payload);
}
