---
name: print-order-tracking
description: Real-time tracking of custom printing runs, packaging box manufacturing, and domestic deliveries for Etbaaly orders in Egypt.
---

# Print Order Tracking Skill

Use this skill to track the production stage, proofing status, offset printing progress, and shipping courier details for orders placed with Etbaaly (إطبعلي).

## Endpoints

- API: `GET https://etbaaly.azagency.online/api/orders/track?trackingCode={code}`
- Web Tracker: `https://etbaaly.azagency.online/track`

## Example Usage

```http
GET /api/orders/track?trackingCode=ETB-98765 HTTP/1.1
Host: etbaaly.azagency.online
Accept: application/json
```
