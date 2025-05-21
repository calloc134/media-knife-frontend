// src/lib/apiService.ts

const API_BASE_URL = window.location.origin;

interface UploadResponse {
  filename: string;
}

interface DownloadFromUrlResponse {
  filename: string;
}

interface ProcessFileResponse {
  filename: string;
  url: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText || response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<UploadResponse>(response);
}

export async function downloadFromUrl(url: string): Promise<DownloadFromUrlResponse> {
  const response = await fetch(`${API_BASE_URL}/yt-dlp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  return handleResponse<DownloadFromUrlResponse>(response);
}

export async function processFile(filename: string, processType: string): Promise<ProcessFileResponse> {
  const response = await fetch(`${API_BASE_URL}/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, process: processType }),
  });
  return handleResponse<ProcessFileResponse>(response);
}
