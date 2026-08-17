---
title: Health and resource monitoring
description: Understand service status checks, history, container metrics, and resource alerts.
---

DockDash monitors whether services are available and, for containers, how many resources they consume. Current readings and historical samples appear together in the service drawer.

## Service status

The health check depends on where a service came from:

- **Docker:** the container is up when Docker reports it as running, down when it has stopped or exited, and unknown when its host cannot be reached.
- **Kubernetes:** the container is up when Kubernetes reports it as ready, down when it has terminated, and otherwise unknown.
- **Network or manual:** DockDash probes the service's check port. HTTP and HTTPS services accept any response below `500`; if the HTTP request fails, DockDash falls back to a TCP connection. Other protocols use a TCP connection check.

`HEALTH_CHECK_INTERVAL` controls the polling interval. Status transitions can produce down and recovery notifications when [Apprise](https://github.com/caronc/apprise-api) is configured.

## Health history

Each completed check is stored in SQLite and summarized as uptime history for the last 1, 7, or 30 days. `HEALTH_HISTORY_TTL_DAYS` controls retention, and `DISABLE_HEALTH_HISTORY` stops recording history when you do not need it.

## Container resources

For Docker and Kubernetes services, DockDash samples CPU and memory usage. Docker also reports network and disk I/O. Historical CPU and memory samples make short spikes visible after the current reading has changed.

Kubernetes resource readings require the cluster metrics API. Memory percentage also requires a memory limit on the container; without a limit, DockDash can show usage but cannot calculate a meaningful percentage.

Resource history uses the same `HEALTH_HISTORY_TTL_DAYS` retention period as health history.

## Threshold notifications

Optional CPU and memory thresholds send warning and recovery notifications. CPU must remain above its threshold for `SPIKE_DURATION_THRESHOLD` seconds; memory alerts as soon as it crosses its threshold.

See [Notifications](../../configuration/notifications/) and the [configuration reference](../../configuration/#discovery-and-monitoring) for the related settings.
