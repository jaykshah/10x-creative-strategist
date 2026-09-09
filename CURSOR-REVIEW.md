# Cursor team review

**Plugin:** 10X Creative Strategist 0.1.0

**Repository:** https://github.com/jaykshah/10x-creative-strategist

**Format:** Single Cursor plugin, `.cursor-plugin/plugin.json` at repository root

## Purpose and scope

Evidence-led creative strategy for advertisers: project context, research, buyer insight, creative opportunities and the next test. The package includes two skills, three commands, two contextual rules and one remote MCP declaration. Only the active advertiser-intelligence source skill is imported; disabled workflows are not bundled.

The 41-entry catalog describes user-facing tools that the plugin can use when deployed and configured. The hosted service is discovered at runtime. The package does not include the application backend, customer knowledge, account tokens, cloud-worker credentials or provider secrets.

## Try it

1. Follow the local installation instructions in the README and reload Cursor.
2. Confirm the two skills, three commands, two rules and Creative OS MCP connection are discovered.
3. Complete OAuth using a Creative OS account, then run `/10x-start`.
4. Verify project discovery and read-only capability discovery before authorizing paid work.
5. Use `/10x-research` for a bounded advertiser question, supplying an official website. Check source links and limitations.
6. Use `/10x-strategy` with the returned evidence. Check that recommendations distinguish observations from hypotheses.

Tool execution is project-scoped. Cloud specialists are optional and require deployment; their task IDs and saved results are read explicitly. Image/video tools are available for requested production, but strategy commands do not automatically generate media or change campaigns.

## Validation and release status

Run `npm run check` and `npm run package`. These commands require no API credentials and make no provider calls.

The companion backend work was tested in the Creative OS application, including tool discovery/schema coverage, project/scope checks, metered execution and exact-revision concept approval. This repository contains the plugin distribution only. Backend deployment and live Cursor OAuth/tool execution are separate from static package validation and have not been certified by this publication.

This public repository is shared for evaluation; publication is not a Cursor Marketplace listing or approval. No new open-source license has been assigned by this export. The author can select a distribution license before a marketplace submission if required.

## OAuth callback compatibility

If registration fails with `redirect_uris must contain HTTPS or loopback HTTP URLs`, the hosted server is running an older redirect validator. Creative OS must accept Cursor's exact native callback `cursor://anysphere.cursor-mcp/oauth/callback`, as well as supported localhost/IPv4/IPv6 loopback HTTP callbacks. The backend compatibility fix preserves registered-URI matching and S256 PKCE. No plugin URL or API-key workaround is required.
