---
title: Getting started
description: Run DockDash with Docker Compose and open your first dashboard.
---

Docker Compose is the fastest way to run DockDash. This setup stores the SQLite database in a named volume and connects DockDash to the local Docker daemon.

## Create the environment file

Use the repository's [`.env.example`](https://github.com/dougmaitelli/DockDash/blob/master/.env.example) as your starting point. Save a copy as `.env` beside your Compose file.

You can download it directly:

```bash
curl -fsSL https://raw.githubusercontent.com/dougmaitelli/DockDash/master/.env.example -o .env
```

The defaults are enough for a local Docker installation. Review `.env` before starting DockDash and keep it out of source control when you add tokens, notification URLs, or authentication secrets.

## Create the Compose file

Create `compose.yaml`:

```yaml
services:
  dockdash:
    image: ghcr.io/dougmaitelli/dockdash:v1.0.0
    container_name: dockdash
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "127.0.0.1:${PORT:-3001}:${PORT:-3001}"
    environment:
      DB_PATH: /app/data/dockdash.db
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - dockdash-data:/app/data

volumes:
  dockdash-data:
```

Binding to `127.0.0.1` keeps DockDash local while you configure authentication. Change the binding only after completing the Protect access step below.

The example pins DockDash to `v1.0.0` for predictable deployments. Change the tag deliberately when upgrading, and back up the SQLite data volume before releases that include database migrations.

:::caution[Limit Docker socket access]
This quick-start mounts the Docker socket directly. For a more restricted setup, use [tecnativa/docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy) and follow the [restricted socket proxy example](../security/#restricted-socket-proxy-example).
:::

## Start DockDash

```bash
docker compose up -d
```

Open `http://localhost:3001`.

## Confirm discovery

DockDash uses the mounted Docker socket when `DOCKER_HOSTS` is not set. After the first scan, locally running containers should appear in the service inventory.

If a service does not appear:

1. Confirm that the Docker socket is mounted at `/var/run/docker.sock`.
2. Check the container logs with `docker compose logs dockdash`.
3. Verify that the container is visible with `docker ps` on the host.

## Protect access

:::caution
Docker socket access, container terminals, and file operations are privileged capabilities. Before making DockDash reachable from another network, complete the [Protect access checklist](../security/#protect-access).
:::

## Next steps

- Review the [security checklist](../security/) before exposing DockDash to an untrusted network.
- Connect to [remote Docker hosts](../configuration/#remote-docker-hosts).
- Connect to [Kubernetes](../concepts/kubernetes-integration/).
- Learn how [version-aware update monitoring](../concepts/update-monitoring/) works.
- Configure [notifications](../configuration/notifications/) through [Apprise](https://github.com/caronc/apprise-api).
