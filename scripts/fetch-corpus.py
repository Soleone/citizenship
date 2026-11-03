#!/usr/bin/env python3
"""Refresh data/corpus from canada.ca.

Captures the <main> region of every page the curriculum cites and writes it as
plain text, one file per page. `npm run curriculum:check` compares every
`evidence` string in the curriculum against these files, so re-running this is
how the study content is re-anchored to the live guide.

Usage: python3 scripts/fetch-corpus.py
"""

import re
import sys
import unicodedata
import urllib.request
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "corpus"

GUIDE = "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online"
SERVICES = "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship"

PAGES = {
    # Discover Canada, one page per chapter.
    **{
        slug: f"{GUIDE}/{slug}.html"
        for slug in [
            "notice",
            "oath-citizenship",
            "message-readers",
            "applying-citizenship",
            "rights-resonsibilities-citizenship",
            "who-are-canadians",
            "canadas-history",
            "modern-canada",
            "how-canadians-govern-themselves",
            "federal-elections",
            "justice-system",
            "canadian-symbols",
            "canadas-economy",
            "canadas-regions",
            "study-questions",
            "more-information",
            "authorities",
            "memorable-quotes",
        ]
    },
    # IRCC process pages.
    "irc-test__how-it-works": f"{SERVICES}/test/how-it-works.html",
    "irc-test__study": f"{SERVICES}/test/study.html",
    "irc-test__invitation": f"{SERVICES}/test/invitation.html",
    "irc-test__online": f"{SERVICES}/test/online.html",
    "irc-test__results": f"{SERVICES}/test/results.html",
    "irc-adult__who": f"{SERVICES}/adult-minor/who.html",
    "irc-adult__how": f"{SERVICES}/adult-minor/how.html",
}

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "tr", "dt", "dd", "div", "br", "td", "th", "summary", "figcaption", "caption"}
HEADINGS = {"h1": "# ", "h2": "## ", "h3": "### ", "h4": "#### ", "h5": "##### ", "h6": "###### "}
SKIP = {"script", "style", "noscript", "svg", "head", "nav", "footer", "form", "template", "iframe"}
NOISE = re.compile(
    r"^(Skip to (main content|About this site)|Government of Canada navigation bar|Website feedback"
    r"|Date modified|Topics on this website|Provenance of this webpage|About Canada\.ca|Contact us"
    r"|Departments and agencies|Listen to this chapter|Download this chapter.*|You can also download all of Discover Canada.*"
    r"|The audio may take a moment to load\.|- \d+.*|\(current\)|Previous|Next|\[ *See larger version *\]|\[See larger version *\])$"
)


class MainExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.state = 0  # 0 outside main, 1 inside, 2 done
        self.skip = 0
        self.lines: list[str] = []
        self.buf: list[str] = []

    def flush(self):
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        self.buf = []
        if text:
            self.lines.append(text)

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "main" and "mainContentOfPage" in attributes.get("property", ""):
            self.state = 1
        if self.state != 1:
            return
        if tag in SKIP:
            self.skip += 1
        if tag in BLOCK:
            self.flush()
            if tag in HEADINGS:
                self.buf.append(HEADINGS[tag])
            elif tag == "li":
                self.buf.append("- ")
        if tag == "main":
            self.state = 2

    def handle_endtag(self, tag):
        if self.state not in (1, 2):
            return
        if tag in SKIP and self.skip:
            self.skip -= 1
        if tag in BLOCK:
            self.flush()
        if tag == "main":
            self.state = 3

    def handle_data(self, data):
        if self.state in (1, 2) and not self.skip:
            self.buf.append(data)


def to_text(raw: str) -> str:
    parser = MainExtractor()
    parser.feed(raw)
    parser.flush()
    out = []
    for line in parser.lines:
        line = unescape(line)
        line = unicodedata.normalize("NFKC", line)
        line = (
            line.replace("\u2019", "'")
            .replace("\u2018", "'")
            .replace("\u201c", '"')
            .replace("\u201d", '"')
            .replace("\u2014", " - ")
            .replace("\u2013", "-")
        )
        line = re.sub(r"\s+", " ", line).strip()
        if line and not NOISE.match(line):
            out.append(line)
    return "\n".join(out) + "\n"


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (curriculum corpus refresh)"})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8", errors="replace")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, url in PAGES.items():
        try:
            text = to_text(fetch(url))
        except Exception as error:  # noqa: BLE001 - report and keep going
            print(f"FAIL {name}: {error}", file=sys.stderr)
            continue
        if len(text) < 200:
            print(f"WARN {name}: only {len(text)} bytes captured, file left untouched", file=sys.stderr)
            continue
        (OUT / f"{name}.txt").write_text(text, encoding="utf-8")
        print(f"ok   {name} ({len(text)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
