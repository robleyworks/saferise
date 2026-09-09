# Backup and recovery

**Version 1 · 9 September 2026 · Kenor International B.V.**

Written before there is any real member data, which is the only sensible time to
write it.

---

## 1 · What Supabase actually gives you

| Tier | Backups | Point-in-time recovery |
|---|---|---|
| **Free — current** | Daily, retained **7 days** | **None** |
| Pro | Daily, retained 7 days | Available as a paid add-on |

⚠ **On the free tier there is no point-in-time recovery.** If a bad migration or
a mistaken `delete` runs at 14:00, the most recent restore point is the previous
night. Everything after it is gone.

That is acceptable today, because the database holds two accounts and no
irreplaceable content. **It stops being acceptable on the day the free tier
opens.**

---

## 2 · What actually needs backing up

| Asset | Where it lives | Recoverable from | Real risk |
|---|---|---|---|
| Protocol corpus, 151,773 words | Git | GitHub | **Low** — distributed, versioned |
| Site code | Git | GitHub | **Low** |
| Images, audio | Git and `assets/` | GitHub | Low. **Verify large media is not gitignored** |
| **Member accounts** | Supabase | Supabase backup only | **HIGH — single copy** |
| **Entitlements** | Supabase `public.members` | Supabase backup only | **HIGH — this is who has paid** |
| Usage events | Supabase | Supabase backup only | Medium — aggregate, reconstructable |
| Member journals | **The member's device** | **Not ours** | See §5 |
| Email list | Brevo | Brevo export | Medium — export monthly |
| DNS zone | Porkbun | Manual export | Medium — one page, no automation |

**The corpus is safe.** It is in Git and in two places. The exposure is the
member table — the record of who has paid, which exists in exactly one system.

---

## 3 · Before the free tier opens

Three things, roughly two hours in total.

### 3a · A weekly database export you control

A scheduled job producing a `pg_dump` into storage you own — GitHub Actions
writing to a private repository, or a small object store.

```
0 4 * * 1   pg_dump "$SUPABASE_DB_URL" --no-owner --format=custom > saferise-$(date +%F).dump
```

⚠ **The connection string is a live credential.** It goes in the runner's secret
store, never in the repository. **This is the one place a `service_role`-grade
secret is legitimately used, and it must never reach client code.**

Retain 8 weekly dumps. Roughly 12 months in, revisit.

### 3b · Test a restore. Once. Properly.

**A backup nobody has restored is a belief, not a backup.**

1. Create a second Supabase project — free, throwaway
2. Restore the most recent dump into it
3. Confirm: row counts match · RLS policies survive · a test account signs in
4. Delete the throwaway project
5. **Write the date and the result into this document**

**Last tested: never.** Change that line before the first real member.

### 3c · Monthly manual exports

Brevo contacts and the Porkbun DNS zone. Neither has an API worth automating for
one operator. Ten minutes, first Monday of the month.

---

## 4 · Targets

| | Target | Today |
|---|---|---|
| **RPO** — data you could lose | **7 days** at free tier, 24h once weekly dumps run | Undefined |
| **RTO** — time to be back | **4 hours** | Untested |

Both are conservative for an alpha. **Both need revisiting the moment there is
paid membership**, where an RPO of a week means losing a week of signups.

---

## 5 · The journal, and why it is not backed up

Member journals and records are written to the member's own device and never
transmitted. **We cannot back them up, and that is the design.**

The consequence has to be stated to members plainly, because it is real: **if
they clear their browser data or lose the device, the record is gone, and we
cannot recover it.** That belongs in the privacy policy and beside the export
control when it is built (LG-126).

The export control is the mitigation, and it does not exist yet. **It is the
member's only route to a backup of their own writing.**

---

## 6 · When something goes wrong

**Database corruption or bad migration.** Restore the most recent Supabase backup
into a fresh project, verify, repoint `js/saferise-auth.js`. Members signed in
during the gap will need to sign in again.

**Accidental deletion.** Same, but check the weekly dump first — it may be closer
in time than the nightly.

**Supabase outage.** Nothing to do but wait. The public site is static on Netlify
and stays up; the member area does not. **Say so on the site rather than letting
people find a broken sign-in.**

**Repository loss.** GitHub plus at least one local clone. Confirm a second clone
exists somewhere other than the primary machine.

**Credential compromise.** Rotate the Supabase publishable key, rotate the Brevo
SMTP key, rotate the Porkbun API key, force sign-out of all sessions. Then
`docs/fix-register.md`, with an SR ID.

---

## 7 · Schedule

| | Frequency |
|---|---|
| Automated database dump | Weekly, Monday 04:00 |
| Brevo contact export | Monthly |
| DNS zone export | Monthly |
| **Restore test** | **Quarterly, and once before launch** |
| Review this document | Annually, or on any infrastructure change |

---

**Restore test log**

| Date | Dump tested | Result | By |
|---|---|---|---|
| — | — | **Never tested** | — |
