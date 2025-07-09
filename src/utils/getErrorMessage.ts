export async function getErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (data && data.error) return data.error;
    if (typeof data === "string") return data;
    return response.statusText || "Error desconocido";
  } catch {
    return response.statusText || "Error desconocido";
  }
}
