import { Service, ServiceSource } from "@shared";

import { kubernetesRuntime } from "../kubernetesRuntime.js";
import { dockerRuntime } from "./dockerRuntime.js";
import type { ContainerRuntime } from "./types.js";

class ContainerRuntimeService {
  private readonly runtimes = new Map<ServiceSource, ContainerRuntime>([
    [ServiceSource.DOCKER, dockerRuntime],
    [ServiceSource.KUBERNETES, kubernetesRuntime],
  ]);

  isContainer(service: Service): boolean {
    return this.runtimes.has(service.source);
  }

  getRuntime(service: Service): ContainerRuntime {
    const runtime = this.runtimes.get(service.source);

    if (!runtime) throw new Error("Not a container service");

    return runtime;
  }
}

export const containerRuntimeService = new ContainerRuntimeService();
