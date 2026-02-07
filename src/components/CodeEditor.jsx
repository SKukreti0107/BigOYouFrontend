import Editor from "@monaco-editor/react";



export default function CodeEditor({ code, onChange, language, setLanguage, curr_phase }) {

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const isReadOnly = curr_phase !== "CODING"

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
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 4,
          readOnly: isReadOnly
        }}
      />
    </div>
  );
}
