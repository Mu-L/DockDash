---
title: Dashboard and topology
description: Organize services on the DockDash canvas and model how they relate.
---

DockDash provides two views of the same service inventory: a searchable services table and a freeform dashboard canvas. Editing a service in either view updates the same stored record.

## Choose what appears

Discovery does not force every imported service onto the canvas. Add the services that matter to the dashboard and keep the rest available in the services table for searching, filtering, and comparison.

Each dashboard node shows live status and update availability. Selecting a node opens the service drawer for history, metadata, logs, files, terminal access, and container controls when those capabilities are available.

## Arrange the canvas

Drag nodes to match the way you think about the environment. Positions are stored by DockDash, so the layout is shared rather than tied to one browser.

The canvas supports:

- Snap-to-grid placement
- Zooming, panning, and fitting all content into view
- Resizable groups created by nesting services inside another node
- A summary of services with available updates

## Draw relationships

Connect services to document communication, dependency, or another relationship. Links can be labeled and edited independently of the services they join.

Links are descriptive: they help explain the topology but do not change routing, startup order, or health-check behavior.
