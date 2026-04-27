#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir('/vercel/share/v0-project')

# V71のコミットハッシュに戻す
result = subprocess.run(['git', 'reset', '--hard', 'ebde277df8a81dcf73ba7348a054b2ccaf86296c'], 
                       capture_output=True, text=True)

print(result.stdout)
if result.stderr:
    print(result.stderr, file=sys.stderr)

sys.exit(result.returncode)
