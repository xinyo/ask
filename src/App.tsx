import { useState, type FormEvent } from "react";
import { Link, Navigate, Route, Routes, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import iframeTargets from "@/iframeTargets.json";
import "./App.css";

function getIframeUrl(urlTemplate: string, question: string) {
  return urlTemplate.replace("{{question}}", encodeURIComponent(question));
}

function HomePage() {
  const [question, setQuestion] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    iframeTargets.forEach((target) => {
      window.open(
        getIframeUrl(target.urlTemplate, trimmedQuestion),
        "_blank",
        "noopener,noreferrer",
      );
    });
  }

  return (
    <main>
      <div className="home-container">
        <div className="home-inner">
          <h1 className="text-4xl ">
            Type a question, we will{" "}
            <span style={{ color: "var(--color-primary)" }}>ask</span> everyone.
          </h1>
          <form className="mt-4 mb-4 relative" onSubmit={handleSubmit}>
            <Textarea
              aria-label="Question"
              placeholder="Enter your question..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="min-h-40 p-4 pr-20 resize-none [field-sizing:content]"
            />
            <Button className="absolute bottom-4 right-6" type="submit">
              ask
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function AskPage() {
  const [searchParams] = useSearchParams();
  const question = searchParams.get("q")?.trim() ?? "";

  return (
    <main className="ask-page">
      <header className="ask-header">
        <Link className="ask-home-link" to="/">
          ask
        </Link>
        <div className="ask-question">
          <span>Question</span>
          <strong>{question || "Start a new question"}</strong>
        </div>
      </header>

      <section className="iframe-grid" aria-label="AI answer frames">
        {iframeTargets.map((target) => (
          <article className="iframe-panel" key={target.name}>
            <div className="iframe-panel-header">{target.name}</div>
            <iframe
              title={`${target.name} answer`}
              src={getIframeUrl(target.urlTemplate, question)}
              referrerPolicy="no-referrer"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            />
          </article>
        ))}
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ask" element={<AskPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
