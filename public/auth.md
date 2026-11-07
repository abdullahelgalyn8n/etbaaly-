# auth.md

You are an agent. This service (إطبعلي | Etbaaly) supports **agentic registration and authentication** per the Auth.md standard, OAuth 2.0 (RFC 8414), and OAuth Protected Resource Metadata (RFC 9728). Follow the steps below in order to authenticate and interact with Etbaaly APIs.

## Service Overview

- **Service Name**: إطبعلي | Etbaaly (A.Z Agency)
- **Resource Identifier**: `https://etbaaly.azagency.online`
- **Protected Resource Metadata (RFC 9728)**: `https://etbaaly.azagency.online/.well-known/oauth-protected-resource`
- **OAuth Authorization Server (RFC 8414)**: `https://etbaaly.azagency.online/.well-known/oauth-authorization-server`
- **OpenID Connect Discovery**: `https://etbaaly.azagency.online/.well-known/openid-configuration`
- **API Catalog (RFC 9727)**: `https://etbaaly.azagency.online/.well-known/api-catalog`
- **Documentation**: `https://etbaaly.azagency.online/llms.txt`
- **OpenAPI Specification**: `https://etbaaly.azagency.online/openapi.json`

---

## Step 1: Discover

Discovery follows standard OAuth 2.0 and Auth.md protocol:

1. **Protected Resource Metadata (PRM)**:
   ```http
   GET /.well-known/oauth-protected-resource HTTP/1.1
   Host: etbaaly.azagency.online
   Accept: application/json
   ```
   Provides the `resource` URL (`https://etbaaly.azagency.online`) and list of `authorization_servers`.

2. **Authorization Server Metadata**:
   ```http
   GET /.well-known/oauth-authorization-server HTTP/1.1
   Host: etbaaly.azagency.online
   Accept: application/json
   ```
   Contains the `token_endpoint`, `revocation_endpoint`, and the `agent_auth` block.

---

## Step 2: Register & Acquire Credentials

### Flow 1: Identity Assertion (ID-JAG)
If your agent provider supports minting Identity Assertions (ID-JAG):
1. Obtain an ID-JAG token with `aud: https://etbaaly.azagency.online`.
2. Exchange the assertion at the token endpoint:
   ```http
   POST /api/auth/token HTTP/1.1
   Host: etbaaly.azagency.online
   Content-Type: application/x-www-form-urlencoded

   grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<YOUR_ID_JAG_TOKEN>&scope=api:read
   ```

### Flow 2: Verified Email Claim
If authenticating via a verified user email:
1. Provide the assertion at `/api/auth/token` with `assertion_type=verified_email`.
2. Complete the claim ceremony if required at `https://etbaaly.azagency.online/login`.

### Flow 3: Client Credentials (Direct M2M)
For automated agent integrations:
```http
POST /api/auth/token HTTP/1.1
Host: etbaaly.azagency.online
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>&scope=api:read
```

### Flow 4: Anonymous / Guest Agent Access
For public pricing, catalog browsing, and quote inquiries:
```http
POST /api/auth/token HTTP/1.1
Host: etbaaly.azagency.online
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=api:read
```

---

## Step 3: Call Protected APIs

Send the access token in the `Authorization` header:

```http
GET /api/products HTTP/1.1
Host: etbaaly.azagency.online
Authorization: Bearer <access_token>
Accept: application/json
```

---

## Step 4: Token Revocation

When closing an agent session:

```http
POST /api/auth/logout HTTP/1.1
Host: etbaaly.azagency.online
Authorization: Bearer <access_token>
```
