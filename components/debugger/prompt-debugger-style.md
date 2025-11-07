# Prompt Debugger — Style Notes

The Prompt Debugger inherits the same arcade-inspired control room language established by the Voice Debugger. When extending or adjusting the Prompt Debugger, keep the following design guardrails in mind:

## Visual Language
- **Palette**: build on the neon-emerald spectrum used by the Voice Debugger (`emerald-900` through `emerald-300`), with accent flashes from cyan/amber for secondary emphasis. Avoid neutral greys—every surface should lean green or teal.
- **Surfaces**: stack layered panels with translucent backgrounds. Primary container uses a double-border treatment (outer subtle border plus inner `before:` outline) to mimic a glowing console bezel.
- **Typography**: deploy uppercase, extra-tracked labels for section headers (matching the Voice Debugger’s UI chrome) and monospaced text for technical values such as variables and compiled prompts.
- **Lighting**: directional glows (`shadow-[0_0_0_1px_rgba(16,185,129,0.45)]`, radial gradients) simulate LED hardware. Hover states brighten toward emerald-400/500.

## Layout
- **Column Flow**: the Prompt Debugger is vertically stacked with clear “Prompt Template → Variables → Preview” progression. Each section is wrapped in a softly glowing card (`border-emerald-600/40`, `bg-emerald-950/40`).
- **Responsive Behavior**: preserve generous padding on desktop while allowing panels to stack cleanly on mobile; scrollable regions should rely on `overflow-y-auto` with max heights.
- **Controls**: buttons adopt the Voice Debugger styling—outlined controls for secondary actions and gradient-filled controls for critical actions (session reinitialize).

## Motion & Feedback
- **Interactions**: highlight active elements with luminous outlines. The reinitialize CTA transitions between gradients to reinforce “system reboot.”
- **Diff Visualization**: use dual panels for template/compiled views with a supplemental diff list; changed lines receive a stronger glow.

Following these guidelines keeps future adjustments consistent with the Voice Debugger’s distinctive game-inspired aesthetic.
