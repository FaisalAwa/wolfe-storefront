import urllib.request
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

PUBLIC = os.path.dirname(os.path.abspath(__file__))
TMP = os.path.join(PUBLIC, "tmp")
os.makedirs(TMP, exist_ok=True)

IMAGES = {
    # HOME frame jpegs
    "home-01.jpg": "https://www.figma.com/api/mcp/asset/27dc055b-4d97-4e4e-94d1-5411e7fbdb01",
    "home-04.jpg": "https://www.figma.com/api/mcp/asset/278c796b-e072-4442-8dee-cd337935139e",
    "home-06.jpg": "https://www.figma.com/api/mcp/asset/9f5ea007-f92f-4cde-af2d-d452370020b8",
    "home-08.jpg": "https://www.figma.com/api/mcp/asset/79f6d447-db97-4479-b91b-38ad27a592e4",
    "home-09.jpg": "https://www.figma.com/api/mcp/asset/d77bfb8b-5938-44a4-9d3f-dabd84c7c8e7",
    "home-10.jpg": "https://www.figma.com/api/mcp/asset/b1f2684f-6649-4cf2-ab6e-79765cbda6d6",
    "home-11.jpg": "https://www.figma.com/api/mcp/asset/e0ee02fe-12a9-4de9-a6c1-e8266be87d11",
    "home-12.jpg": "https://www.figma.com/api/mcp/asset/1c24b5ce-1d96-442d-8fc7-05b4843e7bac",
    "home-14.jpg": "https://www.figma.com/api/mcp/asset/3a503d6e-7ba6-474e-830f-34889114c4fe",
    "home-15.jpg": "https://www.figma.com/api/mcp/asset/5e84c746-6be3-4260-8688-a4d5c713bb23",
    "home-16.jpg": "https://www.figma.com/api/mcp/asset/0c331db5-7092-4bd9-aa5e-c17a7406dd8e",
    "home-17.jpg": "https://www.figma.com/api/mcp/asset/114c51a4-0208-4a77-bcbf-bcb2a2ea164d",
    "home-18.jpg": "https://www.figma.com/api/mcp/asset/8b32e25a-14ad-48c8-8908-9abe4e78f3bb",
    "home-20.jpg": "https://www.figma.com/api/mcp/asset/bd415e19-d854-41ab-bad8-2f7a347d8cdb",
    # HOME frame pngs
    "home-02.png": "https://www.figma.com/api/mcp/asset/d99e2303-0e0a-442d-9e76-57ffe7f6ae93",
    "home-03.png": "https://www.figma.com/api/mcp/asset/b1c900b8-96b4-43b4-9d81-144567a201a9",
    "home-05.png": "https://www.figma.com/api/mcp/asset/27e97dde-cfc6-4da4-86cf-a258b37376a8",
    "home-07.png": "https://www.figma.com/api/mcp/asset/92d2adcd-3b0f-4611-b569-5ee1532176d8",
    "home-13.png": "https://www.figma.com/api/mcp/asset/07e511d7-69d8-4e6b-a796-ad417fe1bc36",
    "home-19.png": "https://www.figma.com/api/mcp/asset/738b77f5-b5df-4d91-b604-e6f9212bc420",
    # SHOP frame
    "shop-03.jpg": "https://www.figma.com/api/mcp/asset/6f380ed8-f702-4526-9d88-8705fae03b11",
    "shop-08.jpg": "https://www.figma.com/api/mcp/asset/fbcb60a7-cedb-4412-923f-ca27971ba283",
    "shop-09.jpg": "https://www.figma.com/api/mcp/asset/5503eabe-f964-468c-af54-80cfc045cb41",
    "shop-19.jpg": "https://www.figma.com/api/mcp/asset/963bc391-286e-4c39-9417-e3836664a133",
    "shop-20.jpg": "https://www.figma.com/api/mcp/asset/c99c5350-a74a-4634-91e5-752f307c9068",
    "shop-01.png": "https://www.figma.com/api/mcp/asset/51210a4d-ab6b-4dc7-ba88-819aa06c3368",
    "shop-02.png": "https://www.figma.com/api/mcp/asset/8dc64941-50ff-4ff3-888f-eb84a804f6a0",
    "shop-04.png": "https://www.figma.com/api/mcp/asset/7d5245d9-5c7e-4142-9f41-92d0bbbe4c5d",
    "shop-05.png": "https://www.figma.com/api/mcp/asset/97a1122b-b7eb-4290-82a0-1e5aaf8fdb90",
    "shop-06.png": "https://www.figma.com/api/mcp/asset/1716b6db-3534-45a2-b09a-c4e988a9776d",
    "shop-07.png": "https://www.figma.com/api/mcp/asset/4cdd1c55-e184-4824-a65b-279746199e26",
    "shop-10.png": "https://www.figma.com/api/mcp/asset/4685b182-b3ef-4389-a825-2e2c5a2a03ab",
    "shop-11.png": "https://www.figma.com/api/mcp/asset/4548699c-255c-4b0b-a51b-9f05b0b13cb1",
    "shop-12.png": "https://www.figma.com/api/mcp/asset/874a55da-9eb1-4433-8219-76fd0eb985b2",
    "shop-13.png": "https://www.figma.com/api/mcp/asset/981ae91f-953f-49db-9c3e-f239f7e9332f",
    "shop-14.png": "https://www.figma.com/api/mcp/asset/b3b6186e-c971-49a1-b68c-c4ce2f613ca1",
    "shop-15.png": "https://www.figma.com/api/mcp/asset/b64b50fa-8cbb-4315-b516-027962d42a6a",
    "shop-16.png": "https://www.figma.com/api/mcp/asset/d86e59df-dce5-44c4-83c9-7ceee99ca15f",
    "shop-17.png": "https://www.figma.com/api/mcp/asset/b2f5bb77-b50c-4ed9-ab8b-de99096f4d07",
    "shop-18.png": "https://www.figma.com/api/mcp/asset/7cdb912a-7f61-4d79-9c55-617afb4baa37",
    # ABOUT frame
    "about-01.jpg": "https://www.figma.com/api/mcp/asset/462657f6-92ef-4285-bbf2-5a951f0c8092",
    "about-04.jpg": "https://www.figma.com/api/mcp/asset/23de8656-a7bb-4886-b420-65469f0d53ed",
    "about-02.png": "https://www.figma.com/api/mcp/asset/572ff53d-b94f-4ad2-b712-ff7d005ca33e",
    "about-03.png": "https://www.figma.com/api/mcp/asset/51e18f64-94a5-47a3-bce7-4ab4630f9536",
    "about-05.png": "https://www.figma.com/api/mcp/asset/e5733bf1-25d0-4614-9949-1a5f294d6ddd",
    "about-06.png": "https://www.figma.com/api/mcp/asset/57179b2b-7720-4ae8-9158-183b33d09702",
    "about-07.png": "https://www.figma.com/api/mcp/asset/50013937-a2f0-4804-95b3-f4576ae7c511",
    "about-08.png": "https://www.figma.com/api/mcp/asset/28558ff7-e347-497e-bd5c-7bc9bd71d8d7",
    "about-09.png": "https://www.figma.com/api/mcp/asset/a1e865ac-c9c0-47b4-8b3c-69f30cb8b768",
    "about-10.png": "https://www.figma.com/api/mcp/asset/b5a5d543-e8f4-467a-ad33-0fd1e6c70625",
    # RESIDENTIAL frame (all PNG)
    "res-01.png": "https://www.figma.com/api/mcp/asset/bc575cbb-b85c-4d35-adb5-a3a651c80029",
    "res-02.png": "https://www.figma.com/api/mcp/asset/f8fb1dfc-fed0-496f-b9af-3621b87e5acd",
    "res-03.png": "https://www.figma.com/api/mcp/asset/af5b4218-a9b8-452b-8b52-b1c3b362bdf3",
    "res-04.png": "https://www.figma.com/api/mcp/asset/39b1c800-21c3-4852-a839-d8ec6a5399ef",
    "res-05.png": "https://www.figma.com/api/mcp/asset/298155bd-da53-4f55-a81d-04b36d723cc9",
    "res-06.png": "https://www.figma.com/api/mcp/asset/2b41c1dd-16c7-4925-bd1c-9dddc9e920ff",
    "res-07.png": "https://www.figma.com/api/mcp/asset/13b9835c-5c62-43a9-8593-1094b85c4231",
    "res-08.png": "https://www.figma.com/api/mcp/asset/2cc40531-7546-46a1-a702-930f81e6d0ca",
    "res-09.png": "https://www.figma.com/api/mcp/asset/3d388fa0-1fda-4ef7-a808-340d8ac27e47",
    "res-10.png": "https://www.figma.com/api/mcp/asset/b5f3291b-9881-4fb5-93cc-489da4bda1e3",
    "res-11.png": "https://www.figma.com/api/mcp/asset/89ddc92a-e4a6-4355-8efb-34d6dab5afa5",
    "res-12.png": "https://www.figma.com/api/mcp/asset/b266a332-c262-469a-b4f4-4a338f17a880",
    "res-13.png": "https://www.figma.com/api/mcp/asset/a97f6717-9548-4235-9bbf-145391acaebc",
    "res-14.png": "https://www.figma.com/api/mcp/asset/1fe0b913-859a-473b-9eda-b5bbc2a53757",
    "res-15.png": "https://www.figma.com/api/mcp/asset/e8d8f1f3-1a6a-4b02-ae76-5823ba42eab0",
    "res-16.png": "https://www.figma.com/api/mcp/asset/96c00fd2-8618-40e4-b8c2-8b812a6cc027",
    "res-17.png": "https://www.figma.com/api/mcp/asset/01a06e3b-b08f-4dcb-8b5f-efede9757a79",
    "res-18.png": "https://www.figma.com/api/mcp/asset/160fb9b8-b20e-4a85-8dd6-8611dd12a4f4",
    "res-19.png": "https://www.figma.com/api/mcp/asset/19b2996c-1d34-4514-b1e2-f0e25fee4023",
    "res-20.png": "https://www.figma.com/api/mcp/asset/ed3d51f5-e6cc-480f-97af-d6cae6cbbdb4",
    # PRODUCT frame (all PNG)
    "prod-01.png": "https://www.figma.com/api/mcp/asset/48d7bf4c-c855-4f07-bf34-81208a2a7af5",
    "prod-02.png": "https://www.figma.com/api/mcp/asset/90fb176f-9f60-4e9d-8450-58b59c1c596a",
    "prod-03.png": "https://www.figma.com/api/mcp/asset/4c643e74-d7a5-4ef8-ad56-39a1a4c19cea",
    "prod-04.png": "https://www.figma.com/api/mcp/asset/433a6770-ba87-4483-8906-31234ac72fbe",
    "prod-05.png": "https://www.figma.com/api/mcp/asset/0950bfaf-dc44-4ecb-befd-2752419ff3b2",
    "prod-06.png": "https://www.figma.com/api/mcp/asset/9973de5c-b1d4-4d9d-a841-3565a57dbf54",
    "prod-07.png": "https://www.figma.com/api/mcp/asset/42bcb3c5-0a9c-4475-bd57-adabe17663e0",
    "prod-08.png": "https://www.figma.com/api/mcp/asset/7cf6d48d-763f-4487-9000-fb87a942e993",
    "prod-09.png": "https://www.figma.com/api/mcp/asset/c5f2f224-3ef3-418c-b1c9-2aa9cddd8ba6",
    "prod-10.png": "https://www.figma.com/api/mcp/asset/b8a94015-6ceb-4567-a4d4-0add0bb4943d",
    # PRESS frame
    "press-01.jpg": "https://www.figma.com/api/mcp/asset/48b627b6-e7cb-4189-b1da-04eaa7724951",
    "press-02.jpg": "https://www.figma.com/api/mcp/asset/21b73b88-c2cc-484a-8cbd-1498bb59c283",
    "press-03.jpg": "https://www.figma.com/api/mcp/asset/ccfba613-3282-4cd5-a371-04a852d25758",
    "press-05.jpg": "https://www.figma.com/api/mcp/asset/4bf3fc5d-211e-49cb-8f8c-8cee3438bd98",
    "press-06.jpg": "https://www.figma.com/api/mcp/asset/c4407208-c1bb-4fd1-bdc7-858ebbc82fb7",
    "press-08.jpg": "https://www.figma.com/api/mcp/asset/c289c803-9c0e-4345-8c55-33abfee26bf2",
    "press-10.jpg": "https://www.figma.com/api/mcp/asset/9af0c5a5-2841-48c9-83ea-98bb63dcae85",
    "press-15.jpg": "https://www.figma.com/api/mcp/asset/589d6de6-68d6-4fa1-a76d-b891db727708",
    "press-16.jpg": "https://www.figma.com/api/mcp/asset/cdce3141-9373-4796-b885-fc9a05f2a91c",
    "press-04.png": "https://www.figma.com/api/mcp/asset/6dcd154e-74d8-41b3-94eb-bc04de3fc946",
    "press-07.png": "https://www.figma.com/api/mcp/asset/ee7e0f9a-dd75-4db4-bba9-5325607acfc1",
    "press-09.png": "https://www.figma.com/api/mcp/asset/c0d3cdfc-1f51-4435-93c9-ceba3eff3f1d",
    "press-11.png": "https://www.figma.com/api/mcp/asset/4adbba1a-96c4-4d87-a740-48d44f6c18be",
    "press-12.png": "https://www.figma.com/api/mcp/asset/c0272a91-d606-4fb1-9b64-e05118596cde",
    "press-13.png": "https://www.figma.com/api/mcp/asset/109df7e3-4f4a-4430-a092-3f3357c4ed75",
    "press-14.png": "https://www.figma.com/api/mcp/asset/0310b21c-e841-4b66-9511-834663ac1fc4",
    # COMMERCIAL frame (all PNG)
    "com-01.png": "https://www.figma.com/api/mcp/asset/7c538c25-e56c-4f37-a7ee-7d30cb693835",
    "com-02.png": "https://www.figma.com/api/mcp/asset/b66a7c48-a96e-4f1b-9cb7-97681cd0e227",
    "com-03.png": "https://www.figma.com/api/mcp/asset/b3d78911-6df0-47e0-8ee9-12f6285f9186",
    "com-04.png": "https://www.figma.com/api/mcp/asset/cb455521-c19c-4913-8637-468d56b1b23a",
    "com-05.png": "https://www.figma.com/api/mcp/asset/f1790b54-f23c-4b73-8300-6626ecbeab1d",
    "com-06.png": "https://www.figma.com/api/mcp/asset/d4490d07-8714-4710-b3dc-24a14b1a7373",
    "com-07.png": "https://www.figma.com/api/mcp/asset/5736ad2f-f49c-49ba-b3f8-aff723ce09b6",
    "com-08.png": "https://www.figma.com/api/mcp/asset/4fcf9c50-30e7-406e-8f3c-228d4d7a7e40",
    "com-09.png": "https://www.figma.com/api/mcp/asset/d25aee75-3e09-4df1-a584-d8d1d67cd89c",
    "com-10.png": "https://www.figma.com/api/mcp/asset/2d6efec4-a627-495b-8478-9c1efcfa9430",
    "com-11.png": "https://www.figma.com/api/mcp/asset/832066fa-e9e6-43dd-8746-d98e5057af0f",
    "com-12.png": "https://www.figma.com/api/mcp/asset/072044e5-1d2a-4e2c-8eee-2de6a06c1fc6",
    "com-13.png": "https://www.figma.com/api/mcp/asset/88a0cb80-4955-4dec-bb42-5d20aaffac4e",
    "com-14.png": "https://www.figma.com/api/mcp/asset/4f7efd65-b0cf-4613-9994-e485ecf938dc",
    "com-15.png": "https://www.figma.com/api/mcp/asset/4ae95f61-f7e3-4c67-a626-f562067384e1",
    "com-16.png": "https://www.figma.com/api/mcp/asset/17e221d9-0b26-43ba-9ce7-09e7e5d295af",
}

def download(name, url):
    dest = os.path.join(TMP, name)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            with open(dest, "wb") as f:
                f.write(r.read())
        size = os.path.getsize(dest)
        return name, size, None
    except Exception as e:
        return name, 0, str(e)

print(f"Downloading {len(IMAGES)} images to {TMP}...")
results = []
with ThreadPoolExecutor(max_workers=20) as ex:
    futures = {ex.submit(download, n, u): n for n, u in IMAGES.items()}
    for fut in as_completed(futures):
        name, size, err = fut.result()
        if err:
            print(f"  FAIL {name}: {err}")
        else:
            print(f"  OK   {name} ({size:,} bytes)")
        results.append((name, size, err))

ok = sum(1 for _, s, e in results if e is None and s > 0)
fail = len(results) - ok
print(f"\nDone: {ok} downloaded, {fail} failed")
