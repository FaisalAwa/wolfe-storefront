import shutil, os

TMP = os.path.join(os.path.dirname(__file__), "tmp")
OUT = os.path.dirname(__file__)

MAP = {
    # Heroes
    "hero-home.jpg":        "home-11.jpg",
    "hero-about.jpg":       "home-12.jpg",
    "hero-residential.jpg": "res-01.png",
    "hero-commercial.jpg":  "res-02.png",
    "hero-press.jpg":       "press-01.jpg",
    "hero-shop.jpg":        "home-08.jpg",
    # Products
    "product-sofa.png":     "prod-03.png",
    "product-sofa-2.png":   "prod-02.png",
    "product-sofa-3.png":   "prod-01.png",
    "product-sofa-4.png":   "prod-08.png",
    "product-armchair.png": "prod-06.png",
    "product-table.png":    "prod-04.png",
    "product-lamp.png":     "prod-07.png",
    # About
    "about-founder.png":    "about-05.png",
    "about-interior-1.jpg": "about-01.jpg",
    "about-interior-2.png": "about-02.png",
    # Home sections
    "selected-works.png":   "prod-09.png",
    "atelier.jpg":          "home-17.jpg",
    "studio.png":           "about-02.png",
    "project-miami.jpg":    "home-01.jpg",
    "project-wellness.png": "home-07.png",
    "project-medspa.png":   "home-13.png",
    "cta-bg.jpg":           "home-09.jpg",
    # Shop rooms
    "room-living.png":      "prod-10.png",
    "room-kitchen.jpg":     "home-12.jpg",
    "room-bedroom.png":     "res-03.png",
    # Press highlights (for Recent Highlights + article grid)
    "press-feat-1.jpg":     "press-02.jpg",
    "press-feat-2.jpg":     "press-03.jpg",
    "press-feat-3.jpg":     "press-05.jpg",
    "press-article-1.jpg":  "press-01.jpg",
    "press-article-2.jpg":  "press-02.jpg",
    "press-article-3.jpg":  "press-03.jpg",
    "press-article-4.jpg":  "press-05.jpg",
    "press-article-5.jpg":  "press-06.jpg",
    "press-article-6.jpg":  "press-08.jpg",
    "press-article-7.jpg":  "press-10.jpg",
    "press-article-8.jpg":  "press-15.jpg",
    "press-article-9.jpg":  "press-16.jpg",
    # Recognition (home page)
    "recognition-1.jpg":    "press-02.jpg",
    "recognition-2.jpg":    "press-03.jpg",
    "recognition-3.jpg":    "press-05.jpg",
    # Residential projects
    "res-project-1.png":    "res-01.png",
    "res-project-2.png":    "res-02.png",
    "res-project-3.png":    "res-03.png",
    "res-project-4.png":    "res-04.png",
    "res-project-5.png":    "res-05.png",
    "res-project-6.png":    "res-06.png",
    # Commercial projects
    "com-project-1.png":    "com-02.png",
    "com-project-2.png":    "com-03.png",
    "com-project-3.png":    "com-04.png",
    "com-project-4.png":    "com-05.png",
    "com-project-5.png":    "com-06.png",
    "com-project-6.png":    "com-07.png",
    # Curated finishes (shop)
    "finish-1.png":         "about-01.jpg",
    "finish-2.png":         "home-08.jpg",
}

ok = 0
for dest, src in MAP.items():
    src_path = os.path.join(TMP, src)
    dest_path = os.path.join(OUT, dest)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"  OK  {dest}")
        ok += 1
    else:
        print(f"  MISS {src} → {dest}")

print(f"\nCopied {ok}/{len(MAP)} files")
