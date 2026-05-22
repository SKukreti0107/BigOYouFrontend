import Editor from "@monaco-editor/react";
import { useCallback, useEffect, useRef } from "react";



export default function CodeEditor({ code, onChange, language, setLanguage, curr_phase, onSelectionChange }) {
  const editorRef = useRef(null);
  const selectionListenerRef = useRef(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }


  const getSelectedText = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return "";
    const model = editor.getModel();
    if (!model) return "";

    const selections = editor.getSelections() || [];
    const chunks = selections
      .map((selection) => model.getValueInRange(selection))
      .map((text) => text.trimEnd())
      .filter((text) => text.length > 0);

    return chunks.join("\n\n");
  }, []);

  const handleEditorMount = useCallback((editorInstance) => {
    editorRef.current = editorInstance;

    if (selectionListenerRef.current) {
      selectionListenerRef.current.dispose();
      selectionListenerRef.current = null;
    }

    selectionListenerRef.current = editorInstance.onDidChangeCursorSelection(() => {
      if (onSelectionChange) {
        onSelectionChange(getSelectedText());
      }
    });
  }, [getSelectedText, onSelectionChange]);

  useEffect(() => {
    return () => {
      if (selectionListenerRef.current) {
        selectionListenerRef.current.dispose();
        selectionListenerRef.current = null;
      }
    };
  }, []);

  return (
    
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0f172a] border-b border-gray-700">
        <select
          className="text-sm text-white font-medium bg-transparent outline-none cursor-pointer"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="python" className="bg-[#0f172a]">Python</option>
          <option value="cpp" className="bg-[#0f172a]">C++</option>
          <option value="java" className="bg-[#0f172a]">Java</option>
        </select>
        <span className="text-xs text-gray-400">
          Manual testing encouraged • Explain your approach
        </span>
      </div>

      {/* Editor */}
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 4,
          readOnly: false
        }}
      />
    </div>
  );
}
