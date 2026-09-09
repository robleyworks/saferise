# Record of Processing Activities — Article 30 GDPR

**Controller:** Kenor International B.V., Sint Maarten
**Trading as:** SafeRise Protocol · thesaferiseprotocol.com
**Contact:** contact@thesaferiseprotocol.com
**Version 1 · 9 September 2026 · internal document, not published**

⚠ **Retention periods in §4 are marked for decision (LG-78).** The register is
incomplete until they are set. Everything else is verified against live
configuration.

⚠ **An Article 27 EU representative is required before EU residents sign up.**
Not yet appointed. This register does not substitute for it.

---

## 1 · Processing activities

| # | Activity | Purpose | Lawful basis |
|---|---|---|---|
| 1 | Account creation and authentication | Provide access to the member area | Art. 6(1)(b) contract |
| 2 | Entitlement and subscription state | Determine what a member may open | Art. 6(1)(b) contract |
| 3 | Transactional email | Confirmation, password reset, service notices | Art. 6(1)(b) contract |
| 4 | Usage events | Understand which protocols are opened, in aggregate | Art. 6(1)(f) legitimate interests |
| 5 | Enquiry and application forms | Respond to 1:1, workshop, corporate and affiliate enquiries | Art. 6(1)(b) pre-contract |
| 6 | Site analytics | Understand traffic in aggregate | Art. 6(1)(f) legitimate interests |
| 7 | Marketing email | Send updates to people who asked for them | Art. 6(1)(a) consent |

**Not processed:** journal entries and personal records. These are written to the
member's own device and never transmitted. **They are not in this register
because they never reach us**, and that is a structural property of the product
rather than a policy.

⚠ **If that ever ceases to be true, Article 9 applies immediately** — journal
content may reveal health data — and this register, the privacy policy and the
corporate proposition all change together.

---

## 2 · Categories of data subject

Members · prospective members who submit a form · workshop and retreat attendees
· affiliate applicants · corporate contacts

**No children.** The service is for adults, 18 and over.

---

## 3 · Categories of personal data

| Category | Fields | Where |
|---|---|---|
| Identity | Email address | Supabase `auth.users` |
| Authentication | Password hash, session tokens | Supabase, managed |
| Account | Member ID, created date, entitlement, subscription status | Supabase `public.members` |
| Usage | Event type, protocol identifier (e.g. `t1-04`), timestamp | Supabase `public.usage_events` |
| Correspondence | Name, email, message body | Brevo, and the mailbox |
| Marketing | Email, consent state, engagement | Brevo |
| Technical | IP address, user agent — transiently, in logs | Netlify, Supabase |

**No special category data is processed.** No health data, no diagnosis, no
symptom record. The nearest thing — the journal — never leaves the device.

⚠ **`public.usage_events` holds identifiers only.** Its column comments restrict
`ref` to values like `t1-04` and exclude free text. **This restriction is a
control, not a convention.** If it holds free text, everything above changes.

---

## 4 · Retention

⚠ **All four are DECISIONS OUTSTANDING (LG-78).** Recommended defaults below.

| Data | Recommended | Rationale |
|---|---|---|
| Account data after closure | **30 days, then deleted** | Long enough to reverse an accidental closure |
| Usage events | **13 months** | Year-on-year comparison, then no reason to keep it |
| Correspondence | **24 months** | Covers a repeat enquiry and any dispute |
| Marketing list | **Until withdrawn, plus 30 days** | Consent-based; no reason to hold longer |
| Server logs | **30 days** | Security investigation window |
| Financial records | **7 years** | Statutory. Overrides everything above for the transaction record only |

**Backups follow §7 and may hold data slightly beyond these windows.** That is
disclosed in the privacy policy rather than hidden.

---

## 5 · Processors

| Processor | Role | Location | Transfer basis | Verified |
|---|---|---|---|---|
| **Supabase** | Database, authentication | **eu-central-1, Frankfurt** · project `mynjjgtjytzyfsuqqlhg` | EU. Parent is US — DPA with SCCs required | RLS enabled on both member tables; advisor returns zero lints |
| **Netlify** | Hosting, CDN | US company, global edge | SCCs via DPA. EU-US Data Privacy Framework where applicable | Serves static assets and HTML |
| **Brevo** | Transactional and marketing email | **France, EU** | EU. No transfer mechanism needed | Domain authenticated; DKIM and DMARC verified |
| **Porkbun** | Domain registrar and DNS | US | SCCs via registrar terms | Authoritative nameservers; no member data |
| **Wistia** | Video and audio hosting | US | SCCs via DPA | **Provisioned, not yet in the member path** |
| **Plausible** *(proposed)* | Site analytics | **EU** | EU. Cookieless, IP-anonymised | Not yet deployed |
| **Paddle** *(proposed)* | Merchant of record | UK | UK adequacy decision | Not yet live. As MoR, Paddle is a controller for payment data |
| **Sentry** *(proposed)* | Error monitoring | EU region, if configured | EU if EU-region DSN used | **Not deployed.** Config scrubs before transmission |

### ⚠ Chapter V — the transfer that is easy to miss

**Remote access from a third country can itself constitute a transfer.** The
controller is established in Sint Maarten and the founder operates from there. A
Transfer Impact Assessment is scoped; the SCC mechanism is under review and is
not complete.

**This is the single largest open item on this register.** It is not solved by
the Frankfurt database, because access — not storage — is the transfer.

### Processors that do not touch member data

ElevenLabs, Adobe, Canva, Runway, Descript — content production only, on material
that contains no personal data. Listed for completeness, not as processors.

---

## 6 · Security measures

**Technical.** TLS in transit · encryption at rest, Supabase-managed · row-level
security on every table holding member data, verified · trigger-protected
entitlement columns · no `service_role` key in the repository · publishable keys
only, by design · security headers with CSP · leaked-password protection *(to be
enabled)* · rate limiting on authentication *(when reset is built)*.

**Organisational.** Single operator with documented handover architecture · no
subprocessor added without a DPA · no member telemetry, as a standing rule ·
error monitoring scrubs before transmission and never initialises on a member
surface.

**Known gaps, stated deliberately.** Article 27 representative not appointed ·
Chapter V mechanism not complete · retention periods not set · no independent
security audit · key-person risk named and unresolved.

---

## 7 · Backup and recovery

See `docs/BACKUP-AND-RECOVERY.md`. In summary: Supabase free tier retains daily
backups for **7 days with no point-in-time recovery**, which is inadequate before
real member data exists.

---

## 8 · Data subject rights

| Right | How it is met | Ready? |
|---|---|---|
| Access | Export from the account page | ⚠ **Not built** — LG-126 |
| Rectification | Email address changeable in account settings | Partial |
| Erasure | Account deletion, cascading via foreign keys | ⚠ **Not built** |
| Portability | The export above, as JSON | ⚠ **Not built** |
| Objection | Withdraw marketing consent; usage events opt-out | Partial |
| Complaint | To the relevant supervisory authority | Named in the privacy policy |

⚠ **Three of six are not built.** For a platform with two accounts this is
manageable by hand. **It stops being manageable the moment the free tier opens**,
and a request has a one-month statutory deadline.

---

## Review

Reviewed annually, and whenever a processor is added, removed or relocated.

**Next review: 9 September 2027, or on the first of those events.**
