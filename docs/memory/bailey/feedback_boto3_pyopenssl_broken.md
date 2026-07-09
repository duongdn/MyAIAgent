---
name: feedback_boto3_pyopenssl_broken
description: aws CLI not installed on this machine; boto3 import crashes via urllib3.contrib.pyopenssl/OpenSSL version mismatch — fix with pip install --user --upgrade pyOpenSSL
metadata:
  type: feedback
---

There is no `aws` CLI binary on this machine and no `awscli` pip package. For Bailey monitor's AWS calls (CloudWatch, EC2, RDS, Cost Explorer), use `boto3` directly instead of shelling out to `aws`.

`import boto3` initially crashes: `botocore.httpsession` imports `urllib3.contrib.pyopenssl`, which imports the system `OpenSSL` package (`/usr/lib/python3/dist-packages`, pyOpenSSL 18.1.0) — that old version is incompatible with the `cryptography==47.0.0` already installed in user site-packages (`~/.local/lib/python3.8/site-packages`), producing `AttributeError: module 'lib' has no attribute 'X509_V_FLAG_NOTIFY_POLICY'`.

**Fix:** `python3 -m pip install --user --upgrade pyOpenSSL` — this installs a pyOpenSSL version compatible with the newer `cryptography` package into user site (which takes precedence over dist-packages). After that, `boto3.client(...)` works normally (confirmed via `sts.get_caller_identity`).

**How to apply:** At the start of any Bailey-monitor (or other AWS-touching) run, if `import boto3` fails with this pyOpenSSL/X509StoreFlags error, run the pip upgrade above — don't waste time trying to install `awscli` (not present, no working `pip3`/`aws` binary either, only `python3 -m pip`). Credentials load from `config/.bailey-config.json` → `aws.access_key_id` / `aws.secret_access_key` / `aws.region` (region eu-west-3).
