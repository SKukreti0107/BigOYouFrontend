import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalOutput({ output }) {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);

  useEffect(() => {
    term.current = new Terminal({
      theme: { background: "#020617" },
      fontSize: 13,
      cursorBlink: false,
      disableStdin: true,
      convertEol: true,
      scrollback: 2000,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    });

    fitAddon.current = new FitAddon();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    const handleResize = () => fitAddon.current?.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!term.current) return;

    term.current.clear();
    const text = output ?? "";
    if (text.length === 0) {
      term.current.writeln("No output.");
      return;
    }

    // Preserve formatting + ANSI colors
    term.current.write(text.replace(/\n/g, "\r\n"));
  }, [output]);

  return (
    <div
      ref={terminalRef}
      className="h-40 w-full border-t border-gray-700"
    />
  );
}
