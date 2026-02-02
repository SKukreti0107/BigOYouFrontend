import { useState } from "react";
import Editor from "@monaco-editor/react";



export default function CodeEditor({code,onChange,setLanguage}) {
  // const [code, setCode] = useState(PYTHON_STARTER_CODE);

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0f172a] border-b border-gray-700">
        <select className="text-sm text-white font-medium">
          <option value="python" onChange={setLanguage("python")}>Python</option>
        </select>
        <span className="text-xs text-gray-400">
          Manual testing encouraged • Explain your approach
        </span>
      </div>

      {/* Editor */}
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 4,
        }}
      />
    </div>
  );
}
