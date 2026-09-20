# Assessment Notes

These architecture questions were part of the original full-stack assessment. They are preserved here separately from the product-facing README.

## Protecting third-party credentials

**Question:** A teammate suggests putting a third-party service's API key directly in the frontend code so the browser can call it. What is the problem, and where should the key live instead?

**Answer:** Frontend code and its network requests are visible to users, so embedding a private API key would expose it to anyone using the application. An attacker could call the provider directly, consume the quota, and create unexpected costs. The key should live in a secret environment variable available only to the backend. Local secret files must be ignored by Git and never committed.

## Controlling paid backend calls

**Question:** Once the key is moved off the frontend, anyone who can reach the backend can still trigger paid calls. What should be added so only the application's users can trigger them?

**Answer:** Keeping the provider key on the server protects the credential, but it does not authorize callers. The backend should authenticate the user, enforce authorization for the requested operation, and apply suitable rate limits. Usage monitoring and bounded request inputs provide additional cost and abuse controls.

## Configuring cross-origin requests

**Question:** The Vercel frontend calls a backend on another origin, and the browser blocks the request with a cross-origin error. What is most likely misconfigured, and where should it be fixed?

**Answer:** The backend's CORS policy most likely does not allow the deployed frontend origin. The permitted origin should be configured in the FastAPI CORS middleware. CORS is a response policy enforced by browsers, so changing unrelated Vercel settings would not correct a missing backend `Access-Control-Allow-Origin` response.
