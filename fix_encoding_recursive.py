import os
import sys

files = [
    r"c:\Users\Frank\Desktop\Franck Soluciones IT\index.html",
    r"c:\Users\Frank\Desktop\Franck Soluciones IT\main.js"
]

def fix_recursive(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read()
    
    content = raw.decode('utf-8', errors='ignore')

    changed = True
    iterations = 0
    while changed and iterations < 5:
        changed = False
        try:
            if "Ã" in content or "Â" in content or "â" in content:
                new_content = content.encode('windows-1252').decode('utf-8')
                if new_content != content:
                    content = new_content
                    changed = True
            else:
                break
        except Exception as e:
            # Fallback literal replacement
            reps = {
                "Ã¡": "á", "Ã©": "é", "Ã\xad": "í", "Ã³": "ó", "Ãº": "ú", "Ã±": "ñ",
                "Â¿": "¿", "Â©": "©", "â€”": "—", "Ã\x81": "Á", "Ã‰": "É", "Ã\x8d": "Í",
                "Ã“": "Ó", "Ãš": "Ú", "Ã‘": "Ñ", "Â¡": "¡", "ðŸš€": "🚀", "â€“": "–",
                "Ã ": "à", "Ã¨": "è", "Ã¬": "ì", "Ã²": "ò", "Ã¹": "ù"
            }
            for k, v in reps.items():
                content = content.replace(k, v)
            content = content.replace("Â", "") 
            break
        iterations += 1

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print(f"Fixed {filepath} in {iterations} passes")

for f in files:
    fix_recursive(f)
