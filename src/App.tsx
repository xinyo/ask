import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="home-container">
        <div className="home-inner">
          <h1 className="text-4xl ">Type a question, we will ask everyone.</h1>
          <div className="mt-4 mb-4 relative">
            <Textarea
              placeholder="Enter your question..."
              className="min-h-40 pr-20 resize-none [field-sizing:content]"
            />
            <Button className="absolute bottom-4 right-6">ask</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
