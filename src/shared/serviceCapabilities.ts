import type { Service } from "./Service.js";
import { ServiceSource } from "./types.js";

export function isContainerService(service: Service): boolean {
  return service.source === ServiceSource.DOCKER || service.source === ServiceSource.KUBERNETES;
}

export function supportsContainerStartStop(service: Service): boolean {
  return service.source === ServiceSource.DOCKER;
}
