import re

file_path = r'c:\Users\User\Desktop\NoteClub\gallery.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the gallery-actions div and its content
actions_pattern = re.compile(r'\s*<div class="gallery-actions">.*?</div>', re.DOTALL)
# Pattern to match the gallery-comments div and its content
comments_pattern = re.compile(r'\s*<div class="gallery-comments">.*?</div>', re.DOTALL)

new_content = actions_pattern.sub('', content)
new_content = comments_pattern.sub('', new_content)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully removed social features from gallery.html")
else:
    print("Could not find social features to remove in gallery.html")
