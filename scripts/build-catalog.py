#!/usr/bin/env python3
"""Build the PDF from the same catalog data used by the accessible web pages.
Requires Python playwright and Chromium; does not fetch external assets.
"""
import json, html, pathlib, shutil, re
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).resolve().parents[1]
CAT=json.loads((ROOT/'content/catalog/catalog.json').read_text())
PERF=json.loads((ROOT/'content/catalog/performance.json').read_text())
OUT=ROOT/'public/catalog'
e=lambda x: html.escape(str(x))
def rich(text):
 escaped=e(text).replace('\n','<br>')
 return re.sub(r'https?://[^\s<]+', lambda m: '<a href="'+m.group().rstrip('.')+'">'+m.group().rstrip('.')+'</a>'+('.' if m.group().endswith('.') else ''), escaped)
def table(head, rows):
 return '<table><thead><tr>'+''.join('<th>'+e(x)+'</th>' for x in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+e(x)+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table>'
def block(b):
 t=b['type']
 if t=='h':return '<h2>'+e(b['text'])+'</h2>'
 if t=='p':return '<p>'+rich(b['text'])+'</p>'
 if t=='note':return '<aside>'+e(b['text'])+'</aside>'
 if t=='list':return '<ul>'+''.join('<li>'+rich(i)+'</li>' for i in b['items'])+'</ul>'
 if t=='table':return table(b['head'],b['rows'])
 raise ValueError(t)
def performance():
 h=['Measure']+[p['label']+' · '+p['dates'] for p in PERF['periods']]
 s=table(h,[[r['label']]+r['values'] for r in PERF['rows']])
 s+='<h2>How to interpret these figures</h2><ul class="small">'+''.join('<li>'+e(n)+'</li>' for n in PERF['notes'])+'</ul>'
 return s+'<p class="small muted">Source: '+e(PERF['source'])+'.</p>'
def page(num,title,subtitle,body,extra=''):
 return f'<section class="page {extra}" id="page-{num}"><div class="running">MENTOR AGILE <span>PRODUCT OWNER / PRODUCT MANAGER</span></div><div class="content"><div class="kicker">2026–2027 STUDENT CATALOG</div><h1>{e(title)}</h1><p class="subtitle">{e(subtitle)}</p>{body}</div><footer>Revision: {e(CAT["revision"])}<span>{num:02d}</span></footer></section>'
logo=(ROOT/'public/images/logos/mentor-agile-gold.png').as_uri()
photo=(OUT/'assets/chicago.jpeg').as_uri()
css='''@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;color:#13223b;font-family:Arial,Helvetica,sans-serif;font-size:10pt;line-height:1.47}a{color:#805b16} .page{width:210mm;height:297mm;position:relative;break-after:page;background:#fff;overflow:visible}.page:last-child{break-after:auto}.running{height:18mm;background:#071d44;color:#fff;padding:6mm 17mm;font-size:8pt;font-weight:bold;letter-spacing:1px}.running span{float:right;font-size:6.6pt;color:#e5c26e}.content{padding:13mm 17mm 18mm}.kicker{font-size:8pt;letter-spacing:1.5px;color:#967027;font-weight:bold}h1{font-size:27pt;line-height:1.13;color:#071d44;margin:4mm 0 3mm;letter-spacing:-.8px}.subtitle{font-size:11pt;color:#637187;margin:0 0 7mm}h2{font-size:12.5pt;color:#071d44;margin:5mm 0 2mm}p{margin:0 0 3.2mm}ul{margin:2mm 0 4mm;padding-left:5mm}li{margin-bottom:2mm}aside{background:#f6f0e3;border-left:3px solid #b48932;padding:3.5mm 4mm;margin:5mm 0;font-size:9.5pt}table{width:100%;border-collapse:collapse;font-size:9pt;margin:3mm 0 5mm}th{background:#071d44;color:white;text-align:left;padding:3mm;vertical-align:top}td{padding:3mm;border-bottom:1px solid #dce2eb;vertical-align:top}tr:nth-child(even) td{background:#f3f5f8}td:first-child{font-weight:600}footer{position:absolute;bottom:10mm;left:17mm;right:17mm;border-top:1px solid #c8b58b;padding-top:3mm;color:#56657a;font-size:8pt}footer span{float:right;font-weight:bold;color:#071d44}.small{font-size:8.4pt;line-height:1.4}.muted{color:#647185}.cover{background:#071d44;color:#fff}.cover .photo{position:absolute;top:0;right:0;width:100%;height:125mm;object-fit:cover}.cover .shade{position:absolute;top:0;left:0;width:100%;height:125mm;background:linear-gradient(90deg,rgba(7,29,68,.85),rgba(7,29,68,.1))}.cover .logo{position:absolute;top:14mm;left:17mm;width:60mm;height:auto;max-height:25mm;object-fit:contain}.cover .hero{position:absolute;top:126mm;left:17mm;right:17mm}.cover .kicker{color:#e5c26e}.cover h1{color:white;font-size:39pt;line-height:1.07;margin:7mm 0}.cover .intro{font-size:12pt;color:#e1e7ef;max-width:150mm}.cover .approval{margin-top:9mm;border-top:1px solid #947538;padding-top:5mm;color:#e4e8ef;font-size:8.3pt}.cover footer{color:#e4e8ef;border-color:#947538}.cover footer span{color:#e5c26e}.toc a{display:flex;justify-content:space-between;text-decoration:none;border-bottom:1px solid #dce2eb;padding:2.3mm 0;color:#13223b;font-size:10.5pt}.toc .num{color:#9d721e;font-weight:bold}.draft{background:#ffedbc;color:#493100;padding:3mm 4mm;font-weight:bold;margin-top:4mm}.performance table{font-size:8pt}.performance th:first-child{width:53%}.performance td{padding:2.1mm 2.6mm}.performance li{margin-bottom:1.5mm}.performance h1{font-size:25pt}.tuition{font-size:9.1pt}.tuition .subtitle{margin-bottom:4mm}.tuition h2{margin-top:3mm}.tuition table{margin-bottom:3mm}.tuition td,.tuition th{padding:2.5mm}.complaints{font-size:9.2pt}.complaints h2{margin-top:3.5mm}.complaints .subtitle{margin-bottom:5mm}.complaints aside{margin:3mm 0}'''
cover=f'''<section class="page cover" id="page-1"><img class="photo" src="{photo}" alt="Chicago skyline"><div class="shade"></div><img class="logo" src="{logo}" alt="Mentor Agile"><div class="hero"><div class="kicker">2026–2027 · STUDENT CATALOG</div><h1>Product Owner<br>/ Product Manager</h1><p class="intro">A 12-week program in Agile product skills,<br>practical learning, and career preparation.</p><div class="approval">Mentor Agile is approved by the Division of Private Business and Vocational Schools of the Illinois Board of Higher Education.<br><br>Mentor Agile is not accredited by a U.S. Department of Education recognized accrediting body.</div>{'<div class="draft">REVIEW DRAFT · Financial terms await school confirmation</div>' if CAT['status']=='draft' else ''}</div><footer>Revised {e(CAT['revision'])} · mentoragile.com<span>01</span></footer></section>'''
toc='<nav class="toc">'+''.join(f'<a href="#page-{i+3}"><span>{e(s["title"])}</span><span class="num">{i+3:02d}</span></a>' for i,s in enumerate(CAT['sections']))+'</nav>'
toc+='<h2>Using this catalog</h2><p>This edition covers the Product Owner / Product Manager program (MAPOB). Read the program, financial terms, academic rules, credential requirements, and outcome notes before enrollment. Keep the version supplied with your enrollment agreement.</p><aside>The full catalog is also available as readable web text at mentoragile.com/student-catalog/. Current performance figures and historical reporting data are identified separately.</aside>'
pages=[cover,page(2,'Contents & program guide','Find the information that matters to your enrollment.',toc)]
for i,s in enumerate(CAT['sections']):
 body=performance() if s['id']=='performance' else ''.join(block(b) for b in s['blocks'])
 pages.append(page(i+3,s['title'],s['subtitle'],body,s['id']))
htmltext='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Mentor Agile Product Owner Student Catalog 2026–2027</title><style>'+css+'</style></head><body>'+''.join(pages)+'</body></html>'
render=ROOT/'content/catalog/rendered.html';render.write_text(htmltext)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 tab=browser.new_page();tab.goto(render.as_uri());tab.evaluate('document.fonts.ready')
 errors=tab.evaluate('''() => [...document.querySelectorAll('.page')].flatMap((page, index) => { const content=page.querySelector('.content'); const footer=page.querySelector('footer'); return content && content.getBoundingClientRect().bottom > footer.getBoundingClientRect().top - 8 ? [`Page ${index+1} content overlaps footer`] : []; })''')
 if errors:raise RuntimeError('; '.join(errors))
 tab.pdf(path=str(OUT/'product-owner-catalog-2026-2027.pdf'),print_background=True,prefer_css_page_size=True,tagged=True,outline=True)
 browser.close()
# Retain the established download URL so old links resolve to the current catalog.
shutil.copyfile(OUT/'product-owner-catalog-2026-2027.pdf',OUT/'ibhe-catalog.pdf')
print(f'Generated {len(pages)} pages; status={CAT["status"]}')
