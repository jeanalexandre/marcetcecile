import re
import glob

def update_image_references(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remplacer les références simples d'images PNG par WebP
    content = re.sub(
        r'src="/images/([a-zA-Z0-9-_]+)\.png"',
        r'src="/images-optimized/\1.webp"',
        content
    )

    # Remplacer aussi les src={} JSX style
    content = re.sub(
        r'src=\{(["\'])/images/([a-zA-Z0-9-_]+)\.png\1\}',
        r'src={\1/images-optimized/\2.webp\1}',
        content
    )

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Traiter tous les fichiers .astro
files = glob.glob('src/**/*.astro', recursive=True)
updated = 0

for file_path in files:
    if update_image_references(file_path):
        print(f"✅ Updated: {file_path}")
        updated += 1
    else:
        print(f"⏭️  No changes: {file_path}")

print(f"\n✨ {updated} file(s) updated!")

