import re

def convert_to_img(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Supprimer l'import de Image
    content = re.sub(r"import \{ Image \} from 'astro:assets';\s*\n", '', content)

    # Remplacer les balises <Image ... /> par <img ... />
    # Pattern pour capturer les attributs
    def replace_image(match):
        attrs = match.group(1)
        # Supprimer les attributs spécifiques à Image (format, quality)
        attrs = re.sub(r'\s*format="[^"]*"', '', attrs)
        attrs = re.sub(r'\s*quality=\{?\d+\}?', '', attrs)
        return f'<img{attrs} />'

    content = re.sub(r'<Image([^>]*)/>', replace_image, content)

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Traiter les fichiers
files = [
    'src/pages/index.astro',
    'src/pages/rendezvous.astro',
    'src/pages/surmesure.astro'
]

for file_path in files:
    if convert_to_img(file_path):
        print(f"✅ Converted: {file_path}")
    else:
        print(f"⏭️  No changes: {file_path}")

print("\n✨ Conversion complete!")

