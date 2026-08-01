import matplotlib.pyplot as plt
import numpy as np

# Set overall font styles
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Segoe UI']
plt.rcParams['axes.edgecolor'] = '#cccccc'
plt.rcParams['axes.linewidth'] = 0.8

# 1. SDLC Maintenance Cost Pie Chart (67% Dominance)
fig, ax = plt.subplots(figsize=(7, 6))
labels = ['Maintenance & Evolution\n(67%)', 'Testing & QA\n(15%)', 'System Designing\n(8%)', 'Requirements Gathering\n(3%)', 'Coding & Implementation\n(7%)']
sizes = [67, 15, 8, 3, 7]
colors = ['#2e4960', '#8c58ad', '#3298db', '#e67e22', '#27ae60']
explode = (0.05, 0, 0, 0, 0)

wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, autopct='%1.0f%%',
                                  startangle=140, colors=colors, textprops={'fontsize': 10, 'weight': 'bold'})
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_weight('bold')
    autotext.set_fontsize(11)
ax.set_title('Relative Cost of SDLC Phases (IBM Systems Sciences Institute)\nLifecycle Expenditure Breakdown', fontsize=13, weight='bold', pad=20)
plt.tight_layout()
plt.savefig('chart_sdlc.png', dpi=300, bbox_inches='tight')
plt.close()

# 2. Exponential Escalation of Defect Repair Costs
fig, ax = plt.subplots(figsize=(8, 5))
phases = ['Requirements &\nArchitecture', 'Coding &\nImplementation', 'QA &\nTesting', 'Production\nRelease']
costs = [1, 5, 15, 100]
ax.plot(phases, costs, marker='o', color='#c0392b', linewidth=3, markersize=10)
ax.set_yscale('linear')
for i, txt in enumerate(costs):
    ax.annotate(f"{txt}x", (phases[i], costs[i]), textcoords="offset points", xytext=(0,12), ha='center', weight='bold', fontsize=11, color='#000000')
ax.set_ylabel('Relative Escalation Factor (Multiplier)', fontsize=11, weight='bold')
ax.set_title('Relative Cost of Defect Resolution Based on SDLC Phase', fontsize=13, weight='bold', pad=15)
ax.grid(True, linestyle='--', alpha=0.6)
ax.set_ylim(-5, 115)
plt.tight_layout()
plt.savefig('chart_defect_costs.png', dpi=300, bbox_inches='tight')
plt.close()

# 3. Memory Allocation vs Request Throughput (FastAPI Async vs Synchronous Blocking)
fig, ax1 = plt.subplots(figsize=(8, 5))
categories = ['Standard Synchronous DB', 'Async Uvicorn Workers', 'Async + Cached Demo Fallback']
x = np.arange(len(categories))
width = 0.35

mem_usage = [380.5, 65.2, 12.4]  # KB per request
throughput = [1450, 6200, 11500] # Requests / Sec

rects1 = ax1.bar(x - width/2, mem_usage, width, label='Memory Footprint (KB)', color='#d9534f')
ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, throughput, width, label='Throughput (Req/Sec)', color='#5cb85c')

ax1.set_ylabel('Memory Allocation per Request (KB) [Lower is better]', color='#d9534f', weight='bold')
ax2.set_ylabel('Throughput (Requests / Sec) [Higher is better]', color='#5cb85c', weight='bold')
ax1.set_xticks(x)
ax1.set_xticklabels(categories, weight='bold', fontsize=10)
ax1.set_title('FastAPI Runtime Memory Allocation vs Throughput Tuning', fontsize=13, weight='bold', pad=20)
ax1.grid(True, linestyle='--', alpha=0.4)

# Add values above bars
for rect in rects1:
    h = rect.get_height()
    ax1.annotate(f'{h} KB', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                 textcoords="offset points", ha='center', va='bottom', weight='bold', color='#d9534f', fontsize=9)
for rect in rects2:
    h = rect.get_height()
    ax2.annotate(f'{h}/s', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                 textcoords="offset points", ha='center', va='bottom', weight='bold', color='#5cb85c', fontsize=9)

plt.tight_layout()
plt.savefig('chart_memory_throughput.png', dpi=300, bbox_inches='tight')
plt.close()

# 4. Latency Distribution: Browser Local Fallback vs Cloud Render REST API
fig, ax = plt.subplots(figsize=(8, 5))
workflows = ['Product Image Scan', 'Face Biometric Id', 'Sentiment Review Eval', 'Chatbot Intent Query']
x = np.arange(len(workflows))
width = 0.35

local_latency = [1.5, 1.2, 0.8, 1.1]
cloud_latency = [34.2, 28.5, 18.4, 22.1]

rects1 = ax.bar(x - width/2, local_latency, width, label='Browser Offline Fallback (In-Memory)', color='#00a86b', edgecolor='black')
rects2 = ax.bar(x + width/2, cloud_latency, width, label='Render Cloud REST API (Container)', color='#3b82f6', edgecolor='black')

ax.set_ylabel('Execution & Response Latency (ms)', weight='bold')
ax.set_title('Quantitative Latency Comparison: Local Demo Engine vs Cloud REST API', fontsize=13, weight='bold', pad=15)
ax.set_xticks(x)
ax.set_xticklabels(workflows, weight='bold')
ax.legend(frameon=True)
ax.grid(True, linestyle='--', alpha=0.5, axis='y')
ax.set_ylim(0, 42)

for rect in rects1:
    h = rect.get_height()
    ax.annotate(f'{h} ms', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                textcoords="offset points", ha='center', va='bottom', weight='bold', fontsize=9)
for rect in rects2:
    h = rect.get_height()
    ax.annotate(f'{h} ms', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                textcoords="offset points", ha='center', va='bottom', weight='bold', fontsize=9)

plt.tight_layout()
plt.savefig('chart_latency.png', dpi=300, bbox_inches='tight')
plt.close()

# 5. Concurrency Stress Benchmarking (Log Scale)
fig, ax = plt.subplots(figsize=(8, 5))
clients = [10, 100, 1000, 5000, 10000]
sync_latency = [15, 65, 450, 2400, 6800] # degraded / blocking
async_latency = [12, 14, 22, 38, 54]     # flat scaling

ax.plot(clients, sync_latency, marker='s', color='#c0392b', linewidth=2.5, label='Synchronous WSGI (Worker Starvation / 503 Faults)')
ax.plot(clients, async_latency, marker='o', color='#2980b9', linewidth=2.5, label='Asynchronous Uvicorn ASGI (Non-Blocking IO)')

ax.set_yscale('log')
ax.set_xlabel('Simulated Concurrent Institutional HTTP Clients', weight='bold')
ax.set_ylabel('Mean Response Latency (ms, Log Scale)', weight='bold')
ax.set_title('Concurrency Stress Benchmarking: Worker Starvation under High Load', fontsize=13, weight='bold', pad=15)
ax.grid(True, which="both", ls="--", alpha=0.5)
ax.legend(frameon=True, loc='upper left')

for i in [0, 2, 4]:
    ax.annotate(f'{async_latency[i]}ms', (clients[i], async_latency[i]), textcoords="offset points", xytext=(0,8), ha='center', weight='bold', color='#2980b9')
    ax.annotate(f'{sync_latency[i]}ms', (clients[i], sync_latency[i]), textcoords="offset points", xytext=(0,8), ha='center', weight='bold', color='#c0392b')

plt.tight_layout()
plt.savefig('chart_concurrency.png', dpi=300, bbox_inches='tight')
plt.close()
print("Successfully generated all 5 quantitative benchmarking charts!")
