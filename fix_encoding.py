import os
import sys

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # The files were double-encoded because UTF-8 bytes were read as Windows-1252 strings 
        # and then written out as UTF-8. 
        # This gracefully reverses it by reverting to bytes and decoding as UTF-8.
        raw_bytes = content.encode('windows-1252', errors='ignore')
        fixed_content = raw_bytes.decode('utf-8', errors='ignore')
        
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(fixed_content)
        print(f"Fixed {filepath}")
    except Exception as e:
        print(f"Skipped {filepath}: {e}")

fix_file(r"c:\Users\Frank\Desktop\Franck Soluciones IT\index.html")
fix_file(r"c:\Users\Frank\Desktop\Franck Soluciones IT\main.js")
