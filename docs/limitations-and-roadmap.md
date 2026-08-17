---
title: Limitations and roadmap
description: Review current DockDash limitations and the improvements planned to address them.
---

This page documents known product limitations and the improvements planned to address them.

:::note
Roadmap items describe the intended direction of the project, not a committed release date or order of delivery.
:::

## Kubernetes network and disk monitoring

### Current limitation

DockDash currently reads CPU and memory usage for Kubernetes containers through the Kubernetes Metrics API. It does not collect Kubernetes network receive and transmit totals or disk read and write activity. Those resource readings are currently available only for Docker containers.

### Roadmap

Add network and disk monitoring for Kubernetes workloads, including:

- Network receive and transmit activity
- Disk read and write activity
- Resource history consistent with the existing Docker monitoring experience

The implementation will need a Kubernetes metrics source that provides these values and a documented set of permissions for accessing it.
