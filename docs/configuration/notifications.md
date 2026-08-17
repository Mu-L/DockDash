---
title: Notifications
description: Send DockDash health, update, and resource alerts through Apprise.
---

DockDash uses the [Apprise REST API](https://github.com/caronc/apprise-api) to deliver notifications to Slack, Discord, Telegram, email, and many other services.

Notifications can be emitted when:

- A service goes down or recovers
- A container image update becomes available
- CPU or memory remains above a configured threshold
- A resource spike clears

## Configure the endpoint

| Variable       | Default | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| `APPRISE_URL`  | unset   | [Apprise](https://github.com/caronc/apprise-api) REST notification endpoint               |
| `APPRISE_TAGS` | unset   | Comma-separated [Apprise](https://github.com/caronc/apprise-api) routing tags             |
| `APPRISE_URLS` | unset   | Comma-separated inline [Apprise](https://github.com/caronc/apprise-api) notification URLs |

Set the complete [Apprise](https://github.com/caronc/apprise-api) notify endpoint:

```properties
APPRISE_URL=http://apprise:8000/notify/apprise
```

In [Apprise's](https://github.com/caronc/apprise-api) stateful mode, the final path segment is the configuration key.

Use tags to select matching endpoints from the [Apprise](https://github.com/caronc/apprise-api) configuration:

```properties
APPRISE_TAGS=admin,homelab
```

Additional inline targets can be supplied with `APPRISE_URLS`:

```properties
APPRISE_URLS=discord://webhook_id/webhook_token
```

All three settings can be combined.

:::caution
Notification URLs commonly contain credentials. Store them in deployment secrets and never include them in issues, screenshots, logs, or commits.
:::

## Resource thresholds

| Variable                    | Default | Description                                                          |
| --------------------------- | ------- | -------------------------------------------------------------------- |
| `CPU_SPIKE_THRESHOLD`       | `90`    | CPU percentage that triggers an alert; `0` disables it               |
| `MEMORY_SPIKE_THRESHOLD`    | `90`    | Memory percentage that triggers an alert; `0` disables it            |
| `SPIKE_DURATION_THRESHOLD`  | `300`   | Seconds a spike must persist before alerting; `0` alerts immediately |

Set percentage thresholds and the duration they must persist:

```properties
CPU_SPIKE_THRESHOLD=90
MEMORY_SPIKE_THRESHOLD=90
SPIKE_DURATION_THRESHOLD=300
```

A threshold of `0` disables that resource alert. A duration of `0` alerts immediately.

After saving the settings, use **Send Test** in DockDash to verify the complete delivery path.
