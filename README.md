# 10X Creative Strategist

A focused Cursor plugin for evidence-led creative strategy: understand an advertiser and its buyers, examine creative patterns, prioritize opportunities, and recommend the next test.

**2 skills · 3 commands · 2 rules · 1 OAuth MCP connection · 41 tool entries**

The plugin includes the active **Build Advertiser Intelligence** workflow and the **10X Creative Strategist** entry point. Disabled source skills are excluded. All user-facing tools advertised by Creative OS remain available to support the requested work.

## Install in Cursor

Clone this repository, then register the folder as a local plugin:

```sh
git clone https://github.com/jaykshah/10x-creative-strategist.git
cd 10x-creative-strategist
mkdir -p ~/.cursor/plugins/local
ln -s "$PWD" ~/.cursor/plugins/local/10x-creative-strategist
```

If that installation path already exists, inspect it before replacing it.

1. Restart Cursor or run **Developer: Reload Window**.
2. Open **Customize** and confirm the plugin and Creative OS MCP server appear.
3. Connect Creative OS and complete browser OAuth using your account.
4. Run `/10x-start`, or ask: “Use 10X Creative Strategist to list my projects, identify the default, and show the tools available to this account.”

Team policy may restrict local imports. A marketplace installation with the same plugin name may take precedence over a local copy. See [Cursor's local plugin instructions](https://cursor.com/docs/plugins).

## Commands

| Command | Outcome |
| --- | --- |
| `/10x-start` | Select the project, read relevant marketing knowledge and discover tools |
| `/10x-research` | Research the advertiser, buyers and creative evidence for a decision |
| `/10x-strategy` | Prioritize creative opportunities and recommend the next test |

Example requests:

> Research this advertiser using its official website and existing project knowledge. Explain its offer, buyer objections, and the most useful evidence gaps.

> Use the research we already have to recommend three creative opportunities. Connect each to a buying situation, message, proof, and test hypothesis.

The strategy workflow separates observed evidence, interpretation, creative hypotheses and measured results. Public ad longevity or engagement is not proof of ROAS. Tools for production remain available when the user requests production; a strategy task does not automatically trigger generation.

## Skills and tools

- [10X Creative Strategist](skills/10x-creative-strategist/SKILL.md): project context, evidence standards, creative decisions and tool routing.
- [Build Advertiser Intelligence](skills/build-advertiser-intelligence/SKILL.md): bounded research, evidence review and optional cloud specialists.
- [Tool reference](skills/10x-creative-strategist/references/tools.md): all 41 tool entries and execution guidance.
- [Skill catalog](skills/10x-creative-strategist/references/catalog.md): active source workflow and hosted slug.
- [Machine-readable catalog](catalog.json): build-time provider/workflow schemas and supporting tool names.

The toolset covers website/search research, Meta ads, Instagram, TikTok, YouTube, media downloads, marketing-brain knowledge, project assets, image/video generation, inline specialist guidance, optional cloud jobs and saved ad-concept production. It has no plugin-wide tool allowlist.

## Hosted service and availability

The plugin connects to `https://skill.10xproductivity.co/mcp`. Creative OS provides authentication, project isolation, provider execution, storage and billing. No API keys, database credentials or customer records are included here.

The hosted compatibility release was deployed on September 9, 2026, and a successful Cursor connection was confirmed after sign-in. Health, OAuth discovery, native/IPv6 callback registration and the hosted consent redirect also passed verification.

**The catalog is a build-time inventory, not a live-service guarantee.** New workflow tools, direct media execution and complete provider schemas require the corresponding Creative OS backend release. Installing this repository does not deploy that server. Use MCP discovery and `creative_os_list_capabilities` to verify the tools currently available to your account. Disabled providers and cloud workers are not enabled by installation.

Local skill loading does not incur a Creative OS workflow-retrieval charge. Research, generation, cloud jobs and hosted workflow calls may consume carrots. Cursor's model usage is separate, and the user completes any Stripe checkout themselves.

Interactive MCP cards are optional. Direct tools allow execution without them; the agent must read actual job/concept results instead of assuming web-chat cards or progress subscriptions exist. A queued task is not a completed asset. Public media uploads create links accessible to anyone who has them. Some raw provider result URLs expire. No ad-platform campaign publishing or live media-buying API is included.

## Repository structure

```text
.cursor-plugin/plugin.json
mcp.json
assets/logo.png
rules/
commands/
skills/
  10x-creative-strategist/
  build-advertiser-intelligence/
catalog.json
SOURCE-MAP.json
scripts/
  validate-plugin.mjs
  package-plugin.mjs
```

This is a standalone, single-plugin repository based on the [Cursor plugin template](https://github.com/cursor/plugin-template). Its manifest is at the repository root under `.cursor-plugin`, so no marketplace manifest is needed.

## Validate and package

Requires Node.js 24+. Packaging also requires the system `zip` utility. No dependency installation is needed.

```sh
npm run check
npm run package
```

The output is `dist/10x-creative-strategist-cursor-plugin.zip`, with the plugin manifest at the archive root. Extract it into a plugin folder for installation.

Validation checks the manifest, MCP connection, active-only skill catalog, names, component counts, portable paths, and Markdown links. It does not call paid tools or establish that a user has completed OAuth. See [the Cursor review notes](CURSOR-REVIEW.md) for an authenticated smoke test and release boundaries.

This repository is a standalone release snapshot. Maintain its plugin files here and rerun validation after edits. `SOURCE-MAP.json` records upstream provenance; its source paths and generator are build records, not runtime dependencies. Unused legacy worker-contract references and disabled skills are excluded from this public distribution.
