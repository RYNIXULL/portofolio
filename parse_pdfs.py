import os
from pypdf import PdfReader

folder = 'public/sertif'
files = [
    'sertif modul 1.pdf',
    'sertif modul 2.pdf',
    'sertif modul 3.pdf',
    'sertif modul 4.pdf'
]

for file in files:
    path = os.path.join(folder, file)
    try:
        reader = PdfReader(path)
        page = reader.pages[0]
        text = page.extract_text()
        print(f"--- {file} ---")
        print(text[:200].replace('\n', ' '))
    except Exception as e:
        print(f"Error reading {file}: {e}")
