---
title: Kubernetes integration
description: Connect DockDash to Kubernetes for discovery, metrics, logs, exec, and pod recreation.
---

DockDash integrates with Kubernetes to discover and operate regular pod containers. DockDash can run inside the cluster and use its service account, or run elsewhere with access through a mounted kubeconfig.

## Enable the integration

```properties
KUBERNETES_ENABLED=true
KUBERNETES_NAMESPACES=default,homelab
```

When DockDash runs outside the cluster, mount a kubeconfig and set:

```properties
KUBERNETES_KUBECONFIG=/config/kubeconfig
KUBERNETES_CONTEXTS=homelab
```

If `KUBERNETES_CONTEXTS` is omitted, DockDash uses the kubeconfig's current context.

## RBAC requirements

The DockDash service account can be limited to these capabilities:

| Resource              | Required verbs         | Used for             |
| --------------------- | ---------------------- | -------------------- |
| `pods`                | `get`, `list`, `watch` | Discovery and status |
| `pods`                | `delete`               | Pod recreation       |
| `pods/log`            | `get`                  | Container logs       |
| `pods/exec`           | `create`               | Terminal sessions    |
| `pods.metrics.k8s.io` | `get`, `list`          | Resource metrics     |

[Download the example RBAC manifest](https://raw.githubusercontent.com/dougmaitelli/DockDash/master/docs/kubernetes-rbac.yaml).

Remove `delete` if pod recreation is disabled. Remove `pods/exec` access if terminal sessions are disabled.

## Supported operations

DockDash supports discovery, logs, exec, metrics, and pod recreation. Kubernetes start and stop operations are intentionally unsupported because those actions belong at the workload-controller level rather than the individual container level.

Init containers and DockDash-created terminal pods are excluded from normal discovery.

See the [configuration reference](../../configuration/#kubernetes) for every Kubernetes setting.
