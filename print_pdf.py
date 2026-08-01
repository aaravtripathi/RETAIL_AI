import subprocess
import os
import sys

edge_path = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"

browser_path = chrome_path if os.path.exists(chrome_path) else edge_path
print(f"Using browser for PDF generation: {browser_path}")

html_file_path = os.path.abspath("MASTER_REPORT_40_PAGES.html")
file_url = f"file:///{html_file_path.replace(chr(92), '/')}"
output_pdf = os.path.abspath("RetailVision_AI_Enterprise_Technical_Report.pdf")

header_template = '<div style="font-size:8px; width:100%; display:flex; justify-content:space-between; padding:0 35px; color:#718096; font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Arial, sans-serif;"><span>Artificial Intelligence & Machine Learning Technical Report</span><span>Project Technical Report: RETAIL_AI</span></div>'
footer_template = '<div style="font-size:8px; width:100%; display:flex; justify-content:space-between; padding:0 35px; color:#718096; font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Arial, sans-serif;"><span>&copy; 2026 Institutional Internship &middot; Advanced Artificial Intelligence Division</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'

cmd = [
    browser_path,
    "--headless=new",
    "--disable-gpu",
    f"--print-to-pdf={output_pdf}",
    "--display-header-footer",
    f"--header-template={header_template}",
    f"--footer-template={footer_template}",
    "--margin-top=0.75in",
    "--margin-bottom=0.85in",
    "--margin-left=0.7in",
    "--margin-right=0.7in",
    file_url
]

print("Executing headless browser printing...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
if os.path.exists(output_pdf):
    size = os.path.getsize(output_pdf)
    print(f"[SUCCESS] Generated PDF: {output_pdf} (Size: {size / 1024:.1f} KB)")
else:
    print("[ERROR] PDF not generated. Stderr:", res.stderr)
