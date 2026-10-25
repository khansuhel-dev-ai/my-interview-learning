import React, { useState } from 'react';
import { Check, Copy, Terminal, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: 'java' | 'php' | 'bash' | 'sql' | 'text' | 'xml' | 'groovy';
  filename?: string;
  output?: string;
  explanation?: string;
  showLineNumbers?: boolean;
}

// Tokenizer for lightweight, dependency-free, high-precision syntax coloring
function highlightTokens(code: string, _language: string, showLineNumbers: boolean = true): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    // Check if line is a comment
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
      return (
        <div key={lineIdx} className="table-row leading-relaxed">
          {showLineNumbers && (
            <span className="table-cell pr-4 select-none text-right text-xs text-zinc-400 dark:text-zinc-600 font-mono w-10">
              {lineIdx + 1}
            </span>
          )}
          <span className="table-cell font-mono text-[13.5px] whitespace-pre text-emerald-600 dark:text-emerald-400 italic">
            {line}
          </span>
        </div>
      );
    }

    // Tokenize line using regex capturing groups
    // Token types: Comments, Strings, Annotations, PHP Variables, Keywords, Types, Numbers
    const tokenRegex = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@\w+|\$[a-zA-Z_]\w*|\b(?:public|private|protected|class|interface|enum|extends|implements|static|final|abstract|void|return|new|this|super|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|throws|package|import|instanceof|transient|volatile|synchronized|function|echo|declare|readonly)\b|\b(?:int|double|float|long|short|byte|char|boolean|String|StringBuilder|StringBuffer|System|Object|Class|Math|Integer|Double|Boolean|List|ArrayList|Map|HashMap|Serializable|Cloneable|ObjectOutputStream|ObjectInputStream|FileInputStream|FileOutputStream|IOException|ClassNotFoundException)\b|\b\d+(?:\.\d+)?[fFL]?\b)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`} className="text-zinc-800 dark:text-zinc-300">
            {line.substring(lastIndex, match.index)}
          </span>
        );
      }

      const token = match[0];

      if (token.startsWith('//')) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-emerald-600 dark:text-emerald-400 italic">
            {token}
          </span>
        );
      } else if (token.startsWith('"') || token.startsWith("'")) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-amber-600 dark:text-amber-300">
            {token}
          </span>
        );
      } else if (token.startsWith('@')) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-purple-600 dark:text-purple-400 font-medium">
            {token}
          </span>
        );
      } else if (token.startsWith('$')) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-sky-600 dark:text-sky-400 font-medium">
            {token}
          </span>
        );
      } else if (
        /^(public|private|protected|class|interface|enum|extends|implements|static|final|abstract|void|return|new|this|super|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|throws|package|import|instanceof|transient|volatile|synchronized|function|echo|declare|readonly)$/.test(
          token
        )
      ) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-rose-600 dark:text-rose-400 font-semibold">
            {token}
          </span>
        );
      } else if (
        /^(int|double|float|long|short|byte|char|boolean|String|StringBuilder|StringBuffer|System|Object|Class|Math|Integer|Double|Boolean|List|ArrayList|Map|HashMap|Serializable|Cloneable|ObjectOutputStream|ObjectInputStream|FileInputStream|FileOutputStream|IOException|ClassNotFoundException)$/.test(
          token
        )
      ) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-cyan-600 dark:text-cyan-400 font-medium">
            {token}
          </span>
        );
      } else if (/^\d+(?:\.\d+)?[fFL]?$/.test(token)) {
        parts.push(
          <span key={`tok-${match.index}`} className="text-orange-600 dark:text-orange-400">
            {token}
          </span>
        );
      } else {
        parts.push(
          <span key={`tok-${match.index}`} className="text-zinc-800 dark:text-zinc-200">
            {token}
          </span>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    // Remaining trailing text
    if (lastIndex < line.length) {
      parts.push(
        <span key={`tail-${lastIndex}`} className="text-zinc-800 dark:text-zinc-300">
          {line.substring(lastIndex)}
        </span>
      );
    }

    return (
      <div key={lineIdx} className="table-row leading-relaxed">
        {showLineNumbers && (
          <span className="table-cell pr-4 select-none text-right text-xs text-zinc-400 dark:text-zinc-600 font-mono w-10">
            {lineIdx + 1}
          </span>
        )}
        <span className="table-cell font-mono text-[13.5px] whitespace-pre">{parts.length > 0 ? parts : ' '}</span>
      </div>
    );
  });
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'java',
  filename,
  output,
  explanation,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-950/5 dark:bg-[#111218] overflow-hidden shadow-sm transition-all duration-200">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-[#161722] border-b border-zinc-200 dark:border-zinc-800/80 text-xs">
        <div className="flex items-center gap-2 font-mono text-zinc-600 dark:text-zinc-400">
          <FileCode className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[11px]">
            {filename || language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1 text-[11px] text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded"
              title="Toggle code walkthrough"
            >
              <span>Explain</span>
              {showExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all active:scale-95 cursor-pointer"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto bg-zinc-50/70 dark:bg-[#0e0f14] text-zinc-900 dark:text-zinc-100 scrollbar-thin">
        <div className="table min-w-full">{highlightTokens(code.trimEnd(), language, showLineNumbers)}</div>
      </div>

      {/* Sample Output Terminal Panel */}
      {output && (
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/90 dark:bg-[#0b0c10] px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide text-[11px] uppercase">
              Output
            </span>
          </div>
          <pre className="font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-white/70 dark:bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-x-auto whitespace-pre">
            {output}
          </pre>
        </div>
      )}

      {/* Optional Explanation Callout */}
      {explanation && showExplanation && (
        <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 border-t border-indigo-100 dark:border-indigo-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <span className="font-semibold text-indigo-700 dark:text-indigo-400 mr-1.5">Walkthrough:</span>
          {explanation}
        </div>
      )}
    </div>
  );
};
