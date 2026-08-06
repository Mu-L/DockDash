import { sanitizeDockerError } from "@server/lib/errors.js";
import { describe, expect, it } from "vitest";

describe("sanitizeDockerError", () => {
  it("extracts the message from an Error instance", () => {
    expect(sanitizeDockerError(new Error("connection refused"))).toBe("connection refused");
  });

  it("converts a plain string to itself", () => {
    expect(sanitizeDockerError("raw string error")).toBe("raw string error");
  });

  it("converts non-Error, non-string values via String()", () => {
    expect(sanitizeDockerError(42)).toBe("42");
    expect(sanitizeDockerError(null)).toBe("null");
  });

  it("strips HTML tags from the message", () => {
    const err = new Error("<html><body><h1>403 Forbidden</h1></body></html>");

    expect(sanitizeDockerError(err)).toBe("403 Forbidden");
  });

  it("escapes a stray angle bracket instead of assembling a nested tag", () => {
    expect(sanitizeDockerError(new Error("<<script>alert('xss')</script>"))).toBe("&lt;");
  });

  it("renders an unterminated tag as harmless text", () => {
    expect(sanitizeDockerError(new Error("safe text <script"))).toBe("safe text script");
  });

  it("collapses multiple whitespace sequences into a single space", () => {
    const err = new Error("some   error\n\nwith   whitespace");

    expect(sanitizeDockerError(err)).toBe("some error with whitespace");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeDockerError(new Error("  trimmed  "))).toBe("trimmed");
  });

  it("handles a message that is only HTML (leaves empty string after stripping)", () => {
    expect(sanitizeDockerError(new Error("<br/>"))).toBe("");
  });
});
