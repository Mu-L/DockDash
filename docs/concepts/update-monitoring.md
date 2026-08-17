---
title: Update monitoring
description: Understand how DockDash compares pinned image versions and floating image digests.
---

DockDash chooses an update strategy from the running image tag.

| Image tag                                          | Strategy                                                      |
| -------------------------------------------------- | ------------------------------------------------------------- |
| `1.25`, `v1.25.3`, `release-1.25.3-alpine`         | Compare numeric version components within the same tag family |
| `latest`, `stable`, `dev`, or another floating tag | Compare the running image digest with the registry digest     |

## Version-shaped tags

DockDash extracts numeric version components while preserving the tag's surrounding text. A service using `release-1.25.3-alpine` is compared with other `release-…-alpine` tags rather than unrelated image variants.

This makes pinned deployments the expected workflow: the running image remains reproducible while DockDash reports a concrete update such as `1.25 → 1.26`.

## Floating tags

Floating tags do not provide a meaningful version sequence. DockDash therefore compares the local image digest with the digest currently published by the registry. A change indicates that the tag now points to different content.

## Release notes

When an update is available, DockDash attempts to identify the source repository from:

1. OCI image metadata
2. GHCR image coordinates
3. Docker Hub image naming

It then requests the GitHub release matching the available version and displays its notes in the service drawer.

Set `GITHUB_TOKEN` when you use private GHCR images or need higher GitHub API rate limits. See the [configuration reference](../../configuration/#discovery-and-monitoring).

## Update cadence

`UPDATE_CHECK_INTERVAL` controls how frequently update checks run. The default is one hour (`3600000` milliseconds). Registry failures are isolated so a temporary outage does not stop health monitoring or the application server.
