import sanitizeHtml from "sanitize-html";

// docker-modem puts raw HTTP response bodies (e.g. HTML 403 from a socket proxy) into err.message
export function sanitizeDockerError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  const plainText = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

  return plainText.replace(/\s+/g, " ").trim();
}
