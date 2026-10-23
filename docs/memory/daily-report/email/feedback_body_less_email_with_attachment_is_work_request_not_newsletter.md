---
name: body-less-email-with-attachment-is-work-request-not-newsletter
description: Client email with empty body + PDF brief (e.g. MPFC "Team Managers update") is a work request, not a newsletter — always check attachments
metadata:
  type: feedback
---
2026-10-22 16:10 VN: info@mypersonalfootballcoach.com → freelancer@ "Team Managers update", empty body, attachment "Team Manager Upgrade — Web Developer Brief.pdf". Daily report 10-23 labeled it "newsletter"; assistant daemon also missed it. User flagged as important.
**Why:** subject+snippet look generic; the real content is in the attachment.
**How to apply:** for every email (daily-report Piece 1, assistant gate) list attachment filenames; client-domain mail with brief/spec/quote/contract attachment = customer request needing reply. info@mpfc also sends automated "Stuck events cron" mails — those stay noise. Related [[freelancer_email_must_be_scanned]].
