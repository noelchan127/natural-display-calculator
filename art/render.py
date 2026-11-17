import asyncio,os
from playwright.async_api import async_playwright
R='/home/claude/apps/natural-display-calculator'
jobs=[('icon.svg',1024,f'{R}/art/icon-1024.png')]
dens={'mdpi':1,'hdpi':1.5,'xhdpi':2,'xxhdpi':3,'xxxhdpi':4}
for d,k in dens.items():
    base=f'{R}/android/app/src/main/res/mipmap-{d}'
    jobs+= [('icon.svg',int(48*k),f'{base}/ic_launcher.png'),('icon_round.svg',int(48*k),f'{base}/ic_launcher_round.png'),('foreground.svg',int(108*k),f'{base}/ic_launcher_foreground.png')]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for svg,size,out in jobs:
            os.makedirs(os.path.dirname(out),exist_ok=True)
            pg=await b.new_page(viewport={'width':size,'height':size})
            await pg.set_content(f'<html><body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,{__import__("base64").b64encode(open(svg,"rb").read()).decode()}" width="{size}" height="{size}" style="display:block"></body></html>')
            await pg.screenshot(path=out,omit_background=True); await pg.close()
        await b.close()
asyncio.run(main())
