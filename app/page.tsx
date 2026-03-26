import GraphCanvas from './components/GraphCanvas';

export default function Home() {
  return (
    <div className="grid-bg min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f11]/60 backdrop-blur-[20px] bg-gradient-to-b from-[#0a0f11] to-transparent shadow-[0_20px_50px_rgba(0,161,167,0.05)]">
        <div className="flex justify-between items-center px-12 py-6 w-full max-w-[1920px] mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-[#78eff5] font-[var(--font-space-grotesk)]">
            GraphMind
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#"
              className="text-[#78eff5] font-bold border-b border-[#00A1A7]/50 font-[var(--font-space-grotesk)] tracking-tight transition-all duration-300 ease-in-out"
            >
              Nodes
            </a>
            <a
              href="#"
              className="text-[#edf1f4]/60 hover:text-[#78eff5] font-[var(--font-space-grotesk)] tracking-tight transition-all duration-300 ease-in-out"
            >
              Lattice
            </a>
            <a
              href="#"
              className="text-[#edf1f4]/60 hover:text-[#78eff5] font-[var(--font-space-grotesk)] tracking-tight transition-all duration-300 ease-in-out"
            >
              Blueprint
            </a>
            <a
              href="#"
              className="text-[#edf1f4]/60 hover:text-[#78eff5] font-[var(--font-space-grotesk)] tracking-tight transition-all duration-300 ease-in-out"
            >
              Research
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-[#edf1f4]/60 hover:text-[#78eff5] transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="text-[#edf1f4]/60 hover:text-[#78eff5] transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">account_tree</span>
            </button>
            <button className="bg-[#00A1A7] text-white px-6 py-2.5 rounded-xl font-[var(--font-space-grotesk)] text-sm font-bold active:scale-95 duration-300 transition-all hover:bg-[#1a2123]/50 hover:shadow-[0_0_15px_rgba(120,239,245,0.2)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A1A7]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#78eff5]/5 blur-[120px] rounded-full" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1a2123] border border-[#00A1A7]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00A1A7] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-[var(--font-space-grotesk)] font-bold text-[#00A1A7]">
                V2.0 Sentient Update Live
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black font-[var(--font-space-grotesk)] tracking-tighter mb-8 leading-[0.9] text-[#edf1f4]">
              GraphMind:
              <br />
              <span className="gradient-text">Your Knowledge, Reimagined.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-[#a0b1b3] text-lg md:text-xl font-light leading-relaxed mb-12 font-[var(--font-space-grotesk)]">
              Transform PDFs, PPTs, and web clips into a living, interconnected
              sentient lattice. Beyond Obsidian.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="w-full md:w-auto px-10 py-4 bg-[#00A1A7] text-white font-bold rounded-xl shadow-[0_10px_30px_rgba(0,161,167,0.3)] hover:scale-105 transition-all duration-300 font-[var(--font-space-grotesk)] tracking-tight">
                Start Your Graph
              </button>
              <button className="w-full md:w-auto px-10 py-4 border border-[#00A1A7]/30 text-[#00A1A7] font-bold rounded-xl hover:bg-[#00A1A7]/5 transition-all duration-300 font-[var(--font-space-grotesk)] tracking-tight">
                View Interactive Demo
              </button>
            </div>

            {/* Animated 3D Graph */}
            <div className="mt-24 relative max-w-5xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden border border-[#2a3436]/30 bg-[#060a0b] shadow-2xl group">
              <GraphCanvas className="absolute inset-0" maxNodes={42} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f11]/70 pointer-events-none" />

              {/* Floating Active Document panel */}
              <div className="absolute top-10 left-10 p-4 glass-panel rounded-xl border border-[#00A1A7]/20 flex items-center space-x-3 transition-transform hover:scale-105 duration-300">
                <span
                  className="material-symbols-outlined text-[#00A1A7]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-[#a0b1b3] font-[var(--font-space-grotesk)]">
                    Active Document
                  </div>
                  <div className="text-xs font-[var(--font-jetbrains-mono)] text-[#00A1A7]">
                    Lattice_Structure.md
                  </div>
                </div>
              </div>

              {/* Floating Connections panel */}
              <div className="absolute bottom-10 right-10 p-4 glass-panel rounded-xl border border-[#00A1A7]/20 flex items-center space-x-3 transition-transform hover:scale-105 duration-300">
                <span
                  className="material-symbols-outlined text-[#78eff5]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  hub
                </span>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-[#a0b1b3] font-[var(--font-space-grotesk)]">
                    Connections
                  </div>
                  <div className="text-xs font-[var(--font-jetbrains-mono)] text-[#78eff5]">
                    3,104 Sentient Nodes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Processing Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-space-grotesk)] tracking-tight leading-tight">
                The End of{" "}
                <span className="text-[#00A1A7] italic">Isolated Data.</span>
              </h2>
              <p className="text-[#a0b1b3] text-lg font-light leading-relaxed">
                Our proprietary extraction engine builds structural semantic
                meaning from legacy documents. What was a static slide deck
                becomes a dynamic, searchable, and linkable part of your second
                brain.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start space-x-6 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-[#00A1A7]/10 flex items-center justify-center transition-colors group-hover:bg-[#00A1A7]/20">
                    <span className="material-symbols-outlined text-[#00A1A7] text-xl">
                      auto_fix_high
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#edf1f4] font-[var(--font-space-grotesk)] text-xl">
                      Semantic Chunking
                    </h4>
                    <p className="text-[#a0b1b3] leading-relaxed">
                      Automatically breaks documents into relevant atomic nodes
                      for the lattice.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-6 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-[#78eff5]/10 flex items-center justify-center transition-colors group-hover:bg-[#78eff5]/20">
                    <span className="material-symbols-outlined text-[#78eff5] text-xl">
                      link
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#edf1f4] font-[var(--font-space-grotesk)] text-xl">
                      Contextual Backlinking
                    </h4>
                    <p className="text-[#a0b1b3] leading-relaxed">
                      Smart discovery of existing notes related to your
                      architectural uploads.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Code mockup panel */}
            <div className="relative p-12 glass-panel rounded-[3rem] border border-[#00A1A7]/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-[#00A1A7]/40" />
                </div>
                <div className="text-[10px] font-[var(--font-jetbrains-mono)] text-[#a0b1b3] tracking-[0.2em] uppercase">
                  Lattice_Core_v2
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="p-8 bg-[#1a2123] rounded-3xl border border-[#00A1A7]/5 flex flex-col items-center justify-center space-y-4 hover:border-[#00A1A7]/30 transition-all duration-500">
                  <span
                    className="material-symbols-outlined text-[#00A1A7]"
                    style={{ fontSize: "4rem", fontVariationSettings: "'FILL' 1" }}
                  >
                    slideshow
                  </span>
                  <div className="text-xs font-[var(--font-jetbrains-mono)] text-[#a0b1b3]">
                    Architecture_Final.pptx
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#00A1A7] text-5xl animate-pulse">
                    arrow_right_alt
                  </span>
                </div>
                <div className="p-8 bg-[#1a2123] rounded-3xl border border-[#00A1A7]/5 overflow-hidden">
                  <div className="text-[10px] font-[var(--font-jetbrains-mono)] text-[#78eff5] mb-4 uppercase tracking-widest">
                    # Node_Output: md
                  </div>
                  <pre className="text-[11px] font-[var(--font-jetbrains-mono)] text-[#a0b1b3] leading-relaxed">{`---
id: arch_01
lattice: sentient
---

## Structural Core
- Protocol: TCP/LM
- Density: +94% [[Link]]`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Graph Navigation Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-12 mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-black font-[var(--font-space-grotesk)] tracking-tighter mb-8">
              Navigate the <span className="text-[#00A1A7]">Lattice.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-[#a0b1b3] text-lg font-[var(--font-space-grotesk)]">
              Experience your knowledge spatially. Rotate, zoom, and dive into
              clusters of thought with zero-latency 3D navigation.
            </p>
          </div>
          <div className="max-w-[1400px] mx-auto px-12">
            <div className="relative rounded-[3.5rem] overflow-hidden border border-[#00A1A7]/10 shadow-[0_40px_100px_rgba(0,161,167,0.1)] group">
              {/* 3D graph visualization */}
              <div className="relative w-full aspect-[16/9] bg-[#060a0b] transition-all duration-700">
                <GraphCanvas className="absolute inset-0" maxNodes={55} />
              </div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-6 z-10">
                <button className="p-4 glass-panel rounded-full border border-[#00A1A7]/20 hover:bg-[#00A1A7]/20 transition-all text-[#00A1A7]">
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
                <button className="p-4 glass-panel rounded-full border border-[#00A1A7]/20 hover:bg-[#00A1A7]/20 transition-all text-[#00A1A7]">
                  <span className="material-symbols-outlined">3d_rotation</span>
                </button>
                <button className="p-4 glass-panel rounded-full border border-[#00A1A7]/20 hover:bg-[#00A1A7]/20 transition-all text-[#00A1A7]">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Feature Section */}
        <section className="py-32 max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Intelligent Linking — 8 cols */}
            <div className="md:col-span-8 bg-[#11181a] p-12 rounded-[2.5rem] border border-[#2a3436] hover:border-[#00A1A7]/40 transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#00A1A7]/10 flex items-center justify-center mb-8 transition-colors group-hover:bg-[#00A1A7]/20">
                  <span className="material-symbols-outlined text-[#00A1A7] text-3xl">
                    psychology
                  </span>
                </div>
                <h3 className="text-3xl font-bold font-[var(--font-space-grotesk)] mb-6 text-[#edf1f4]">
                  Intelligent Linking
                </h3>
                <p className="text-[#a0b1b3] text-lg max-w-md leading-relaxed">
                  Our AI surfaces connections based on conceptual blueprint
                  proximity, identifying patterns across multi-format nodes.
                </p>
              </div>
              <div className="mt-12 flex -space-x-4">
                <div className="h-14 w-14 rounded-full border-4 border-[#0a0f11] bg-zinc-800 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#a0b1b3]">person</span>
                </div>
                <div className="h-14 w-14 rounded-full border-4 border-[#0a0f11] bg-zinc-700 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#a0b1b3]">person</span>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#0a0f11] bg-[#00A1A7] text-white font-bold text-sm tracking-tighter">
                  12K+
                </div>
              </div>
            </div>

            {/* Offline Protocol — 4 cols */}
            <div className="md:col-span-4 bg-[#11181a] p-12 rounded-[2.5rem] border border-[#2a3436] hover:border-[#78eff5]/40 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-[#78eff5]/10 flex items-center justify-center mb-8 group-hover:bg-[#78eff5]/20">
                <span className="material-symbols-outlined text-[#78eff5] text-3xl">
                  verified_user
                </span>
              </div>
              <h3 className="text-2xl font-bold font-[var(--font-space-grotesk)] mb-6 text-[#edf1f4]">
                Offline Protocol
              </h3>
              <p className="text-[#a0b1b3] leading-relaxed">
                Your lattice data never leaves your device environment unless
                you authorize sync. Encrypted by default.
              </p>
            </div>

            {/* 3D Neural Visualizer — 4 cols */}
            <div className="md:col-span-4 bg-[#11181a] p-12 rounded-[2.5rem] border border-[#2a3436] hover:border-[#00A1A7]/40 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-[#00A1A7]/10 flex items-center justify-center mb-8 group-hover:bg-[#00A1A7]/20">
                <span className="material-symbols-outlined text-[#00A1A7] text-3xl">
                  auto_awesome_motion
                </span>
              </div>
              <h3 className="text-2xl font-bold font-[var(--font-space-grotesk)] mb-6 text-[#edf1f4]">
                3D Neural Visualizer
              </h3>
              <p className="text-[#a0b1b3] leading-relaxed">
                Architected for scale. High-fidelity rendering for graphs with
                over 100,000 active connections.
              </p>
            </div>

            {/* Blueprint API — 8 cols */}
            <div className="md:col-span-8 bg-[#11181a] p-12 rounded-[2.5rem] border border-[#2a3436] hover:border-[#78eff5]/40 transition-all duration-500 group flex items-center space-x-12">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-[#78eff5]/10 flex items-center justify-center mb-8 group-hover:bg-[#78eff5]/20">
                  <span className="material-symbols-outlined text-[#78eff5] text-3xl">
                    terminal
                  </span>
                </div>
                <h3 className="text-3xl font-bold font-[var(--font-space-grotesk)] mb-6 text-[#edf1f4]">
                  Blueprint API
                </h3>
                <p className="text-[#a0b1b3] leading-relaxed">
                  Extend your lattice. Custom Python/JS node logic supported
                  natively for advanced researchers.
                </p>
              </div>
              <div className="hidden lg:block w-64 bg-[#0a0f11]/50 rounded-2xl border border-[#00A1A7]/10 p-6">
                <pre className="text-xs font-[var(--font-jetbrains-mono)] text-[#00A1A7]/80 overflow-hidden leading-relaxed">{`lattice.sync({
  nodes: fetch('api'),
  weight: 0.98,
  depth: 4
})`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="p-20 rounded-[4rem] bg-gradient-to-br from-[#00A1A7]/10 to-[#78eff5]/5 border border-[#00A1A7]/20 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00A1A7]/15 blur-[100px] rounded-full" />
              <h2 className="text-4xl md:text-5xl font-black font-[var(--font-space-grotesk)] tracking-tight mb-10 leading-tight">
                Ready to transcend the
                <br />
                <span className="text-[#00A1A7] italic">Document Graveyard?</span>
              </h2>
              <p className="text-[#a0b1b3] mb-14 text-xl font-light font-[var(--font-space-grotesk)]">
                Join 50,000+ engineers and thinkers building their sentient
                lattice today.
              </p>
              <button className="px-14 py-6 bg-[#00A1A7] text-white font-black font-[var(--font-space-grotesk)] rounded-2xl hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,161,167,0.4)] transition-all duration-500 tracking-wider">
                ACTIVATE YOUR LATTICE
              </button>
              <div className="mt-10 text-[10px] font-[var(--font-jetbrains-mono)] text-[#a0b1b3] uppercase tracking-[0.4em]">
                Zero data latency • Private by design
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f11] w-full py-12 px-12 mt-20 border-t border-[#1a2123]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1920px] mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-xl font-bold font-[var(--font-space-grotesk)] text-[#00A1A7] tracking-tighter">
              GraphMind
            </div>
            <p className="font-[var(--font-space-grotesk)] text-sm tracking-widest uppercase text-[#edf1f4]/40 opacity-80 hover:opacity-100 transition-opacity">
              © 2024 GraphMind. Built for the Sentient Lattice.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 justify-center">
            {["Architecture", "Protocol", "Neural API", "Terminal"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-[var(--font-space-grotesk)] text-sm tracking-widest uppercase text-[#edf1f4]/40 hover:text-[#00A1A7] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
