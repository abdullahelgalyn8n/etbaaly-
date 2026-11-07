---
name: packaging-quote-calculator
description: Request quotes and submit custom packaging specifications (rigid boxes, corrugated cartons, duplex boxes, paper bags).
---

# Packaging Quote Calculator Skill

Use this skill to request manufacturing estimates, paper weight recommendations (GSM), and die-cut specifications for custom packaging in Egypt & MENA.

## Endpoints

- API: `POST https://etbaaly.azagency.online/api/quotes`
- Web Form: `https://etbaaly.azagency.online/configurator`

## Example Request

```json
{
  "name": "Procurement Agent",
  "phone": "01000000000",
  "serviceType": "packaging-boxes",
  "quantity": 1000,
  "specifications": "Duplex 350gsm with matte lamination and gold foil stamping"
}
```
