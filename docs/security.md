---
title: Security
description: Understand DockDash's trust boundaries and harden a production deployment.
---

DockDash can execute commands, read and modify container files, and control workloads. Treat access to the dashboard as privileged access to the Docker host or Kubernetes cluster.

:::danger[Do not expose an unauthenticated instance]
Keep DockDash on a trusted network until built-in OIDC or an authenticated reverse proxy is configured and verified.
:::

## Protect access

- Configure [OIDC or an authenticated reverse proxy](../configuration/authentication/).
- Prevent clients from bypassing the reverse proxy and reaching DockDash directly.
- Use TLS for browser access and for remote Docker endpoints.
- Store `SESSION_SECRET`, `GITHUB_TOKEN`, OIDC secrets, [Apprise](https://github.com/caronc/apprise-api) URLs, and [CertVault](https://github.com/dougmaitelli/CertVault) API keys outside source control.
- Back up the SQLite database before upgrades.

## Docker daemon access

Mounting `/var/run/docker.sock` normally provides root-equivalent control over the host.

Place [`tecnativa/docker-socket-proxy`](https://github.com/Tecnativa/docker-socket-proxy) between DockDash and the Docker daemon, then point `DOCKER_HOSTS` at the proxy. Enable only the Docker API operations required by the DockDash features you use.

An unauthenticated Docker TCP endpoint is equally sensitive. Do not publish one to an untrusted network.

### Restricted socket proxy example

```yaml
services:
  docker-proxy:
    image: tecnativa/docker-socket-proxy
    restart: unless-stopped
    environment:
      CONTAINERS: 1
      IMAGES: 1
      NETWORKS: 1
      INFO: 1
      POST: 1
      EXEC: 1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  dockdash:
    image: ghcr.io/dougmaitelli/dockdash:v1.0.0
    environment:
      DOCKER_HOSTS: tcp://docker-proxy:2375
    depends_on:
      - docker-proxy
```

`POST` and `EXEC` are needed for container controls, terminal sessions, and file operations. Leave them disabled when those features are turned off.

## Kubernetes permissions

Grant the service account only the namespaces and verbs required by your enabled features. In particular, remove `pods/exec` when terminal access is disabled and `pods/delete` when pod recreation is not needed. See [Kubernetes integration](../concepts/kubernetes-integration/#rbac-requirements) for the complete permission map.

## Reduce enabled capabilities

Disable privileged or storage-intensive features that your deployment does not need:

```properties
DISABLE_CONTAINER_CONTROLS=true
DISABLE_TERMINAL=true
DISABLE_FILE_EXPLORER=true
DISABLE_RESOURCE_MONITOR=true
DISABLE_HEALTH_HISTORY=true
```

These restrictions are enforced by the server; they are not only hidden in the interface.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability. Use [GitHub private vulnerability reporting](https://github.com/dougmaitelli/DockDash/security/advisories/new) with affected versions, impact, reproduction steps, and any suggested mitigation.

The latest release and `master` receive security fixes. Older releases do not have guaranteed backports.
