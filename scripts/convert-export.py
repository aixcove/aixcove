#!/usr/bin/env python3
"""Convert aixcove-export WP JSON into Astro content collections."""
import json, os, re, sys
import yaml

HERE = os.path.dirname(os.path.abspath(__file__))
EXPORT = os.path.abspath(os.path.join(HERE, "../../aixcove-export/json"))
SITE = os.path.dirname(HERE)

def load(name):
    return json.load(open(os.path.join(EXPORT, name + ".json")))

media = {m["id"]: m for m in load("media")}
posts = load("posts")
listings = load("hp_listing")
pages = load("pages")
bcats = {c["id"]: c for c in load("categories")}
lcats = {c["id"]: c for c in load("hp_listing_category")}

DOMAINS = ["https://aixcove.com", "http://aixcove.com",
           "https://ai.andou.eu.org", "http://ai.andou.eu.org"]

def clean_html(html):
    if not html:
        return ""
    for d in DOMAINS:
        html = html.replace(d, "")
    return html

def strip_tags(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()

def media_url(mid):
    m = media.get(mid)
    if not m:
        return None
    src = (m.get("source_url") or "").split("?")[0]
    if "/wp-content/uploads/" in src:
        return "/wp-content/uploads/" + src.split("/wp-content/uploads/", 1)[1]
    return src

def fm_dump(meta):
    return yaml.safe_dump(meta, allow_unicode=True, sort_keys=False, width=1000)

# ---- posts ----
os.makedirs(f"{SITE}/src/content/posts", exist_ok=True)
n = 0
for p in posts:
    slug = p["slug"]
    meta = {
        "title": re.sub(r"<[^>]+>", "", p["title"]["rendered"]),
        "date": p["date_gmt"] or p["date"],
        "modified": p["modified_gmt"] or p["date_gmt"],
        "slug": slug,
        "description": strip_tags(p.get("excerpt", {}).get("rendered", ""))[:200],
        "categories": [bcats[c]["slug"] for c in p.get("categories", []) if c in bcats],
        "featured": media_url(p.get("featured_media")) or "",
        "wpId": p["id"],
    }
    body = clean_html(p["content"]["rendered"])
    with open(f"{SITE}/src/content/posts/{slug}.md", "w") as f:
        f.write("---\n" + fm_dump(meta) + "---\n\n" + body + "\n")
    n += 1
print(f"posts: {n}")

# ---- listings ----
os.makedirs(f"{SITE}/src/content/listings", exist_ok=True)
n = 0
for l in listings:
    slug = l["slug"]
    cat_ids = l.get("hp_listing_category_ids") or []
    meta = {
        "title": re.sub(r"<[^>]+>", "", l["title"]["rendered"]),
        "date": l["date_gmt"] or l["date"],
        "modified": l["modified_gmt"] or l["date_gmt"],
        "slug": slug,
        "description": strip_tags(l.get("excerpt", {}).get("rendered", ""))[:200] or strip_tags(l["content"]["rendered"])[:200],
        "categories": [lcats[c]["slug"] for c in cat_ids if c in lcats],
        "featured": media_url(l.get("featured_media")) or "",
        "wpId": l["id"],
    }
    body = clean_html(l["content"]["rendered"])
    with open(f"{SITE}/src/content/listings/{slug}.md", "w") as f:
        f.write("---\n" + fm_dump(meta) + "---\n\n" + body + "\n")
    n += 1
print(f"listings: {n}")

# ---- wp pages (contact, privacy, terms...) ----
os.makedirs(f"{SITE}/src/content/pages", exist_ok=True)
skip = {"blog", "listings", ""}  # rebuilt as custom pages
n = 0
for p in pages:
    slug = p["slug"]
    if slug in skip:
        continue
    meta = {
        "title": re.sub(r"<[^>]+>", "", p["title"]["rendered"]),
        "date": p["date_gmt"] or p["date"],
        "slug": slug,
        "wpId": p["id"],
    }
    with open(f"{SITE}/src/content/pages/{slug}.md", "w") as f:
        f.write("---\n" + fm_dump(meta) + "---\n\n" + clean_html(p["content"]["rendered"]) + "\n")
    n += 1
print(f"pages: {n}")

# ---- categories as data files ----
os.makedirs(f"{SITE}/src/content/categories", exist_ok=True)
os.makedirs(f"{SITE}/src/content/listing-categories", exist_ok=True)
for c in bcats.values():
    with open(f"{SITE}/src/content/categories/{c['slug']}.json", "w") as f:
        json.dump({"id": c["id"], "name": c["name"], "slug": c["slug"],
                   "count": c.get("count", 0), "parent": c.get("parent", 0)}, f, ensure_ascii=False, indent=1)
for c in lcats.values():
    with open(f"{SITE}/src/content/listing-categories/{c['slug']}.json", "w") as f:
        json.dump({"id": c["id"], "name": c["name"], "slug": c["slug"],
                   "count": c.get("count", 0), "parent": c.get("parent", 0)}, f, ensure_ascii=False, indent=1)
print(f"categories: {len(bcats)} blog, {len(lcats)} listing")
print("CONVERT_DONE")
