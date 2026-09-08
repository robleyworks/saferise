# SafeRise — Record of Processing Activities

**GDPR Article 30 · Kenor International B.V. · Version 1 · 8 September 2026**

Controller: Kenor International B.V., Sint Maarten. Trading as SafeRise Protocol.

**Status: skeleton.** Rows marked ⚠ carry a value that has not been verified
against the processor's own documentation. Verify each before this record is
relied on or before the privacy page publishes — every row is a factual claim
you would have to defend.

**Standing processing preference: European Union, Frankfurt (eu-central-1)
where the choice exists.** Where a processor offers no EU option, either the
processor changes or a transfer mechanism is named. There is no third option.

---

## 1 · Processing activities

### A1 · Member account creation and authentication

| Field | Entry |
|---|---|
| Data subjects | Members and prospective members |
| Personal data | Email address, name if supplied, account identifier, authentication timestamps, IP address at sign-in |
| Purpose | Creating and securing an account; giving access to purchased tracks |
| Lawful basis | Art. 6(1)(b) — performance of a contract |
| Processor | Auth and CRM provider ⚠ |
| Storage location | ⚠ To verify. If not EU, either migrate or name the mechanism. |
| Transfer mechanism | ⚠ Depends on the above |
| Retention | For the life of the account, plus ⚠ months after closure |
| Security | TLS in transit; encryption at rest ⚠; access limited to the controller |

### A2 · Subscription billing and payment

| Field | Entry |
|---|---|
| Data subjects | Paying members |
| Personal data | Name, billing address, country, tax status, transaction records. **No card data reaches SafeRise.** |
| Purpose | Taking payment, issuing invoices, handling tax and refunds |
| Lawful basis | Art. 6(1)(b) contract; Art. 6(1)(c) legal obligation for tax records |
| Processor | Merchant of record ⚠ |
| Note | Under a merchant-of-record arrangement the provider is the seller and acts as a **controller in its own right** for the payment transaction, not solely as SafeRise's processor. State the relationship correctly on the privacy page — getting this wrong is a common and visible error. |
| Storage location | ⚠ |
| Retention | Tax records for the statutory period ⚠; confirm which jurisdiction's period governs |

### A3 · Transactional account email

| Field | Entry |
|---|---|
| Data subjects | Members and prospective members |
| Personal data | Email address, message content, delivery and open/bounce logs |
| Purpose | Sign-up confirmation, password reset, billing notices, service notifications |
| Lawful basis | Art. 6(1)(b) — contract |
| Processor | ⚠ **Open.** Resend is ruled out under the Frankfurt preference — it stores in the US with no EU storage option, and its sending region does not move stored data. Candidates with EU residency by default: Brevo, Mailjet, Scaleway. |
| Storage location | EU, once selected |
| Transfer mechanism | None required if EU-resident |
| Retention | Logs ⚠ days; align with whatever the chosen provider offers |

### A4 · Website hosting and delivery

| Field | Entry |
|---|---|
| Data subjects | All site visitors |
| Personal data | IP address, user agent, requested URL, timestamps in server and CDN logs |
| Purpose | Serving the site; security and abuse prevention |
| Lawful basis | Art. 6(1)(f) — legitimate interests (site security and availability) |
| Processor | Netlify ⚠ |
| Storage location | ⚠ Check whether an EU edge and EU log retention are available on the current plan |
| Retention | ⚠ |

### A5 · Video and audio delivery

| Field | Entry |
|---|---|
| Data subjects | Members playing guided sessions |
| Personal data | IP address, playback events, device and browser data |
| Purpose | Delivering media and diagnosing playback problems |
| Lawful basis | Art. 6(1)(b) contract for delivery; Art. 6(1)(a) consent for any analytics beyond delivery |
| Processor | Wistia ⚠ |
| Storage location | ⚠ |
| Note | If viewing analytics are enabled, they are **not** covered by the contract basis and need consent. Confirm what is switched on. |

### A6 · Support correspondence

| Field | Entry |
|---|---|
| Data subjects | Anyone who contacts SafeRise |
| Personal data | Email address, message content, anything the person volunteers |
| Purpose | Answering questions and resolving problems |
| Lawful basis | Art. 6(1)(b) contract, or Art. 6(1)(f) for non-members |
| Note | Members may disclose health information unprompted in support email. Do not invite it, do not retain longer than needed, and do not move it into the CRM record. |
| Retention | ⚠ Propose 24 months, then delete |

### A7 · Journal and personal record — **no processing occurs**

| Field | Entry |
|---|---|
| Data subjects | Members |
| Personal data | **None received.** Journal entries, records and written reflections are stored on the member's own device and are never transmitted to SafeRise or any processor. |
| Purpose | n/a |
| Lawful basis | n/a — no processing takes place |
| Consequence | The Article 9 special-category question does not arise, because the category of data most likely to reveal health information never reaches the controller. |
| Obligation created | The member holds the only copy. Device-storage disclosure and an export control are therefore **required**, not optional. |

This row exists deliberately. Documenting an activity that does **not** happen
is how a privacy-by-design decision becomes evidence rather than a claim.

---

## 2 · Procedure — how to complete and maintain this

1. **Collect the source documents.** For each processor: its DPA, its
   sub-processor list, and its security or trust page. Take the values from
   those, not from marketing pages. Resend's own GDPR page says data is stored
   in the US while its product offers an "EU region" that only affects sending
   — that pattern is common and it is exactly what this step catches.
2. **Fill the ⚠ rows** with location, transfer mechanism and retention.
3. **Resolve every non-EU location** by migrating or by naming the mechanism.
   Under the Frankfurt preference, migration is the default answer.
4. **Execute or confirm the DPA** for each remaining processor. Some are
   pre-signed on account creation; some need a counter-signature. Record which.
5. **Publish the summary,** not this document. The privacy page carries a plain
   table: processor, purpose, location, safeguard. This record stays internal.
6. **Review on any change** — new processor, new region, new data category —
   and at minimum annually. Date and version every revision.

**Article 30 applies to Kenor as controller regardless of size**, because the
processing is not occasional and concerns individuals across multiple
countries. Treat it as required rather than as good practice.

---

## 3 · Copy for the legal pages

### Privacy — processing location

> **Where your information is held.** We keep account information on servers in
> the European Union, in Frankfurt, Germany. Where a service we rely on cannot
> hold data in the EU, we say so in the table below and name the safeguard that
> applies to it.

### Privacy — the journal, stated plainly

> **Your journal stays on your device.** What you write in SafeRise — journal
> entries, reflections, anything you record as you work through a protocol — is
> stored on the device you wrote it on. It is not sent to us. We cannot read
> it, we do not back it up, and we could not recover it for you.
>
> That means you hold the only copy. If you clear your browser data, change
> device, or use SafeRise in a private window, what you have written can be
> lost. Use **Export** to save a copy somewhere you control, and do it before
> you change device.

### Protocol page — the same thing, shorter

> Anything you write here stays on this device. We never receive it, so we
> cannot recover it. Export a copy before you switch devices.

### Terms — corresponding clause

> **Your content.** You keep everything you write in SafeRise. It is stored on
> your device and is not transmitted to us, so we hold no copy, cannot access
> it, and cannot restore it if it is lost. Exporting and keeping your own
> backup is your responsibility, and we provide an export function for that
> purpose.

### Terms — testing and efficacy (LG-115)

> SafeRise Protocol has not been through a clinical trial. The frameworks it
> draws on — polyvagal theory, heart-rate variability coherence research, and
> compassionate inquiry among them — are published and peer-reviewed in their
> own right. The protocols are our application of those frameworks, and that
> application has not been independently tested. Nothing here is a claim that
> it will produce a particular result for you.

---

## 4 · Open items

- Email provider under the Frankfurt preference — decide, then execute the DPA.
- Auth/CRM and merchant-of-record storage locations — verify, then migrate or
  name the mechanism.
- Wistia: confirm whether analytics beyond delivery are enabled; if so, consent
  is required and a banner control has to exist.
- Netlify: confirm EU edge and log retention on the current plan.
- The export control has to ship before the journal disclosure is true. A page
  that says "use Export" without an export button is a worse position than
  saying nothing.
