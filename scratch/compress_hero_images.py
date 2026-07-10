import os
from PIL import Image

dir_path = '/home/fox/sankara_id/sankara/frontend/public/assets/hero_slides/'

print("Starting hero image compression...")
for filename in os.listdir(dir_path):
    if filename.lower().endswith('.png'):
        filepath = os.path.join(dir_path, filename)
        size_before = os.path.getsize(filepath)
        print(f"Loading {filename} ({size_before / (1024*1024):.2f} MB)...")
        
        img = Image.open(filepath)
        
        # Resize to max 1200px dimension
        max_size = 1200
        if img.width > max_size or img.height > max_size:
            img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
        # Define output WebP path
        base_name, _ = os.path.splitext(filename)
        webp_filepath = os.path.join(dir_path, base_name + '.webp')
        
        # Save as optimized WebP with transparency
        img.save(webp_filepath, 'WEBP', quality=85)
        
        size_after = os.path.getsize(webp_filepath)
        print(f"Saved {base_name}.webp ({size_after / (1024*1024):.2f} MB) - Reduction: {((size_before - size_after) / size_before) * 100:.1f}%")
        
        # Remove original PNG
        os.remove(filepath)
        print(f"Removed original {filename}\n")

print("All hero images compressed successfully!")
