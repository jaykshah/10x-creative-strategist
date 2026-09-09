# Creative OS tools in Cursor

One OAuth MCP connection gives this plugin access to every user-facing tool advertised by Creative OS. Do not restrict discovery to a skill's suggested tools. `catalog.json` at the plugin root records build-time schemas for provider and workflow tools; MCP `tools/list` is authoritative at execution time. `creative_os_list_capabilities` lists current provider schemas, active hosted workflows and the additional project workflow tools.

This release requires the accompanying MCP server changes for the new workflow and direct media tools. A plugin install alone cannot update a hosted server. If a tool is absent, name that deployment/configuration gap. Do not invent it or request a provider key from the user.

## Account and marketing brain

| Tool | Purpose |
| --- | --- |
| `creative_os_list_projects` | Find the user's projects and default |
| `creative_os_create_project` | Create a requested client/project boundary |
| `creative_os_list_capabilities` | Discover configured provider and workflow capabilities |
| `creative_os_balance` | Inspect the account's carrot balance |
| `creative_os_recharge` | Create a Stripe checkout link; the user completes payment |
| `creative_os_list_knowledge_files` | List selected-project knowledge |
| `creative_os_read_knowledge_file` | Read a relevant knowledge document |
| `creative_os_capture_knowledge` | Save a complete merged document when authorized |

## Research and media collection

All of these use the existing provider adapters, validation and metered execution service. Read current schemas for bounded inputs and platform-specific limits.

| Tool | Purpose |
| --- | --- |
| `creative_os_google_search` | Search for source evidence |
| `creative_os_web_scrape_page` | Extract website content |
| `creative_os_meta_ad_library` | Collect a bounded public Meta ad inventory |
| `creative_os_instagram_profile` | Inspect public Instagram profile information |
| `creative_os_instagram_reels` | Collect public reel evidence |
| `creative_os_instagram_hashtag` | Collect reels with text/structured output and an optional MCP gallery |
| `creative_os_instagram_hashtag_direct` | Use the full hashtag schema, including posts, reels or stories |
| `creative_os_tiktok_scraper` | Collect public TikTok evidence |
| `creative_os_youtube_scraper` | Collect YouTube evidence |
| `creative_os_instagram_reels_download` | Retrieve original reel media when available |
| `creative_os_youtube_video_download` | Retrieve YouTube media when available |
| `creative_os_facebook_video_download` | Retrieve Facebook media when available |

Keep source URLs, capture dates, observed counts, sample restrictions and actual media-review coverage. Downloads are not semantic review. Public frequency, longevity and engagement are not verified performance. Preserve returned run IDs and stable saved-video URLs; failed archival does not justify repeating a paid scrape.

## Specialist work

| Tool | Purpose |
| --- | --- |
| `creative_os_load_local_specialist` | Load existing specialist domain guidance for inline work; no cloud dispatch |
| `creative_os_publish_specialist_plan` | Return a visible plan with reusable task IDs; no dispatch or durable plan storage |
| `creative_os_create_specialist_run` | Start a bounded job using an actually deployed worker |
| `creative_os_get_specialist_run` | Read the existing job's status and submitted answer |
| `creative_os_get_specialist_artifact` | List or retrieve saved job artifacts |

The create tool's current schema/description lists deployed workers and allowed tools. User-facing MCP names add the `creative_os_` prefix to the web coordinator's names. Budgets are US cents. Cloud execution and provider execution have separate ceilings; normal carrot billing still applies. Reuse a task ID when checking or reconciling an identical dispatch. Never retry uncertain paid work blindly.

Cursor does not automatically render the web application's plan/job cards or subscribe to their events. Display plans as ordinary text and read saved results explicitly. A running task remains pending. Worker-only submission/checkpoint callbacks stay in the scoped worker gateway; they are not user-account tools and do not grant the plugin arbitrary database access.

## Images, animation and uploads

| Tool | Purpose |
| --- | --- |
| `creative_os_list_assets` | Find existing stable project asset URLs and IDs |
| `creative_os_generate_image` | Launch the optional interactive studio; the card starts generation |
| `creative_os_run_image_generation` | Execute one requested image/revision and register a stable project asset |
| `creative_os_generate_image_direct` | Execute the full provider image schema: model controls, multiple outputs and ordered references |
| `creative_os_animate_image` | Execute the full Seedance image-to-video schema |
| `creative_os_upload_asset` | Launch the optional file-selection/upload card |
| `creative_os_create_asset_upload` | Create a short-lived direct upload URL for actual user-selected bytes |
| `creative_os_complete_asset_upload` | Verify the completed upload and publish a stable public asset |

Image backends include the configured GPT Image and Nano Banana model variants; animation uses configured Seedance variants. Discover current models instead of assuming every backend is connected. A model-visible direct execution path lets Cursor operate without interactive cards. Choose one execution path per requested generation to avoid duplicate billing.

`generate_image_direct` and `animate_image` return provider results stored through the normal service; their signed URLs can expire. The studio execution path registers a stable project image asset. Never describe a raw signed result as a permanent asset URL. Uploads create public links and require actual binary transfer before completion. Don't call create/complete tools for files the host cannot read, and don't send a Creative OS OAuth bearer token to the signed storage URL.

## Saved ad concepts and production

| Tool | Purpose |
| --- | --- |
| `creative_os_request_image_concept_count` | Return a brief for asking the missing count in chat; no picker in Cursor |
| `creative_os_get_image_ad_context` | Read saved concepts, available image models and reference assets |
| `creative_os_propose_image_ads` | Save concepts or import a completed image-creative job, without generation |
| `creative_os_get_image_ad` | Read exact prompts, revisions, references and production results |
| `creative_os_edit_image_ad` | Edit a draft at its current revision |
| `creative_os_approve_image_ad` | Queue authorized generation of that reviewed revision |
| `creative_os_retry_image_ad` | Retry a failed/uncertain revision when explicitly requested and reconciled |
| `creative_os_animate_image_ad` | Queue authorized animation from the concept and selected project image |

If concept count is missing, ask it in chat; the count tool alone does not collect an answer. Saving a concept does not show a web approval card in Cursor: read the saved item and show its actual prompt/references for review. Respect authorization already given to the concrete version. Approval queues work; completion requires the server's production worker and a final result from `get_image_ad`. Never claim a queued job is an image or video.

## Active skills and the full toolset

Only the active `build-advertiser-intelligence` source skill is packaged, plus the 10X strategy entry point. Disabled skills are excluded during sync and removed from the generated package if their status changes. See [the generated catalog](catalog.md) for the included source workflow and hosted slug.

Local instruction loading is not a billed hosted workflow retrieval. Only call a hosted workflow if MCP advertises it. The active advertiser workflow's slug is `client_onboarding`, not `build_advertiser_intelligence`. Filtering skills does not restrict tool availability: all server-advertised user-facing tools remain available to support the user's requested work.

No ad-platform campaign publishing API, live media buying or unconfigured analytics integration is bundled. Strategy claims must use actual supplied evidence and measured data, not predicted ROAS.
