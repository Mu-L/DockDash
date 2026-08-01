// Development-only mock entry point — not included in production builds.
// Sets up an in-memory database and mock Docker service before starting the server.
import { logger } from "./lib/logService.js";
import { overrideDockerRuntime } from "./services/containerRuntime/dockerRuntime.js";
import { setupMockDatabase } from "./services/mock/mockDatabaseService.js";
import { mockDockerRuntime } from "./services/mock/mockDockerRuntime.js";

setupMockDatabase();
overrideDockerRuntime(mockDockerRuntime);
logger.info("Mock mode enabled — in-memory database seeded, MockDockerRuntime active");

await import("./index.js");
