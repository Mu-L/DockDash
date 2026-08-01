import { describe, expect, it } from "vitest";

import { isContainerService, Service, ServiceSource, supportsContainerStartStop } from "@shared";

function service(source: ServiceSource): Service {
  return Object.assign(new Service(), { source });
}

describe("service capabilities", () => {
  it("recognizes Docker and Kubernetes as container services", () => {
    expect(isContainerService(service(ServiceSource.DOCKER))).toBe(true);
    expect(isContainerService(service(ServiceSource.KUBERNETES))).toBe(true);
    expect(isContainerService(service(ServiceSource.NETWORK))).toBe(false);
  });

  it("limits start and stop controls to Docker", () => {
    expect(supportsContainerStartStop(service(ServiceSource.DOCKER))).toBe(true);
    expect(supportsContainerStartStop(service(ServiceSource.KUBERNETES))).toBe(false);
  });
});
