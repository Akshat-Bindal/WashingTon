// src/utils/api.ts
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  useAuth: boolean = false
) {
  try {
    // Normalize base URL (no trailing slash)
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

    // Normalize path (ensure single leading slash)
    const path = url.startsWith("/") ? url : `/${url}`;

    const fullUrl = `${base}${path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (useAuth) {
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(fullUrl, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unknown error occurred");
  }
}

